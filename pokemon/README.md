# Pokemon Info

## setup

```shell
pnpm install
pnpm run build
```

Add the following config to an MCP client  
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

### Claude Desktop
![Image](https://github.com/user-attachments/assets/c37dc42f-e34f-4f9b-a1ee-dcccd05e94a9)


## debugger

```shell
pnpm run build
npx @modelcontextprotocol/inspector node build/index.js
```
