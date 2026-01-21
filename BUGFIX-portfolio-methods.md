# Bug Fix: Portfolio Methods Parameter Order

## Problem
The `asana_add_portfolio_item` tool was throwing the error:
```
"Cannot read properties of undefined (reading 'hasOwnProperty')"
```

## Root Cause
The portfolio methods in `src/asana-client-wrapper.ts` had incorrect parameter order when calling the Asana SDK methods. The Asana SDK expects:
- `addItemForPortfolio(body, portfolio_gid)` - 2 parameters
- `addMembersForPortfolio(body, portfolio_gid, opts)` - 3 parameters

But the code was passing parameters in the wrong order:
```typescript
// WRONG - parameters in wrong order
await this.portfolios.addItemForPortfolio(portfolioGid, { data }, options);
```

This caused the SDK to receive `undefined` for the `body` parameter, leading to the `hasOwnProperty` error when the SDK tried to validate the request body.

## Solution
Fixed the parameter order for all portfolio methods:

### Methods Fixed:
1. **addPortfolioItem** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid)`
2. **removePortfolioItem** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid)`
3. **addPortfolioMembers** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid, options)`
4. **removePortfolioMembers** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid, options)`
5. **addPortfolioCustomFieldSetting** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid, options)`
6. **removePortfolioCustomFieldSetting** - Changed from `(portfolioGid, { data }, options)` to `(body, portfolioGid, options)`

### Example Fix:
```typescript
// BEFORE (incorrect)
async addPortfolioItem(portfolioGid: string, item: string, options: any = {}) {
  const data = { item };
  const response = await this.portfolios.addItemForPortfolio(portfolioGid, { data }, options);
  return response.data;
}

// AFTER (correct)
async addPortfolioItem(portfolioGid: string, item: string, options: any = {}) {
  try {
    const body = { data: { item } };
    const response = await this.portfolios.addItemForPortfolio(body, portfolioGid);
    
    if (!response) {
      throw new Error('No response received from Asana API');
    }
    
    return response;
  } catch (error: any) {
    console.error(`Error adding item to portfolio: ${error.message}`);
    if (error.response && error.response.body) {
      console.error(`Response error details: ${JSON.stringify(error.response.body, null, 2)}`);
    }
    throw error;
  }
}
```

## Additional Improvements
- Added error handling with try-catch blocks
- Added response validation
- Added detailed error logging
- Changed return value from `response.data` to `response` for consistency with SDK behavior

## Testing
After this fix, the portfolio methods should work correctly:
- `asana_add_portfolio_item` - Add projects/portfolios to a portfolio
- `asana_remove_portfolio_item` - Remove projects/portfolios from a portfolio
- `asana_add_portfolio_members` - Add members to a portfolio
- `asana_remove_portfolio_members` - Remove members from a portfolio
- `asana_add_portfolio_custom_field_setting` - Add custom field settings
- `asana_remove_portfolio_custom_field_setting` - Remove custom field settings
