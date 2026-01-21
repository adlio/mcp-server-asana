import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const getPortfolioTool: Tool = {
  name: "asana_get_portfolio",
  description: "Get detailed information about a specific portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
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
    required: ["portfolio_gid"]
  }
};

export const listPortfoliosTool: Tool = {
  name: "asana_list_portfolios",
  description: "Get a list of portfolios owned by the current user",
  inputSchema: {
    type: "object",
    properties: {
      workspace: {
        type: "string",
        description: "The workspace to filter portfolios on (optional if DEFAULT_WORKSPACE_ID is set)"
      },
      owner: {
        type: "string",
        description: "The user who owns the portfolio. Use 'me' for current user, or user GID"
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
    },
    required: ["owner"]
  }
};

export const getPortfolioItemsTool: Tool = {
  name: "asana_get_portfolio_items",
  description: "Get a list of items (projects and portfolios) in a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
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
    },
    required: ["portfolio_gid"]
  }
};

export const addPortfolioItemTool: Tool = {
  name: "asana_add_portfolio_item",
  description: "Add a project or portfolio to a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      item: {
        type: "string",
        description: "The GID of the project or portfolio to add"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["portfolio_gid", "item"]
  }
};

export const removePortfolioItemTool: Tool = {
  name: "asana_remove_portfolio_item",
  description: "Remove a project or portfolio from a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      item: {
        type: "string",
        description: "The GID of the project or portfolio to remove"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["portfolio_gid", "item"]
  }
};

export const addPortfolioMembersTool: Tool = {
  name: "asana_add_portfolio_members",
  description: "Add members to a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      members: {
        type: "array",
        items: {
          type: "string"
        },
        description: "Array of user GIDs to add as members"
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
    required: ["portfolio_gid", "members"]
  }
};

export const removePortfolioMembersTool: Tool = {
  name: "asana_remove_portfolio_members",
  description: "Remove members from a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      members: {
        type: "array",
        items: {
          type: "string"
        },
        description: "Array of user GIDs to remove as members"
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
    required: ["portfolio_gid", "members"]
  }
};

export const getPortfolioCustomFieldsTool: Tool = {
  name: "asana_get_portfolio_custom_fields",
  description: "Get custom field settings for a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
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
    required: ["portfolio_gid"]
  }
};

export const addPortfolioCustomFieldSettingTool: Tool = {
  name: "asana_add_portfolio_custom_field_setting",
  description: "Add a custom field setting to a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      custom_field: {
        type: "string",
        description: "The GID of the custom field to add"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["portfolio_gid", "custom_field"]
  }
};

export const removePortfolioCustomFieldSettingTool: Tool = {
  name: "asana_remove_portfolio_custom_field_setting",
  description: "Remove a custom field setting from a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      custom_field: {
        type: "string",
        description: "The GID of the custom field to remove"
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["portfolio_gid", "custom_field"]
  }
};

export const createPortfolioTool: Tool = {
  name: "asana_create_portfolio",
  description: "Create a new portfolio",
  inputSchema: {
    type: "object",
    properties: {
      workspace: {
        type: "string",
        description: "The workspace to create the portfolio in (optional if DEFAULT_WORKSPACE_ID is set)"
      },
      name: {
        type: "string",
        description: "The name of the portfolio"
      },
      color: {
        type: "string",
        description: "Color of the portfolio (light-green, light-orange, light-blue, etc.)"
      },
      public: {
        type: "boolean",
        description: "Whether the portfolio is public to the workspace"
      },
      opt_fields: {
        type: "string",
        description: "Comma-separated list of optional fields to include"
      }
    },
    required: ["name"]
  }
};

export const updatePortfolioTool: Tool = {
  name: "asana_update_portfolio",
  description: "Update an existing portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      name: {
        type: "string",
        description: "New name for the portfolio"
      },
      color: {
        type: "string",
        description: "New color for the portfolio"
      },
      public: {
        type: "boolean",
        description: "Whether the portfolio should be public"
      },
      opt_fields: {
        type: "string",
        description: "Comma-separated list of optional fields to include"
      }
    },
    required: ["portfolio_gid"]
  }
};

export const deletePortfolioTool: Tool = {
  name: "asana_delete_portfolio",
  description: "Delete a portfolio",
  inputSchema: {
    type: "object",
    properties: {
      portfolio_gid: {
        type: "string",
        description: "Globally unique identifier for the portfolio. For URLs like https://app.asana.com/0/portfolio/1234567890/9876543210, use the first ID (1234567890) as the portfolio_gid."
      },
      opt_pretty: {
        type: "boolean",
        description: "Provides formatted output for debugging"
      }
    },
    required: ["portfolio_gid"]
  }
};