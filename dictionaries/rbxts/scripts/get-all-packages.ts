import axios from "axios";
import { writeFileSync } from "node:fs";

const QUERY_SIZE = 250;
const SCOPE = "rbxts";

async function getAllPackages(): Promise<Array<string>> {
	let offset = 0;
	const pkgNames = new Array<string>();

	while (true) {
		const url = `https://registry.npmjs.com/-/v1/search?text=scope:${SCOPE}&size=${QUERY_SIZE}&from=${offset}`;
		const response = await axios.get(url);

		for (const result of response.data.objects) {
			pkgNames.push(result.package.name);
		}

		offset += QUERY_SIZE;
		if (offset > response.data.total) {
			break;
		}
	}

	return pkgNames;
}

async function main(): Promise<void> {
	const allPkgNames = await getAllPackages();
	console.log(`Found ${allPkgNames.length} packages`);

	const pkgsStr = allPkgNames
		.map(name => name.replace("@rbxts/", ""))
		.map(name => name.split("-").join("\n"))
		.join("\n");

	writeFileSync("src/rbxts.txt", pkgsStr);
}

main();
