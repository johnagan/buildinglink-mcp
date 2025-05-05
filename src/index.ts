#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BuildingLink } from "buildinglink";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "BuildingLink",
  description: "A MCP server for BuildingLink",
  version: "1.0.14",
});

if (!process.env.BUILDINGLINK_USERNAME || !process.env.BUILDINGLINK_PASSWORD) {
  throw new Error("BUILDINGLINK_USERNAME and BUILDINGLINK_PASSWORD must be set");
}

// Login to BuildingLink
const buildingLink = new BuildingLink({
  username: process.env.BUILDINGLINK_USERNAME!,
  password: process.env.BUILDINGLINK_PASSWORD!,
  apiKey: process.env.BUILDINGLINK_API_KEY,
});

await buildingLink.login();

server.tool("getOccupant", async () => {
  const occupant = await buildingLink.getOccupant();
  return {
    content: [
      {
        text: JSON.stringify(occupant),
        type: "text",
      },
    ],
  };
});

server.tool("getVendors", async () => {
  const vendors = await buildingLink.getVendors();
  return {
    content: [
      {
        text: JSON.stringify(vendors),
        type: "text",
      },
    ],
  };
});

server.tool("getToken", async () => {
  return {
    content: [
      {
        text: JSON.stringify(buildingLink.token),
        type: "text",
      },
    ],
  };
});

server.tool("getBuildings", async () => {
  const building = await buildingLink.getBuildings();
  return {
    content: [
      {
        text: JSON.stringify(building),
        type: "text",
      },
    ],
  };
});

server.tool("getUser", async () => {
  const user = await buildingLink.getUser();
  return {
    content: [
      {
        text: JSON.stringify(user),
        type: "text",
      },
    ],
  };
});

server.tool("getDeliveries", async () => {
  const deliveries = await buildingLink.getDeliveries();
  return {
    content: [
      {
        text: JSON.stringify(deliveries),
        type: "text",
      },
    ],
  };
});

server.tool("getLibrary", async () => {
  const library = await buildingLink.getLibrary();
  return {
    content: [
      {
        text: JSON.stringify(library),
        type: "text",
      },
    ],
  };
});

server.tool("getAnnouncements", async () => {
  const announcements = await buildingLink.getAnnouncements();
  return {
    content: [
      {
        text: JSON.stringify(announcements),
        type: "text",
      },
    ],
  };
});

server.tool(
  "getEvents",
  {
    from: z.date(),
    to: z.date(),
  },
  async ({ from, to }) => {
    const events = await buildingLink.getEvents(from, to);
    return {
      content: [
        {
          text: JSON.stringify(events),
          type: "text",
        },
      ],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
