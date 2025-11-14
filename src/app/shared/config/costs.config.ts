/**
 * ⚠️  IMPORTANT: Keep values synchronized with server/config/costs.config.js
 * 
 * Central configuration for all membership costs and fees
 * This is one of TWO files that must be updated together:
 * 1. THIS FILE (frontend)
 * 2. server/config/costs.config.js (backend)
 */
export const CostsConfig = {
    // Registration fee (one-time payment)
    registrationFee: 30,

    // Monthly membership fees for active members
    monthly: {
        // Single sport for adults/employed
        singleSportAdultEmployed: 18,
        // Single sport for children/students
        singleSportChildStudent: 15,
        // All sports for adults/employed  
        allSportsAdultEmployed: 25,
        // All sports for children/students
        allSportsChildStudent: 20
    },

    // Annual membership fees for passive members
    annual: {
        // Passive membership (no training)
        passive: 20,
        // Active membership base fee
        active: 30
    },

    // Currency symbol
    currency: '€'
};

/**
 * Helper functions for cost calculations
 */
export class CostCalculator {

    /**
     * Calculate monthly cost based on member type and selected sports
     */
    static calculateMonthlyCost(
        isActive: boolean,
        isAdultOrEmployed: boolean,
        selectedSports: { karate: boolean, selbst: boolean, arnis: boolean }
    ): number {
        if (!isActive) {
            return 0;
        }

        const { karate, selbst, arnis } = selectedSports;
        const selectedCount = [karate, selbst, arnis].filter(Boolean).length;

        // If all three sports are selected, apply discount
        if (karate && selbst && arnis) {
            return isAdultOrEmployed ?
                CostsConfig.monthly.allSportsAdultEmployed :
                CostsConfig.monthly.allSportsChildStudent;
        }

        // Calculate cost per sport
        const costPerSport = isAdultOrEmployed ?
            CostsConfig.monthly.singleSportAdultEmployed :
            CostsConfig.monthly.singleSportChildStudent;

        return selectedCount * costPerSport;
    }

    /**
     * Calculate annual cost based on member type
     */
    static calculateAnnualCost(isActive: boolean): number {
        return isActive ? CostsConfig.annual.active : CostsConfig.annual.passive;
    }

    /**
     * Get registration fee
     */
    static getRegistrationFee(): number {
        return CostsConfig.registrationFee;
    }
}