/**
 * ⚠️  IMPORTANT: Keep values synchronized with src/app/shared/config/costs.config.ts
 * 
 * Central configuration for all membership costs and fees
 * This is one of TWO files that must be updated together:
 * 1. src/app/shared/config/costs.config.ts (frontend)
 * 2. THIS FILE (backend)
 */
const CostsConfig = {
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
class CostCalculator {
  
  /**
   * Calculate monthly cost based on member type and selected sports
   */
  static calculateMonthlyCost(isActive, isAdultOrEmployed, selectedSports) {
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
  static calculateAnnualCost(isActive) {
    return isActive ? CostsConfig.annual.active : CostsConfig.annual.passive;
  }
  
  /**
   * Get registration fee
   */
  static getRegistrationFee() {
    return CostsConfig.registrationFee;
  }
}

module.exports = {
  CostsConfig,
  CostCalculator
};