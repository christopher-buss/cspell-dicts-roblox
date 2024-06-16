# CSpell roblox-ts Dictionary

Roblox-TS dictionary for CSpell

This is a pre-built dictionary for use with CSpell.

## Installation

Global Install and add to CSpell global settings.

```sh
npm install -g @isentinel/dict-rbxts
cspell link add @isentinel/dict-rbxts
```

## Uninstall from CSpell

```sh
cspell link remove @isentinel/dict-rbxts
```

## Manual Installation

Manual installation is useful if you want to include this dictionary as part of your CI/CD lint process.

```
npm i @isentinel/dict-rbxts
```

The `cspell-ext.json` file in this package should be added to the import section in your `cspell.json` file.

```jsonc
{
	// …
	"import": ["@isentinel/dict-rbxts/cspell-ext.json"]
	// …
}
```

# Dictionary Development

See: [How to Create a New Dictionary](https://github.com/streetsidesoftware/cspell-dicts#how-to-create-a-new-dictionary)

## License

MIT

> Some packages may have other licenses included.

<!--- @@inject: ../../static/footer.md --->

<br/>

***

<p align="center">
Brought to you by Christopher Buss & <a href="https://streetsidesoftware.com" title="Street Side Software">
<img width="16" alt="Street Side Software Logo" src="https://i.imgur.com/CyduuVY.png" /> Street Side Software
</a>
</p>

<!--- @@inject-end: ../../static/footer.md --->
