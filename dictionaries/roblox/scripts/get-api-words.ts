import { writeFileSync } from "node:fs";

const TIMEOUT_MS = 30_000;

interface ApiDumpMember {
	Name: string;
}

interface ApiDumpClass {
	Members: Array<ApiDumpMember>;
	Name: string;
}

interface ApiDumpEnumItem {
	Name: string;
}

interface ApiDumpEnum {
	Items: Array<ApiDumpEnumItem>;
	Name: string;
}

interface ApiDump {
	Classes: Array<ApiDumpClass>;
	Enums: Array<ApiDumpEnum>;
}

async function getRobloxApiWords(): Promise<Set<string>> {
	const dumpResponse = await fetch(
		"https://raw.githubusercontent.com/MaximumADHD/Roblox-Client-Tracker/roblox/API-Dump.json",
		{ signal: AbortSignal.timeout(TIMEOUT_MS) },
	);

	if (!dumpResponse.ok) {
		throw new Error(
			`API dump request failed: ${dumpResponse.status} ${dumpResponse.statusText}`,
		);
	}

	const dump: ApiDump = await dumpResponse.json();
	const words = new Set<string>();

	function addName(name: string): void {
		for (const token of name.trim().split(/\s+/)) {
			if (/^\w+$/.test(token)) {
				words.add(token.toLowerCase());
			}
		}
	}

	for (const cls of dump.Classes) {
		addName(cls.Name);
		for (const member of cls.Members) {
			addName(member.Name);
		}
	}

	for (const enumEntry of dump.Enums) {
		addName(enumEntry.Name);
		for (const item of enumEntry.Items) {
			addName(item.Name);
		}
	}

	return words;
}

async function getLuauWords(): Promise<Set<string>> {
	const response = await fetch(
		"https://raw.githubusercontent.com/JohnnyMorganz/luau-lsp/main/scripts/globalTypes.d.luau",
		{ signal: AbortSignal.timeout(TIMEOUT_MS) },
	);

	if (!response.ok) {
		throw new Error(`Luau globals request failed: ${response.status} ${response.statusText}`);
	}

	const text = await response.text();
	const words = new Set<string>();

	for (const match of text.matchAll(/^declare (?:function )?(\w+)/gm)) {
		words.add(match[1].toLowerCase());
	}

	return words;
}

async function main(): Promise<void> {
	const [apiWords, luauWords] = await Promise.all([getRobloxApiWords(), getLuauWords()]);

	const allWords = new Set([...apiWords, ...luauWords]);
	const sorted = [...allWords].sort();

	console.log(`Roblox API words: ${apiWords.size}`);
	console.log(`Luau globals: ${luauWords.size}`);
	console.log(`Total unique words: ${allWords.size}`);

	writeFileSync("src/roblox.txt", `${sorted.join("\n")}\n`);
}

main();
