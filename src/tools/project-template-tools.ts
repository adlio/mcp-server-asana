import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const getProjectTemplateTool: Tool = {
  name: "asana_get_project_template",
  description: "Returns the complete project template record for a single project template",
  inputSchema: {
    type: "object",
    properties: {
      project_template_gid: {
        type: "string",
        description: "Globally unique identifier for the project template"
      },
      opt_fields: {
        type: "string",
        description: "Comma-separated list of optional fields to include"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["project_template_gid"]
  }
};

export const getProjectTemplatesTool: Tool = {
  name: "asana_get_project_templates",
  description: "Get multiple project templates",
  inputSchema: {
    type: "object",
    properties: {
      workspace: {
        type: "string",
        description: "The workspace to get templates from (optional if DEFAULT_WORKSPACE_ID is set)"
      },
      team: {
        type: "string", 
        description: "The team to get templates from"
      },
      limit: {
        type: "number",
        description: "Results per page (1-100)",
        minimum: 1,
        maximum: 100
      },
      offset: {
        type: "string",
        description: "Pagination offset token"
      },
      opt_fields: {
        type: "string",
        description: "Comma-separated list of optional fields to include"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    }
  }
};

export const instantiateProjectTemplateTool: Tool = {
  name: "asana_instantiate_project_template",
  description: "Create a project from a template",
  inputSchema: {
    type: "object",
    properties: {
      project_template_gid: {
        type: "string",
        description: "The project template GID to instantiate"
      },
      name: {
        type: "string",
        description: "The name of the new project"
      },
      team: {
        type: "string",
        description: "The team GID to create the project in"
      },
      public: {
        type: "boolean",
        description: "Whether the project should be public to the team"
      },
      requested_dates: {
        type: "array",
        items: {
          type: "object",
          properties: {
            gid: {
              type: "string",
              description: "The date field GID from the template"
            },
            value: {
              type: "string",
              description: "Date value in YYYY-MM-DD format"
            }
          },
          required: ["gid", "value"]
        },
        description: "Array of date values for template date variables"
      },
      requested_roles: {
        type: "array",
        items: {
          type: "object",
          properties: {
            gid: {
              type: "string", 
              description: "The role GID from the template"
            },
            user: {
              type: "string",
              description: "User GID to assign to this role"
            }
          },
          required: ["gid", "user"]
        },
        description: "Array of user assignments for template roles"
      },
      opt_fields: {
        type: "string",
        description: "Comma-separated list of optional fields to include"
      }
    },
    required: ["project_template_gid", "name", "team"]
  }
};