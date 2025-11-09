#!/usr/bin/env node

/**
 * FIP Treatment Cost Estimator
 *
 * Calculate estimated costs for GS-441524 treatment
 * Helps with client financial planning
 */

import {
  DOSING_MAP,
  DISEASE_FORMS,
  TREATMENT_DURATION_WEEKS,
  WEIGHT_GAIN_RATE_MONTHLY
} from './constants.js';

/**
 * Calculate treatment costs
 *
 * @param {Object} params - Cost parameters
 * @param {number} params.weight - Cat weight in kg
 * @param {string} params.diseaseForm - Disease form
 * @param {number} [params.durationWeeks] - Treatment duration in weeks
 * @param {number} params.drugCostPerMg - Cost per mg of GS-441524
 * @param {number} [params.weeklyMonitoringCost=0] - Weekly vet visit cost
 * @param {number} [params.monthlyBloodworkCost=0] - Monthly bloodwork cost
 * @param {boolean} [params.includeWeightGain=true] - Account for weight gain
 * @returns {Object} Cost breakdown
 */
export function estimateTreatmentCost({
  weight,
  diseaseForm,
  durationWeeks = TREATMENT_DURATION_WEEKS,
  drugCostPerMg,
  weeklyMonitoringCost = 0,
  monthlyBloodworkCost = 0,
  includeWeightGain = true
}) {
  const normalizedForm = diseaseForm.toLowerCase();
  const mgPerKg = DOSING_MAP[normalizedForm];

  if (!mgPerKg) {
    throw new Error(`Invalid disease form. Must be one of: ${DISEASE_FORMS.join(', ')}`);
  }

  // Calculate daily dose at start weight
  let dailyDoseMg = weight * mgPerKg;

  // Calculate total drug needed
  let totalDrugMg = 0;
  let currentWeight = weight;

  // Simulate weekly weight changes
  for (let week = 0; week < durationWeeks; week++) {
    const weeklyDose = dailyDoseMg * 7;
    totalDrugMg += weeklyDose;

    // Account for weight gain (typical: 5% per month for growing kittens)
    if (includeWeightGain && week % 4 === 0 && week > 0) {
      currentWeight *= (1 + WEIGHT_GAIN_RATE_MONTHLY);
      dailyDoseMg = currentWeight * mgPerKg;
    }
  }

  // Calculate costs
  const drugCost = totalDrugMg * drugCostPerMg;
  const monitoringCost = durationWeeks * weeklyMonitoringCost;
  const bloodworkCost = Math.ceil(durationWeeks / 4) * monthlyBloodworkCost;
  const totalCost = drugCost + monitoringCost + bloodworkCost;

  return {
    treatment_parameters: {
      weight_start_kg: weight,
      weight_end_kg: Math.round(currentWeight * 100) / 100,
      disease_form: normalizedForm,
      dose_mg_per_kg: mgPerKg,
      duration_weeks: durationWeeks,
      duration_days: durationWeeks * 7
    },
    drug_costs: {
      total_mg_needed: Math.round(totalDrugMg),
      cost_per_mg: drugCostPerMg,
      total_drug_cost: Math.round(drugCost * 100) / 100
    },
    monitoring_costs: {
      weekly_visits: durationWeeks,
      cost_per_visit: weeklyMonitoringCost,
      total_monitoring: Math.round(monitoringCost * 100) / 100
    },
    bloodwork_costs: {
      number_of_tests: Math.ceil(durationWeeks / 4),
      cost_per_test: monthlyBloodworkCost,
      total_bloodwork: Math.round(bloodworkCost * 100) / 100
    },
    total_estimated_cost: Math.round(totalCost * 100) / 100,
    weekly_average: Math.round((totalCost / durationWeeks) * 100) / 100
  };
}

/**
 * Compare costs across different scenarios
 */
export function compareCosts(baseParams, scenarios) {
  const results = scenarios.map(scenario => {
    const params = { ...baseParams, ...scenario };
    return {
      name: scenario.name || 'Scenario',
      ...estimateTreatmentCost(params)
    };
  });

  return results;
}

/**
 * Calculate break-even analysis for different drug sources
 */
export function compareSuppliers(params, suppliers) {
  const results = suppliers.map(supplier => {
    const cost = estimateTreatmentCost({
      ...params,
      drugCostPerMg: supplier.costPerMg
    });

    return {
      supplier_name: supplier.name,
      cost_per_mg: supplier.costPerMg,
      total_cost: cost.total_estimated_cost,
      drug_cost: cost.drug_costs.total_drug_cost,
      non_drug_cost: cost.monitoring_costs.total_monitoring + cost.bloodwork_costs.total_bloodwork
    };
  });

  // Sort by total cost
  results.sort((a, b) => a.total_cost - b.total_cost);

  return results;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: node cost-estimator.js <weight_kg> <disease_form> <cost_per_mg>');
    console.log('');
    console.log('Example: node cost-estimator.js 3.5 neurological 0.50');
    console.log('');
    console.log('Optional: Add weekly monitoring cost and monthly bloodwork cost');
    console.log('Example: node cost-estimator.js 3.5 neurological 0.50 50 150');
    process.exit(1);
  }

  const weight = parseFloat(args[0]);
  const diseaseForm = args[1];
  const drugCostPerMg = parseFloat(args[2]);
  const weeklyMonitoringCost = args[3] ? parseFloat(args[3]) : 0;
  const monthlyBloodworkCost = args[4] ? parseFloat(args[4]) : 0;

  try {
    const result = estimateTreatmentCost({
      weight,
      diseaseForm,
      drugCostPerMg,
      weeklyMonitoringCost,
      monthlyBloodworkCost,
      durationWeeks: 12
    });

    console.log('\n╔═══════════════════════════════════════════════╗');
    console.log('║  FIP Treatment Cost Estimate                 ║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ Weight (start): ${result.treatment_parameters.weight_start_kg} kg`.padEnd(48) + '║');
    console.log(`║ Weight (end):   ${result.treatment_parameters.weight_end_kg} kg`.padEnd(48) + '║');
    console.log(`║ Disease form:   ${result.treatment_parameters.disease_form}`.padEnd(48) + '║');
    console.log(`║ Duration:       ${result.treatment_parameters.duration_weeks} weeks`.padEnd(48) + '║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ Drug needed:    ${result.drug_costs.total_mg_needed} mg`.padEnd(48) + '║');
    console.log(`║ Drug cost:      $${result.drug_costs.total_drug_cost}`.padEnd(48) + '║');
    console.log(`║ Monitoring:     $${result.monitoring_costs.total_monitoring}`.padEnd(48) + '║');
    console.log(`║ Bloodwork:      $${result.bloodwork_costs.total_bloodwork}`.padEnd(48) + '║');
    console.log('╠═══════════════════════════════════════════════╣');
    console.log(`║ TOTAL ESTIMATE: $${result.total_estimated_cost}`.padEnd(48) + '║');
    console.log(`║ Weekly average: $${result.weekly_average}`.padEnd(48) + '║');
    console.log('╚═══════════════════════════════════════════════╝\n');

    console.log('Note: Estimate includes typical weight gain during treatment');
    console.log('Actual costs may vary based on individual response\n');

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

export default { estimateTreatmentCost, compareCosts, compareSuppliers };
