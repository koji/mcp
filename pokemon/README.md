# Pokemon Info

## setup

```shell
pnpm install
pnpm run build
```

```json
{
  "mcpServers": {
    "pokemon_info": {
      "command": "node",
      "args": ["<path-to-js>/build/index.js"]
    }
  }
}
```

## debugger

```shell
pnpm run build
npx @modelcontextprotocol/inspector node build/index.js
```
