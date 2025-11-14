# Costs Configuration System

This application now uses a centralized configuration system for all membership costs and fees. This makes it easy to update costs without having to search through multiple files.

## How to Update Costs

All cost values are now centralized in two configuration files:

### Frontend Configuration
- **File**: `src/app/shared/config/costs.config.ts`
- **Purpose**: Used by Angular components

### Backend Configuration  
- **File**: `server/config/costs.config.js`
- **Purpose**: Used by Node.js server and email templates

## Current Cost Structure

### Registration Fee
- **One-time payment when joining**: 30€

### Monthly Fees (Active Members)
- **Single sport (Adults/Employed)**: 18€
- **Single sport (Children/Students)**: 15€  
- **All sports (Adults/Employed)**: 25€ (discount when selecting all 3 sports)
- **All sports (Children/Students)**: 20€ (discount when selecting all 3 sports)

### Annual Fees
- **Passive membership**: 20€ (no training)
- **Active membership base**: 30€

## To Update Costs

1. **Frontend costs**: Edit `src/app/shared/config/costs.config.ts`
2. **Backend costs**: Edit `server/config/costs.config.js`
3. Make sure both files have the **same values**

### Example: Changing Registration Fee to 35€

**Frontend (`costs.config.ts`):**
```typescript
export const CostsConfig = {
  registrationFee: 35, // Changed from 30 to 35
  // ... rest of config
};
```

**Backend (`costs.config.js`):**
```javascript
const CostsConfig = {
  registrationFee: 35, // Changed from 30 to 35
  // ... rest of config
};
```

## Where Values Are Used

### Frontend (Angular)
- `antrag.component.html` - Registration form displays costs
- `antrag.component.ts` - Calculates monthly/annual costs
- `kuendigung.component.html` - Cancellation form shows passive cost
- `kuendigung.component.ts` - Provides passive annual fee

### Backend (Node.js)
- `server/mailhelper.js` - Adds cost values to email context
- `server/templates/views/antrag.handlebars` - **ACTIVE** Registration email template
- `server/templates/views/kuendigung.handlebars` - **ACTIVE** Cancellation email template
- `server/templates/UNUSED_*.html.backup` - Legacy HTML templates (not used by email system)

## Benefits of This System

1. **Single source of truth** - All costs are defined in one place
2. **Easy maintenance** - Update costs in 2 files instead of searching through many files
3. **Consistency** - Frontend and backend always show the same values
4. **Error reduction** - No risk of forgetting to update a value somewhere
5. **Type safety** - TypeScript configuration provides autocompletion and error checking

## Important Notes

- Always update **both** configuration files (frontend and backend) with the same values
- The system automatically calculates discounts when all 3 sports are selected
- Email templates now dynamically insert cost values instead of using hardcoded text
- Test the application after making changes to ensure everything works correctly