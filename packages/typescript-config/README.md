# @firmanc/typescript-react

Set of tools and configurations to work with TypeScript.

## Install

```bash
npm install --save-dev @firmanc/typescript-config
```

## Usage

Extend your `tsconfig.json` with `@firmanc/typescript-config`

```JSON
{
  "extends": "@firmanc/typescript-config",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": [
      "src/**/*"
  ]
}
```
