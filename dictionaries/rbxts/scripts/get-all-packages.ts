import { writeFileSync } from "node:fs";

const QUERY_SIZE = 250;
const SCOPE = "rbxts";

async function getAllPackages(): Promise<Array<string>> {
	let offset = 0;
	const packageNames = new Array<string>();

	while (true) {
		const url = `https://registry.npmjs.com/-/v1/search?text=%40${SCOPE}&size=${QUERY_SIZE}&from=${offset}`;
		const response = await fetch(url);
		const data = await response.json();

		for (const result of data.objects) {
			packageNames.push(result.package.name);
		}

		offset += QUERY_SIZE;
		if (offset > data.total) {
			break;
		}
	}

	return packageNames;
}

async function main(): Promise<void> {
	const allPackageNames = await getAllPackages();
	console.log(`Found ${allPackageNames.length} packages`);

	const pkgsStr = allPackageNames
		.map((name) => name.replace("@rbxts/", ""))
		.map((name) => name.split("-").join("\n"))
		.join("\n");

	writeFileSync("src/rbxts.txt", pkgsStr);
}

main();
