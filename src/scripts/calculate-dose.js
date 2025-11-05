#!/usr/bin/env node

/**
 * GS-441524 Dosage Calculator for FIP Treatment
 *
 * Calculates appropriate dosing based on weight and disease form
 * following UC Davis protocols
 */

import {
  DOSING_MAP,
  DISEASE_FORMS,
  DEFAULT_CONCENTRATION,
  TREATMENT_DURATION_DAYS,
  ORAL_TO_INJECTABLE_RATIO
} from './constants.js';

/**
 * Calculate GS-441524 dose
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.weight - Cat weight in kg
 * @param {string} params.diseaseForm - Disease form: wet, dry, ocular, or neurological
 * @param {number} [params.concentration] - Drug concentration in mg/ml
 * @returns {Object} Dosing calculation result
 */
export function calculateDose({ weight, diseaseForm, concentration = DEFAULT_CONCENTRATION }) {
  // Validate inputs
  if (typeof weight !== 'number' || weight <= 0) {
    throw new Error('Weight must be a positive number');
  }

  const normalizedForm = diseaseForm.toLowerCase();

  if (!DISEASE_FORMS.includes(normalizedForm)) {
    throw new Error(`Disease form must be one of: ${DISEASE_FORMS.join(', ')}`);
  }

  const mgPerKg = DOSING_MAP[normalizedForm];
  const totalMg = weight * mgPerKg;
  const volumeMl = totalMg / concentration;

  // Calculate weekly doses for 12-week treatment
  const dailyDose = totalMg;
  const weeklyDoses = dailyDose * 7;
  const totalTreatmentDoses = dailyDose * TREATMENT_DURATION_DAYS;

  return {
    weight_kg: weight,
    disease_form: normalizedForm,
    dose_mg_per_kg: mgPerKg,
    total_dose_mg: Math.round(totalMg * 100) / 100,
    volume_ml: Math.round(volumeMl * 1000) / 1000,
    concentration_mg_ml: concentration,
    weekly_amount_mg: Math.round(weeklyDoses * 100) / 100,
    full_treatment_mg: Math.round(totalTreatmentDoses * 100) / 100,
    treatment_duration_days: TREATMENT_DURATION_DAYS
  };
}

/**
 * Calculate dose adjustment for weight change
 *
 * @param {Object} params - Adjustment parameters
 * @param {number} params.currentWeight - Current weight in kg
 * @param {number} params.newWeight - New weight in kg
 * @param {number} params.currentDoseMg - Current daily dose in mg
 * @param {number} [params.concentration] - Drug concentration
 * @returns {Object} Adjustment calculation
 */
export function calculateWeightAdjustment({ currentWeight, newWeight, currentDoseMg, concentration = DEFAULT_CONCENTRATION }) {
  const weightRatio = newWeight / currentWeight;
  const newDoseMg = currentDoseMg * weightRatio;
  const newVolumeMl = newDoseMg / concentration;

  const weightChangeG = (newWeight - currentWeight) * 1000;
  const weightChangePercent = ((newWeight - currentWeight) / currentWeight) * 100;

  return {
    previous_weight_kg: currentWeight,
    current_weight_kg: newWeight,
    weight_change_g: Math.round(weightChangeG),
    weight_change_percent: Math.round(weightChangePercent * 10) / 10,
    previous_dose_mg: Math.round(currentDoseMg * 100) / 100,
    new_dose_mg: Math.round(newDoseMg * 100) / 100,
    new_volume_ml: Math.round(newVolumeMl * 1000) / 1000,
    dose_change_mg: Math.round((newDoseMg - currentDoseMg) * 100) / 100
  };
}

/**
 * Calculate oral to injectable conversion
 *
 * @param {Object} params - Conversion parameters
 * @param {number} params.oralDoseMg - Oral dose in mg
 * @param {number} [params.conversionRatio] - Oral to injectable ratio
 * @returns {Object} Conversion result
 */
export function convertOralToInjectable({ oralDoseMg, conversionRatio = ORAL_TO_INJECTABLE_RATIO }) {
  // Injectable is more bioavailable, so lower dose needed
  const injectableDoseMg = oralDoseMg / conversionRatio;

  return {
    oral_dose_mg: oralDoseMg,
    injectable_dose_mg: Math.round(injectableDoseMg * 100) / 100,
    conversion_ratio: conversionRatio,
    note: 'Injectable has higher bioavailability than oral'
  };
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node calculate-dose.js <weight_kg> <disease_form>');
    console.log('');
    console.log('Disease forms: wet, dry, ocular, neurological');
    console.log('');
    console.log('Example: node calculate-dose.js 3.5 neurological');
    process.exit(1);
  }

  const weight = parseFloat(args[0]);
  const diseaseForm = args[1];

  try {
    const result = calculateDose({ weight, diseaseForm });

    console.log('\n╔═══════════════════════════════════════════════╗');
    console.log('║  GS-441524 Dosing Calculation                ║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ Cat weight:        ${result.weight_kg} kg`.padEnd(48) + '║');
    console.log(`║ Disease form:      ${result.disease_form}`.padEnd(48) + '║');
    console.log(`║ Dose:              ${result.dose_mg_per_kg} mg/kg/day`.padEnd(48) + '║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ Total daily dose:  ${result.total_dose_mg} mg`.padEnd(48) + '║');
    console.log(`║ Volume to inject:  ${result.volume_ml} ml`.padEnd(48) + '║');
    console.log(`║ Concentration:     ${result.concentration_mg_ml} mg/ml`.padEnd(48) + '║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ Weekly amount:     ${result.weekly_amount_mg} mg (7 doses)`.padEnd(48) + '║');
    console.log(`║ 12-week treatment: ${result.full_treatment_mg} mg (84 doses)`.padEnd(48) + '║');
    console.log('╚═══════════════════════════════════════════════╝\n');

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

export default { calculateDose, calculateWeightAdjustment, convertOralToInjectable };
