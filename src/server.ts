import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "mcp-curl",
    version: "0.1.0",
  });

  server.tool(
    "curl",
    "get page content from a given url",
    {
      url: z.string().describe("url to get page content from"),
    },
    async ({ url }) => {
      if (!url) {
        throw new Error("city name is required.");
      }

      const response = await fetch(url);
      const content = await response.text();

      return {
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    },
  );

  return server;
}
