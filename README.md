# BuildingLink MCP Server

This is a MCP server for BuildingLink. It enables you to collect your LLM to data from BuildingLink.

## Resources

This MCP server exposes the following tools:
| Tool | Description |
|----------|-------------|
| `getOccupant` | The logged in occupant's profile |
| `getVendors` | A list of preferred vendors |
| `getToken` | The token of the used logged in |
| `getBuildings` | The buildings (properties) associated with the logged in user |
| `getUser` | The logged in user's BuildingLink profile |
| `getDeliveries` | A list of all deliveries for the logged in user |
| `getLibrary` | A list of all library items for the logged in user and building |
| `getAnnouncements` | A list of all announcements for the logged in user and building |
| `getEvents` | A list of all events for the logged in user and building |

## Host Configuration

The MCP server is configured in the `mcpServers` section of the host configuration file.

The username and password should be the same that's used to login to the BuildingLink website.

```json
{
  "mcpServers": {
    "buildinglink": {
      "command": "npx",
      "args": ["-y", "johnagan/buildinglink-mcp"],
      "env": {
        "BUILDINGLINK_USERNAME": "your-username",
        "BUILDINGLINK_PASSWORD": "your-password"
      }
    }
  }
}
```
