import style from "@isentinel/eslint-config";

export default style({
	formatters: {
		markdown: true,
		prettierOptions: {
			arrowParens: "avoid",
			printWidth: 100,
			semi: true,
			singleQuote: false,
			tabWidth: 4,
			trailingComma: "all",
			useTabs: true,
		},
	},
	jsonc: true,
	roblox: false,
	rules: {
		"unicorn/prevent-abbreviations": "off",
	},
	yaml: true,
});
