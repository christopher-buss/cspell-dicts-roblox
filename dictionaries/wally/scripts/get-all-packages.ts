import { writeFileSync } from "node:fs";

const WALLY_INDEX_REPO = "UpliftGames/wally-index";
const TIMEOUT_MS = 30_000;

interface GitTreeEntry {
	path: string;
	type: string;
}

interface GitTreeResponse {
	tree: Array<GitTreeEntry>;
	truncated: boolean;
}

async function getAllPackages(): Promise<Array<string>> {
	const url = `https://api.github.com/repos/${WALLY_INDEX_REPO}/git/trees/main?recursive=1`;
	const response = await fetch(url, {
		headers: { Accept: "application/vnd.github.v3+json" },
		signal: AbortSignal.timeout(TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
	}

	const data: GitTreeResponse = await response.json();

	if (data.truncated) {
		throw new Error("GitHub tree response was truncated — cannot produce a complete word list");
	}

	const names = new Set<string>();
	for (const entry of data.tree) {
		if (entry.type !== "blob") {
			continue;
		}

		if (entry.path.endsWith("owners.json") || entry.path.endsWith("config.json")) {
			continue;
		}

		const parts = entry.path.split("/");
		if (parts.length !== 2) {
			continue;
		}

		const [scope, packageName] = parts;
		if (scope && packageName) {
			names.add(scope);
			names.add(packageName);
		}
	}

	return [...names];
}

async function main(): Promise<void> {
	const allNames = await getAllPackages();
	console.log(`Found ${allNames.length} unique names`);

	const words = allNames.flatMap((name) => name.split("-")).join("\n");

	writeFileSync("src/wally.txt", words);
}

main();
