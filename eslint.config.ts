import isentinel, { GLOB_JS } from "@isentinel/eslint-config";

export default isentinel(
	{
		name: "project/root",
		ignores: ["generator-cspell-dicts/**/*"],
		namedConfigs: true,
		roblox: false,
		rules: {
			"max-lines-per-function": "off",
		},
		type: "app",
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
		name: "project/root/package-json",
		files: ["package.json"],
		rules: {
			"package-json/valid-devDependencies": "off",
		},
	},
);
