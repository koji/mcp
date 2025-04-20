import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { fetchPokemonInfo } from './fetchPokemonInfo'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

// Create server instance
const server = new McpServer({
  name: 'pokemon-info',
  version: '1.0.0',
})

server.tool(
  'get-pokemon-info',
  'get pokemon information',

  {
    pokemonName: z.string(),
  },
  async ({ pokemonName }) => {
    const data = await fetchPokemonInfo(pokemonName)
    return {
      content: [
        {
          type: 'resource',
          resource: {
            text: JSON.stringify(data),
            uri: '',
          },
        },
      ],
    }
  }
)

async function main() {
  // Create transport
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
