import { writeFileSync } from "node:fs";

const WALLY_INDEX_REPO = "UpliftGames/wally-index";

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
	});
	const data: GitTreeResponse = await response.json();

	if (data.truncated) {
		console.warn("Warning: tree response was truncated");
	}

	const packagePaths = data.tree.filter((entry) => {
		return (
			entry.type === "blob" &&
			!entry.path.endsWith("owners.json") &&
			!entry.path.endsWith("config.json")
		);
	});

	const names = new Set<string>();
	for (const entry of packagePaths) {
		const [scope, packageName] = entry.path.split("/");
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
