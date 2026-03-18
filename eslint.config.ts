import isentinel, { GLOB_JS } from "@isentinel/eslint-config";

export default isentinel(
	{
		name: "project/root",
		ignores: ["generator-cspell-dicts/**/*"],
		namedConfigs: true,
		roblox: false,
		root: ["./dictionaries/"],
		rules: {
			"max-lines-per-function": "off",
		},
		type: "package",
	},
	{
		name: "project/root/js",
		ignores: [GLOB_JS],
	},
	{
		name: "project/root/cspell-ext",
		files: ["**/cspell-ext.json"],
		rules: {
			"unicorn/prevent-abbreviations": "off",
		},
	},
	{
		name: "project/package-json",
		files: ["**/package.json"],
		rules: {
			"package-json/require-types": "off",
		},
	},
);
