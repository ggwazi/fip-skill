import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculateDose, calculateWeightAdjustment } from '../../src/scripts/calculate-dose.js';

describe('Dose Calculator', () => {
  describe('calculateDose', () => {
    test('calculates correct dose for wet FIP', () => {
      const result = calculateDose({ weight: 3, diseaseForm: 'wet' });
      assert.strictEqual(result.dose_mg_per_kg, 5);
      assert.strictEqual(result.total_dose_mg, 15);
      assert.strictEqual(result.volume_ml, 1);
    });

    test('calculates correct dose for neurological FIP', () => {
      const result = calculateDose({ weight: 3.5, diseaseForm: 'neurological' });
      assert.strictEqual(result.dose_mg_per_kg, 10);
      assert.strictEqual(result.total_dose_mg, 35);
      assert.strictEqual(Math.round(result.volume_ml * 1000) / 1000, 2.333);
    });

    test('calculates correct dose for ocular FIP', () => {
      const result = calculateDose({ weight: 4, diseaseForm: 'ocular' });
      assert.strictEqual(result.dose_mg_per_kg, 8);
      assert.strictEqual(result.total_dose_mg, 32);
    });

    test('handles different concentrations', () => {
      const result = calculateDose({ weight: 3, diseaseForm: 'wet', concentration: 20 });
      assert.strictEqual(result.volume_ml, 0.75);
      assert.strictEqual(result.concentration_mg_ml, 20);
    });

    test('throws error for invalid weight', () => {
      assert.throws(() => {
        calculateDose({ weight: -1, diseaseForm: 'wet' });
      }, /Weight must be a positive number/);
    });

    test('throws error for zero weight', () => {
      assert.throws(() => {
        calculateDose({ weight: 0, diseaseForm: 'wet' });
      }, /Weight must be a positive number/);
    });

    test('throws error for invalid disease form', () => {
      assert.throws(() => {
        calculateDose({ weight: 3, diseaseForm: 'invalid' });
      }, /Disease form must be one of/);
    });

    test('handles case-insensitive disease forms', () => {
      const result1 = calculateDose({ weight: 3, diseaseForm: 'WET' });
      const result2 = calculateDose({ weight: 3, diseaseForm: 'Wet' });
      assert.strictEqual(result1.total_dose_mg, result2.total_dose_mg);
    });

    test('calculates full treatment amount', () => {
      const result = calculateDose({ weight: 3, diseaseForm: 'wet' });
      assert.strictEqual(result.full_treatment_mg, 15 * 84);
      assert.strictEqual(result.treatment_duration_days, 84);
    });
  });

  describe('calculateWeightAdjustment', () => {
    test('calculates dose increase for weight gain', () => {
      const result = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 3.3,
        currentDoseMg: 15
      });

      assert.strictEqual(result.current_weight_kg, 3.3);
      assert.strictEqual(result.weight_change_g, 300);
      assert.strictEqual(result.weight_change_percent, 10);
      assert.strictEqual(result.new_dose_mg, 16.5);
    });

    test('calculates dose decrease for weight loss', () => {
      const result = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 2.7,
        currentDoseMg: 15
      });

      assert.strictEqual(result.weight_change_g, -300);
      assert.ok(result.weight_change_percent < 0);
      assert.ok(result.new_dose_mg < result.previous_dose_mg);
    });

    test('handles no weight change', () => {
      const result = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 3.0,
        currentDoseMg: 15
      });

      assert.strictEqual(result.weight_change_g, 0);
      assert.strictEqual(result.new_dose_mg, result.previous_dose_mg);
    });

    test('uses correct concentration for volume calculation', () => {
      const result = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 3.3,
        currentDoseMg: 15,
        concentration: 20
      });

      assert.strictEqual(result.new_volume_ml, 16.5 / 20);
    });
  });
});
