/**
 * FIP Treatment Constants
 *
 * Shared constants for GS-441524 dosing and treatment calculations
 * Based on UC Davis protocols and ABCD guidelines
 * @module src/scripts/constants
 */

/**
 * GS-441524 dosing by disease form (mg/kg/day)
 *
 * Source: UC Davis FIP Treatment Protocol
 * - Wet/Dry FIP: 4-6 mg/kg (using middle to higher range)
 * - Ocular FIP: 8 mg/kg (requires higher CNS penetration)
 * - Neurological FIP: 10 mg/kg (requires highest CNS penetration)
 */
export const DOSING_MAP = {
  wet: 5,           // 4-6 mg/kg, using middle value
  dry: 6,           // 4-6 mg/kg, using higher end due to diagnostic uncertainty
  ocular: 8,        // 8 mg/kg for ocular involvement
  neurological: 10  // 10 mg/kg for neurological involvement
};

/**
 * Valid disease forms
 */
export const DISEASE_FORMS = Object.keys(DOSING_MAP);

/**
 * Default drug concentration (mg/ml)
 */
export const DEFAULT_CONCENTRATION = 15;

/**
 * Standard treatment duration (days)
 */
export const TREATMENT_DURATION_DAYS = 84;  // 12 weeks

/**
 * Standard treatment duration (weeks)
 */
export const TREATMENT_DURATION_WEEKS = 12;

/**
 * Weight gain rate assumption (5% per month for growing kittens)
 *
 * Used in cost estimation when accounting for weight gain during treatment.
 * Based on typical kitten growth rates. Adult cats should have minimal weight gain.
 */
export const WEIGHT_GAIN_RATE_MONTHLY = 0.05;

/**
 * Fever threshold (Celsius)
 *
 * Temperature above this value is considered fever in cats
 * Normal cat temperature range: 38.0-39.2°C (100.4-102.5°F)
 */
export const FEVER_THRESHOLD_CELSIUS = 39.2;

/**
 * Target A:G ratio for treatment success
 *
 * Albumin:Globulin ratio should normalize to ≥0.4 during treatment
 * Initial FIP values typically <0.4 (often <0.3)
 */
export const TARGET_AG_RATIO = 0.4;

/**
 * Oral to injectable conversion ratio
 *
 * Injectable GS-441524 has higher bioavailability than oral formulation
 * Oral dose should be ~1.5x higher than injectable for equivalent effect
 */
export const ORAL_TO_INJECTABLE_RATIO = 1.5;

export default {
  DOSING_MAP,
  DISEASE_FORMS,
  DEFAULT_CONCENTRATION,
  TREATMENT_DURATION_DAYS,
  TREATMENT_DURATION_WEEKS,
  WEIGHT_GAIN_RATE_MONTHLY,
  FEVER_THRESHOLD_CELSIUS,
  TARGET_AG_RATIO,
  ORAL_TO_INJECTABLE_RATIO
};
