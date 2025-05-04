import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BuildingLink } from "buildinglink";

// Create an MCP server
const server = new McpServer({
  name: "BuildingLink",
  description: "A MCP server for BuildingLink",
  version: "1.0.0",
});

// Login to BuildingLink
const buildingLink = new BuildingLink({
  username: process.env.BUILDINGLINK_USERNAME!,
  password: process.env.BUILDINGLINK_PASSWORD!,
});

server.resource("occupant", "buildinglink://occupant", async (uri) => {
  const occupant = await buildingLink.getOccupant();
  return {
    contents: [
      {
        text: JSON.stringify(occupant),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("vendors", "buildinglink://vendors", async (uri) => {
  // await buildingLink.login();
  const vendors = await buildingLink.getVendors();
  return {
    contents: [
      {
        text: JSON.stringify(vendors),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("token", "buildinglink://token", async (uri) => {
  return {
    contents: [
      {
        text: JSON.stringify(buildingLink.token),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("building", "buildinglink://building", async (uri) => {
  const building = await buildingLink.getBuildings();
  return {
    contents: [
      {
        text: JSON.stringify(building),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("user", "buildinglink://user", async (uri) => {
  const user = await buildingLink.getUser();
  return {
    contents: [
      {
        text: JSON.stringify(user),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("deliveries", "buildinglink://deliveries", async (uri) => {
  const deliveries = await buildingLink.getDeliveries();
  return {
    contents: [
      {
        text: JSON.stringify(deliveries),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("library", "buildinglink://library", async (uri) => {
  const library = await buildingLink.getLibrary();
  return {
    contents: [
      {
        text: JSON.stringify(library),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

server.resource("announcements", "buildinglink://announcements", async (uri) => {
  const announcements = await buildingLink.getAnnouncements();
  return {
    contents: [
      {
        text: JSON.stringify(announcements),
        mimeType: "application/json",
        uri: uri.toString(),
      },
    ],
  };
});

async function startServer() {
  await buildingLink.login();
  if (!buildingLink.isAuthenticated) {
    throw new Error("Failed to login to BuildingLink");
  }

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

startServer();
