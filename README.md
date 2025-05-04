# BuildingLink MCP Server

This is a MCP server for BuildingLink. It enables you to collect your LLM to data from BuildingLink.

## Resources

This MCP server exposes the following resources:
| Resource | Description |
|----------|-------------|
| `buildinglink://occupant` | The logged in occupant's profile |
| `buildinglink://vendors` | A list of preferred vendors |
| `buildinglink://token` | The token of the used logged in |
| `buildinglink://building` | The buildings (properties) associated with the logged in user |
| `buildinglink://user` | The logged in user's BuildingLink profile |
| `buildinglink://deliveries` | A list of all deliveries for the logged in user |
| `buildinglink://library` | A list of all library items for the logged in user and building |
| `buildinglink://announcements` | A list of all announcements for the logged in user and building |

## Host Configuration

The MCP server is configured in the `mcpServers` section of the host configuration file.

The username and password should be the same that's used to login to the BuildingLink website.

```json
{
  "mcpServers": {
    "buildinglink": {
      "command": "npx",
      "args": ["-y", "@johnagan/buildinglink-mcp"],
      "env": {
        "BUILDINGLINK_USERNAME": "your-username",
        "BUILDINGLINK_PASSWORD": "your-password"
      }
    }
  }
}
```
