# Asana Portfolio API Documentation

This document provides a comprehensive overview of Asana's Portfolio API capabilities and limitations based on research conducted on 2025-10-11.

## Overview

A portfolio gives a high-level overview of the status of multiple initiatives in Asana. Portfolios provide a dashboard overview of the state of multiple projects, including a progress report and the most recent status update.

### Size Limits
Portfolios have some restrictions on size. Each portfolio has a max of 1500 items and, like projects, a maximum of 20 custom fields.

### Portfolio Object Types

**PortfolioCompact** - Basic portfolio representation with minimal fields:
- `gid` (string): Globally unique identifier
- `resource_type` (string): Always "portfolio"  
- `name` (string): The name of the portfolio

**Portfolio** - Complete portfolio object including all fields such as:
- Basic properties (gid, name, archived, color, dates)
- Access control (default_access_level, privacy_setting, public)
- Relationships (owner, workspace, members, project_templates)
- Custom fields and settings (custom_fields, custom_field_settings)
- Status information (current_status_update)
- Metadata (created_at, created_by, permalink_url)

## Available Endpoints

### 1. Get Multiple Portfolios
- **Endpoint**: `GET /portfolios`
- **Description**: Returns a list of portfolios in compact representation that are owned by the current API user
- **Scope Required**: `portfolios:read`
- **Query Parameters**:
  - `workspace` (required): The workspace or organization to filter portfolios on
  - `owner` (required): The user who owns the portfolio. Use "me" for current user, or user GID. API users can only get portfolios they own, unless using a Service Account
  - `limit` (optional): Results per page (1-100)
  - `offset` (optional): Pagination offset token
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: List of compact portfolio objects with pagination support

### 2. Get Single Portfolio
- **Endpoint**: `GET /portfolios/{portfolio_gid}`
- **Description**: Returns the complete portfolio record for a single portfolio
- **Scope Required**: `portfolios:read` (additional scope `custom_fields:read` required for custom_field_settings)
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: Complete portfolio object with full details including custom fields, members, status updates, and project templates
- **Note**: Portfolios have a max of 1500 items and 20 custom fields

### 3. Get Portfolio Items
- **Endpoint**: `GET /portfolios/{portfolio_gid}/items`
- **Description**: Get a list of the items in compact form in a portfolio
- **Scope Required**: `portfolios:read`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
  - `limit` (optional): Results per page (1-100)
  - `offset` (optional): Pagination offset token
- **Response**: List of compact item objects (projects and portfolios) with pagination support

### 4. Add Portfolio Item
- **Endpoint**: `POST /portfolios/{portfolio_gid}/addItem`
- **Description**: Add an item to a portfolio. Returns an empty data block.
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the item being inserted (data object)
- **Response**: Empty data object (success conveyed through 2xx status code)
- **Verified**: ✅ Confirmed from official Asana API documentation

### 5. Remove Portfolio Item
- **Endpoint**: `POST /portfolios/{portfolio_gid}/removeItem`
- **Description**: Remove an item from a portfolio. Returns an empty data block.
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the item being removed (data object)
- **Response**: Empty data object (success conveyed through 2xx status code)

### 6. Add Members to Portfolio
- **Endpoint**: `POST /portfolios/{portfolio_gid}/addMembers`
- **Description**: Adds the specified list of users as members of the portfolio. Returns the updated portfolio record.
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the members being added (data object)
- **Response**: Updated portfolio record or error response object

### 7. Remove Members from Portfolio
- **Endpoint**: `POST /portfolios/{portfolio_gid}/removeMembers`
- **Description**: Removes the specified list of users from members of the portfolio. Returns the updated portfolio record.
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the members being removed (data object)
- **Response**: Updated portfolio record or error response object

### 8. Get Portfolio Custom Field Settings
- **Endpoint**: `GET /portfolios/{portfolio_gid}/custom_field_settings`
- **Description**: Returns the custom field settings configured for a portfolio
- **Scope Required**: `portfolios:read`
- **Parameters**:
  - `portfolio_gid` (required): The globally unique identifier for the portfolio
- **Response**: List of custom field settings

### 9. Add Custom Field Setting to Portfolio
- **Endpoint**: `POST /portfolios/{portfolio_gid}/addCustomFieldSetting`
- **Description**: Custom fields are associated with portfolios by way of custom field settings. This method creates a setting for the portfolio.
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the custom field setting (data object)
- **Response**: Custom field settings object representing the many-to-many join of the custom field and portfolio

### 10. Remove Custom Field Setting from Portfolio
- **Endpoint**: `POST /portfolios/{portfolio_gid}/removeCustomFieldSetting`
- **Description**: Removes a custom field setting from a portfolio
- **Scope Required**: `portfolios:write`
- **Path Parameters**:
  - `portfolio_gid` (required): Globally unique identifier for the portfolio
- **Query Parameters**:
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Information about the custom field setting being removed (data object)
- **Response**: Error response object (may return errors array with message, help, and phrase fields)

### 11. Create Portfolio
- **Endpoint**: `POST /portfolios`
- **Description**: Creates a new portfolio
- **Scope Required**: `portfolios:write`
- **Request Body**: Portfolio creation parameters
- **Response**: Created portfolio object

### 12. Update Portfolio
- **Endpoint**: `PUT /portfolios/{portfolio_gid}`
- **Description**: Updates an existing portfolio
- **Scope Required**: `portfolios:write`
- **Parameters**:
  - `portfolio_gid` (required): The globally unique identifier for the portfolio
- **Request Body**: Portfolio update parameters
- **Response**: Updated portfolio object

### 13. Delete Portfolio
- **Endpoint**: `DELETE /portfolios/{portfolio_gid}`
- **Description**: Deletes a portfolio
- **Scope Required**: `portfolios:write`
- **Parameters**:
  - `portfolio_gid` (required): The globally unique identifier for the portfolio
- **Response**: Deletion confirmation

## Key Limitations and Constraints

### Portfolio Item Management
**Available Operations**: The Asana API provides endpoints for managing portfolio items:

- ✅ `POST /portfolios/{portfolio_gid}/addItem` - Add projects or portfolios to a portfolio
- ✅ `POST /portfolios/{portfolio_gid}/removeItem` - Remove projects or portfolios from a portfolio
- ❌ No batch operations for portfolio item management (must add/remove items one at a time)
- ❌ Project endpoints do not accept portfolio parameters for adding projects to portfolios

### Portfolio-Project Relationship Discovery
**Important Constraint**: Portfolio membership information is not available from project-based endpoints. This means:

- You cannot query a project to discover which portfolios it belongs to
- You must query portfolio endpoints to discover which projects they contain
- To map project-portfolio relationships, you need to:
  1. Retrieve your list of portfolios
  2. Query each portfolio individually to get its items
  3. Map the relationships in your application code

### Status Updates and Reports
**Status Update Limitations**:
- ✅ Portfolio objects include progress information and the most recent status update
- ❌ No documented endpoints for creating, updating, or deleting portfolio status updates
- ❌ No endpoints for retrieving historical portfolio status reports
- ❌ Portfolio-level status reports are managed separately from project statuses and are not accessible via API

### Custom Field Management
**Custom Field Operations**:
- ✅ Can read custom field settings via `GET /portfolios/{portfolio_gid}/custom_field_settings`
- ✅ Can add custom field settings via `POST /portfolios/{portfolio_gid}/addCustomFieldSetting`
- ❌ No documented endpoints for updating or deleting custom field settings
- ❌ No endpoints for managing custom field values on portfolios

## Implementation Recommendations

### For MCP Server Implementation

Based on the API limitations, the following operations should be implemented:

#### Recommended Endpoints to Implement:
1. **Get Portfolio** - `asana_get_portfolio`
2. **List Portfolios** - `asana_list_portfolios`  
3. **Get Portfolio Items** - `asana_get_portfolio_items`
4. **Add Portfolio Item** - `asana_add_portfolio_item`
5. **Remove Portfolio Item** - `asana_remove_portfolio_item`
6. **Add Portfolio Members** - `asana_add_portfolio_members`
7. **Get Portfolio Custom Fields** - `asana_get_portfolio_custom_fields`
8. **Add Portfolio Custom Field Setting** - `asana_add_portfolio_custom_field_setting`
9. **Create Portfolio** - `asana_create_portfolio`
10. **Update Portfolio** - `asana_update_portfolio`
11. **Delete Portfolio** - `asana_delete_portfolio`

#### Not Recommended (API Limitations):
- ❌ Portfolio status update management (not supported by API)
- ❌ Batch portfolio item operations (must be done individually)
- ❌ Update/delete custom field settings (only add is supported)

### Error Handling Considerations

When implementing portfolio operations, consider these common scenarios:

1. **Permission Errors**: Users may not have access to all portfolios
2. **Nested Portfolio Depth**: Portfolios can contain other portfolios (hierarchical structure)
3. **Large Portfolio Contents**: Portfolios may contain many projects requiring pagination
4. **Scope Requirements**: Ensure proper OAuth scopes (`portfolios:read`, `portfolios:write`)

### Usage Patterns

#### Typical Workflow for Portfolio Analysis:
```
1. List user's portfolios → GET /portfolios
2. For each portfolio of interest → GET /portfolios/{gid}/items
3. Analyze portfolio contents and structure
4. Optionally get detailed portfolio info → GET /portfolios/{gid}
```

#### Hierarchical Portfolio Discovery:
```
1. Start with root portfolios
2. For each portfolio, get its items
3. Recursively process any sub-portfolios found
4. Build complete hierarchy map
```

## API Response Examples

### Portfolio Object Structure
```json
{
  "gid": "12345",
  "name": "Marketing Portfolio",
  "color": "light-green",
  "created_at": "2021-01-01T00:00:00.000Z",
  "created_by": {
    "gid": "67890",
    "name": "User Name"
  },
  "owner": {
    "gid": "67890", 
    "name": "User Name"
  },
  "workspace": {
    "gid": "11111",
    "name": "Company Workspace"
  },
  "public": false,
  "members": [...],
  "custom_field_settings": [...],
  "progress": {
    "completion_percentage": 75.5
  }
}
```

### Portfolio Items Response
```json
{
  "data": [
    {
      "gid": "project123",
      "resource_type": "project",
      "name": "Website Redesign"
    },
    {
      "gid": "portfolio456", 
      "resource_type": "portfolio",
      "name": "Sub-Portfolio"
    }
  ]
}
```

## Project Template Integration

Portfolios can contain projects created from templates. The following project template functionality supports portfolio workflows:

### 14. Get Project Template ✅ IMPLEMENTED
- **Endpoint**: `GET /project_templates/{project_template_gid}`
- **Description**: Returns the complete project template record for a single project template
- **Scope Required**: `project_templates:read`
- **Path Parameters**:
  - `project_template_gid` (required): Globally unique identifier for the project template
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: Complete project template record including requested dates, roles, and configuration
- **MCP Tool**: `asana_get_project_template`

### 15. Get Project Templates ✅ IMPLEMENTED
- **Endpoint**: `GET /project_templates`
- **Description**: Returns the compact project template records for all project templates in the given team or workspace
- **Scope Required**: `project_templates:read`
- **Query Parameters**:
  - `workspace` (optional): The workspace to filter results on
  - `team` (optional): The team to filter projects on
  - `limit` (optional): Results per page (1-100)
  - `offset` (optional): Pagination offset token
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: List of compact project template objects with pagination support (includes next_page for pagination)
- **MCP Tool**: `asana_get_project_templates`
- **Note**: Returns compact project template objects by default

### 16. Instantiate Project Template ✅ IMPLEMENTED
- **Endpoint**: `POST /project_templates/{project_template_gid}/instantiateProject`
- **Description**: Creates and returns a job that will asynchronously handle the project instantiation
- **Scope Required**: `projects:write`
- **Path Parameters**:
  - `project_template_gid` (required): Globally unique identifier for the project template
- **Query Parameters**:
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Request Body**: Describes the inputs used for instantiating a project (data object) including:
  - `name` (required): The name of the new project
  - `team` (required): The team GID to create the project in
  - `public` (optional): Whether the project should be public to the team
  - `requested_dates` (optional): Array of date values for template date variables (use gids from template's requested_dates)
  - `requested_roles` (optional): Array of user assignments for template roles
- **Response**: Job object with asynchronous project creation status and new_project details
- **MCP Tool**: `asana_instantiate_project_template`
- **Important Notes**: 
  - Returns a job object that handles asynchronous work
  - Recommended to first get the project template to copy gids from requested_dates array
  - Request body differs for organization workspaces (check is_organization parameter)
  - Job status can be: not_started, in_progress, succeeded, failed

### 17. Delete Project Template ❌ NOT IMPLEMENTED
- **Endpoint**: `DELETE /project_templates/{project_template_gid}`
- **Description**: A specific, existing project template can be deleted by making a DELETE request on the URL for that project template. Returns an empty data record.
- **Scope Required**: `project_templates:write` (assumed)
- **Path Parameters**:
  - `project_template_gid` (required): Globally unique identifier for the project template
- **Query Parameters**:
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: Empty data object (success conveyed through 2xx status code)
- **MCP Tool**: `asana_delete_project_template` (planned)

### 18. Get Team's Project Templates ❌ NOT IMPLEMENTED
- **Endpoint**: `GET /teams/{team_gid}/project_templates`
- **Description**: Returns the compact project template records for all project templates in the team
- **Scope Required**: `project_templates:read`
- **Path Parameters**:
  - `team_gid` (required): Globally unique identifier for the team
- **Query Parameters**:
  - `limit` (optional): Results per page (1-100)
  - `offset` (optional): Pagination offset token
  - `opt_fields` (optional): Comma-separated list of properties to include
  - `opt_pretty` (optional): Provides formatted output for debugging
- **Response**: List of compact project template objects with pagination support (includes next_page for pagination)
- **MCP Tool**: `asana_get_project_templates_for_team` (planned)
- **Note**: Returns compact project template objects by default

### Portfolio + Template Workflow

**Typical workflow for creating projects from templates in portfolios:**

1. **List available templates**: Use `asana_get_project_templates` to see available templates
2. **Get template details**: Use `asana_get_project_template` to understand required dates and roles
3. **Create project from template**: Use `asana_instantiate_project_template` with proper parameters
4. **Add to portfolio**: Use `asana_add_portfolio_item` to add the new project to the desired portfolio

**Example workflow:**
```javascript
// 1. Get available templates
const templates = await asana_get_project_templates({ team: "team_gid" });

// 2. Get template details to see required dates/roles
const template = await asana_get_project_template({ 
  project_template_gid: "template_gid",
  opt_fields: "requested_dates,requested_roles"
});

// 3. Create project from template
const project = await asana_instantiate_project_template({
  project_template_gid: "template_gid",
  name: "New Project from Template",
  team: "team_gid",
  requested_dates: [{ gid: "1", value: "2025-01-01" }],
  requested_roles: [{ gid: "role_gid", user: "user_gid" }]
});

// 4. Add to portfolio
await asana_add_portfolio_item({
  portfolio_gid: "portfolio_gid",
  item: project.gid
});
```

## Conclusion

The Asana Portfolio API provides solid read capabilities but has significant limitations around content management and status updates. When implementing portfolio functionality in an MCP server, focus on read operations and portfolio CRUD operations while clearly documenting the limitations around item management to users.

For operations not supported by the API (adding/removing items, status updates), users should be directed to use the Asana web interface or consider alternative approaches through project-level APIs where applicable.