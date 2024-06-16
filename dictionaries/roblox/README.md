# CSpell Roblox Dictionary

Roblox dictionary for CSpell.

This is a pre-built dictionary for use with CSpell.

## Requirements

| Tool                                                                                                                                 | Version |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| [cspell](https://github.com/streetsidesoftware/cspell)                                                                               | `>= 6`  |
| [Code Spell Checker - Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) | `>= 2`  |

## Installation

Global Install and add to cspell global settings.

```sh
pnpm install -g @isentinel/dict-roblox
cspell link add @isentinel/dict-roblox
```

## Uninstall from cspell

```sh
cspell link remove @isentinel/dict-roblox
```

## Manual Installation

The `cspell-ext.json` file in this package should be added to the import section in your cspell.json file.

```json
{
	// …
	"import": ["@isentinel/dict-roblox/cspell-ext.json"]
	// …
}
```

## Building

Building is only necessary if you want to modify the contents of the dictionary. Note: Building will take a few minutes for large files.

```sh
pnpm run build
```

## License

MIT

> Some packages may have other licenses included.
