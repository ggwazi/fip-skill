/**
 * Integration Tests: Script Integration
 *
 * Tests that all utility scripts work together correctly
 * and can be used in realistic workflows.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..', '..');

// Import all utility scripts
const { calculateDose, calculateWeightAdjustment, convertOralToInjectable } =
  await import(join(ROOT_DIR, 'src', 'scripts', 'calculate-dose.js'));
const { DOSING_MAP, TREATMENT_DURATION_DAYS, DEFAULT_CONCENTRATION } =
  await import(join(ROOT_DIR, 'src', 'scripts', 'constants.js'));

describe('Script Integration Tests', () => {

  describe('Dose Calculator Integration', () => {
    it('should calculate dose for wet FIP case', () => {
      const result = calculateDose({
        weight: 3.5,
        diseaseForm: 'wet',
        concentration: 15
      });

      assert.ok(result.total_dose_mg, 'Should return dose');
      assert.ok(result.volume_ml, 'Should return volume');
      assert.strictEqual(result.disease_form, 'wet', 'Should preserve disease form');
      assert.strictEqual(result.dose_mg_per_kg, DOSING_MAP.wet, 'Should use correct dosing map');
    });

    it('should calculate dose for neurological FIP case', () => {
      const result = calculateDose({
        weight: 2.8,
        diseaseForm: 'neurological',
        concentration: 20
      });

      assert.strictEqual(result.dose_mg_per_kg, DOSING_MAP.neurological, 'Should use neuro dosing');
      assert.ok(result.total_dose_mg > 0, 'Should calculate positive dose');
      assert.ok(result.volume_ml > 0, 'Should calculate positive volume');
    });

    it('should calculate full treatment amount', () => {
      const result = calculateDose({
        weight: 3.0,
        diseaseForm: 'wet',
        concentration: 15
      });

      assert.ok(result.full_treatment_mg, 'Should include full treatment dose');
      assert.strictEqual(
        result.full_treatment_mg,
        result.total_dose_mg * TREATMENT_DURATION_DAYS,
        'Full treatment should be daily dose × duration'
      );
    });

    it('should handle all disease forms', () => {
      const diseaseForms = ['wet', 'dry', 'ocular', 'neurological'];
      const weight = 3.5;

      for (const form of diseaseForms) {
        const result = calculateDose({
          weight,
          diseaseForm: form,
          concentration: 15
        });

        assert.ok(result.total_dose_mg > 0, `Should calculate dose for ${form} FIP`);
        assert.strictEqual(result.disease_form, form, `Should preserve ${form} disease form`);
        assert.ok(DOSING_MAP[form], `Should have dosing map for ${form}`);
      }
    });

    it('should throw error for invalid weight', () => {
      assert.throws(
        () => calculateDose({ weight: -1, diseaseForm: 'wet' }),
        /weight/i,
        'Should reject negative weight'
      );

      assert.throws(
        () => calculateDose({ weight: 0, diseaseForm: 'wet' }),
        /weight/i,
        'Should reject zero weight'
      );
    });

    it('should throw error for invalid disease form', () => {
      assert.throws(
        () => calculateDose({ weight: 3.5, diseaseForm: 'invalid' }),
        /disease.*form/i,
        'Should reject invalid disease form'
      );
    });
  });

  describe('Weight Adjustment Integration', () => {
    it('should calculate weight gain adjustment', () => {
      const originalDose = calculateDose({
        weight: 2.0,
        diseaseForm: 'wet',
        concentration: 15
      });

      const adjustment = calculateWeightAdjustment({
        currentWeight: 2.0,
        newWeight: 2.3,
        currentDoseMg: originalDose.total_dose_mg,
        concentration: 15
      });

      assert.ok(adjustment.new_dose_mg > originalDose.total_dose_mg, 'Dose should increase with weight gain');
      assert.ok(adjustment.new_volume_ml > originalDose.volume_ml, 'Volume should increase with weight gain');
      assert.ok(adjustment.weight_change_g > 0, 'Should calculate positive weight change');
    });

    it('should calculate weight loss adjustment', () => {
      const originalDose = calculateDose({
        weight: 3.0,
        diseaseForm: 'wet',
        concentration: 15
      });

      const adjustment = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 2.7,
        currentDoseMg: originalDose.total_dose_mg,
        concentration: 15
      });

      assert.ok(adjustment.new_dose_mg < originalDose.total_dose_mg, 'Dose should decrease with weight loss');
      assert.ok(adjustment.weight_change_g < 0, 'Weight change should be negative');
    });

    it('should handle no weight change', () => {
      const originalDose = calculateDose({
        weight: 3.0,
        diseaseForm: 'wet',
        concentration: 15
      });

      const adjustment = calculateWeightAdjustment({
        currentWeight: 3.0,
        newWeight: 3.0,
        currentDoseMg: originalDose.total_dose_mg,
        concentration: 15
      });

      assert.strictEqual(adjustment.weight_change_g, 0, 'Weight change should be zero');
    });
  });

  describe('Oral to Injectable Conversion Integration', () => {
    it('should convert oral dose to injectable', () => {
      const oralDose = calculateDose({
        weight: 3.0,
        diseaseForm: 'wet',
        concentration: 15
      });

      const injectable = convertOralToInjectable({
        oralDoseMg: oralDose.total_dose_mg
      });

      assert.ok(injectable.injectable_dose_mg > 0, 'Should calculate injectable dose');
      assert.ok(
        injectable.injectable_dose_mg < oralDose.total_dose_mg,
        'Injectable dose should be less than oral due to bioavailability'
      );
    });
  });

  describe('Multi-Script Workflow: Complete Treatment Planning', () => {
    it('should support complete treatment planning workflow', () => {
      // Step 1: Initial dose calculation
      const cat = {
        weight: 2.5,
        diseaseForm: 'wet'
      };

      const initialDose = calculateDose({
        weight: cat.weight,
        diseaseForm: cat.diseaseForm,
        concentration: DEFAULT_CONCENTRATION
      });

      assert.ok(initialDose.total_dose_mg, 'Step 1: Should calculate initial dose');
      assert.ok(initialDose.full_treatment_mg, 'Should calculate full treatment amount');

      // Step 2: Weight adjustment after 2 weeks
      const newWeight = 2.8; // Cat gained weight
      const adjustedDose = calculateWeightAdjustment({
        currentWeight: cat.weight,
        newWeight,
        currentDoseMg: initialDose.total_dose_mg,
        concentration: DEFAULT_CONCENTRATION
      });

      assert.ok(
        adjustedDose.new_dose_mg > initialDose.total_dose_mg,
        'Step 2: Dose should increase with weight gain'
      );

      // Step 3: Convert to injectable if needed
      const injectableConversion = convertOralToInjectable({
        oralDoseMg: adjustedDose.new_dose_mg
      });

      assert.ok(
        injectableConversion.injectable_dose_mg,
        'Step 3: Should convert to injectable if needed'
      );

      // Verify workflow consistency
      assert.ok(
        injectableConversion.injectable_dose_mg < adjustedDose.new_dose_mg,
        'Injectable conversion should account for bioavailability'
      );
    });

    it('should handle different concentrations consistently', () => {
      const weight = 3.0;
      const diseaseForm = 'wet';

      const concentrations = [15, 20, 25];
      const doses = concentrations.map(conc => {
        const result = calculateDose({
          weight,
          diseaseForm,
          concentration: conc
        });
        return { concentration: conc, ...result };
      });

      // All should have same mg dose
      const firstDose = doses[0].total_dose_mg;
      for (const d of doses) {
        assert.strictEqual(
          d.total_dose_mg,
          firstDose,
          `Dose in mg should be same regardless of concentration (${d.concentration_mg_ml}mg/ml)`
        );
      }

      // Higher concentration should mean lower volume
      assert.ok(
        doses[2].volume_ml < doses[1].volume_ml,
        '25mg/ml should require less volume than 20mg/ml'
      );
      assert.ok(
        doses[1].volume_ml < doses[0].volume_ml,
        '20mg/ml should require less volume than 15mg/ml'
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle very small kittens', () => {
      const tinyKitten = calculateDose({
        weight: 0.5, // 500g kitten
        diseaseForm: 'wet',
        concentration: 20 // Higher concentration for smaller volume
      });

      assert.ok(tinyKitten.total_dose_mg > 0, 'Should calculate dose for tiny kitten');
      assert.ok(tinyKitten.volume_ml > 0, 'Should calculate volume');
      assert.ok(tinyKitten.volume_ml < 1, 'Volume should be manageable for tiny kitten');
    });

    it('should handle large cats', () => {
      const largeCat = calculateDose({
        weight: 8.0, // Large cat
        diseaseForm: 'neurological',
        concentration: 15
      });

      assert.ok(largeCat.total_dose_mg > 0, 'Should calculate dose for large cat');
      assert.ok(largeCat.volume_ml > 0, 'Should calculate volume');
    });

    it('should handle decimal weights precisely', () => {
      const result1 = calculateDose({
        weight: 3.14159,
        diseaseForm: 'wet',
        concentration: 15
      });

      assert.ok(result1.total_dose_mg > 0, 'Should handle decimal weights');
      assert.ok(Number.isFinite(result1.total_dose_mg), 'Dose should be finite number');
      assert.ok(Number.isFinite(result1.volume_ml), 'Volume should be finite number');
    });
  });

  describe('Constants Validation', () => {
    it('should have all required dosing constants', () => {
      assert.ok(DOSING_MAP, 'DOSING_MAP should be exported');
      assert.ok(DOSING_MAP.wet, 'Should have wet FIP dosing');
      assert.ok(DOSING_MAP.dry, 'Should have dry FIP dosing');
      assert.ok(DOSING_MAP.ocular, 'Should have ocular FIP dosing');
      assert.ok(DOSING_MAP.neurological, 'Should have neurological FIP dosing');
    });

    it('should have dosing values in expected ranges', () => {
      // Per UC Davis protocols
      assert.strictEqual(DOSING_MAP.wet, 5, 'Wet FIP should be 5 mg/kg');
      assert.strictEqual(DOSING_MAP.dry, 6, 'Dry FIP should be 6 mg/kg');
      assert.ok(DOSING_MAP.ocular >= 8, 'Ocular FIP should be ≥8 mg/kg');
      assert.ok(DOSING_MAP.neurological >= 10, 'Neurological FIP should be ≥10 mg/kg');
    });

    it('should have correct treatment duration', () => {
      assert.strictEqual(
        TREATMENT_DURATION_DAYS,
        84,
        'Treatment duration should be 84 days (12 weeks)'
      );
    });

    it('should have default concentration', () => {
      assert.strictEqual(DEFAULT_CONCENTRATION, 15, 'Default concentration should be 15 mg/ml');
    });
  });

  describe('Real-World Case Simulations', () => {
    it('should simulate wet FIP case: young cat, effusive disease', () => {
      // 6-month-old kitten, 2.2 kg, effusive FIP
      const patientData = {
        age: 6, // months
        weight: 2.2,
        diseaseForm: 'wet',
        concentration: 15
      };

      const treatment = calculateDose({
        weight: patientData.weight,
        diseaseForm: patientData.diseaseForm,
        concentration: patientData.concentration
      });

      // Validations
      assert.strictEqual(treatment.dose_mg_per_kg, 5, 'Wet FIP uses 5 mg/kg');
      assert.strictEqual(treatment.total_dose_mg, 11, 'Dose should be 11mg (2.2kg × 5mg/kg)');
      assert.strictEqual(treatment.volume_ml, 0.733, 'Volume should be 0.733ml');
      assert.ok(treatment.full_treatment_mg, 'Should include 84-day total');
    });

    it('should simulate neurological FIP case: adult cat, CNS signs', () => {
      // 3-year-old cat, 4.5 kg, neurological FIP
      const patientData = {
        weight: 4.5,
        diseaseForm: 'neurological',
        concentration: 20 // Higher concentration to reduce volume
      };

      const treatment = calculateDose({
        weight: patientData.weight,
        diseaseForm: patientData.diseaseForm,
        concentration: patientData.concentration
      });

      // Validations
      assert.strictEqual(treatment.dose_mg_per_kg, 10, 'Neuro FIP uses 10 mg/kg');
      assert.strictEqual(treatment.total_dose_mg, 45, 'Dose should be 45mg (4.5kg × 10mg/kg)');
      assert.strictEqual(treatment.volume_ml, 2.25, 'Volume should be 2.25ml at 20mg/ml');
    });

    it('should simulate treatment failure case: dose escalation', () => {
      // Cat not responding to wet FIP dosing, escalate to dry FIP dose
      const initialWeight = 3.0;

      const initialTreatment = calculateDose({
        weight: initialWeight,
        diseaseForm: 'wet',
        concentration: 15
      });

      const escalatedTreatment = calculateDose({
        weight: initialWeight,
        diseaseForm: 'dry', // Escalate to dry FIP dosing
        concentration: 15
      });

      assert.ok(
        escalatedTreatment.total_dose_mg > initialTreatment.total_dose_mg,
        'Escalated dose should be higher'
      );

      assert.strictEqual(
        escalatedTreatment.total_dose_mg - initialTreatment.total_dose_mg,
        3.0, // 6 mg/kg - 5 mg/kg = 1 mg/kg × 3 kg = 3mg
        'Dose increase should be 1 mg/kg difference'
      );
    });
  });
});
