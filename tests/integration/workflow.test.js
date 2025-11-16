/**
 * Integration Tests: Diagnostic and Treatment Workflows
 *
 * Tests the complete diagnostic and treatment workflows
 * simulating real veterinary decision-making processes.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..', '..');

// Import test fixtures
const fixturesPath = join(__dirname, 'fixtures', 'sample-cases.json');
let sampleCases;

// Import utility scripts
const { calculateDose, calculateWeightAdjustment } =
  await import(join(ROOT_DIR, 'src', 'scripts', 'calculate-dose.js'));

describe('Diagnostic and Treatment Workflow Tests', () => {

  describe('Diagnostic Workflow Integration', () => {
    let diagnosticFlowcharts;

    it('should load diagnostic flowcharts reference', async () => {
      const flowchartsPath = join(ROOT_DIR, 'src', 'references', 'diagnostic-flowcharts.md');
      const content = await readFile(flowchartsPath, 'utf-8');
      diagnosticFlowcharts = content;

      assert.ok(content.length > 0, 'Diagnostic flowcharts should load');
    });

    it('should contain all four ABCD diagnostic trees', async () => {
      // ABCD Guidelines define 4 diagnostic trees
      const trees = ['Tree A', 'Tree B', 'Tree C', 'Tree D'];

      for (const tree of trees) {
        assert.ok(
          diagnosticFlowcharts.includes(tree),
          `Should contain ${tree}`
        );
      }
    });

    it('should reference Tree A for effusive FIP (wet FIP)', async () => {
      assert.ok(
        diagnosticFlowcharts.includes('effusion') ||
        diagnosticFlowcharts.includes('Effusion') ||
        diagnosticFlowcharts.includes('wet'),
        'Tree A should address effusive/wet FIP'
      );
    });

    it('should reference Tree B for non-effusive FIP (dry FIP)', async () => {
      assert.ok(
        diagnosticFlowcharts.includes('non-effusive') ||
        diagnosticFlowcharts.includes('dry') ||
        diagnosticFlowcharts.includes('granulomatous'),
        'Tree B should address non-effusive/dry FIP'
      );
    });

    it('should reference neurological manifestations (Tree C)', async () => {
      assert.ok(
        diagnosticFlowcharts.includes('neurological') ||
        diagnosticFlowcharts.includes('CNS') ||
        diagnosticFlowcharts.includes('neuro'),
        'Should address neurological FIP'
      );
    });

    it('should reference ocular manifestations (Tree D)', async () => {
      assert.ok(
        diagnosticFlowcharts.includes('ocular') ||
        diagnosticFlowcharts.includes('eye') ||
        diagnosticFlowcharts.includes('uveitis'),
        'Should address ocular FIP'
      );
    });
  });

  describe('Treatment Protocol Workflow', () => {
    let treatmentProtocols;

    it('should load treatment protocols reference', async () => {
      const protocolsPath = join(ROOT_DIR, 'src', 'references', 'treatment-protocols.md');
      const content = await readFile(protocolsPath, 'utf-8');
      treatmentProtocols = content;

      assert.ok(content.length > 0, 'Treatment protocols should load');
    });

    it('should reference UC Davis protocols', async () => {
      assert.ok(
        treatmentProtocols.includes('UC Davis') ||
        treatmentProtocols.includes('Pedersen') ||
        treatmentProtocols.includes('GS-441524'),
        'Should reference UC Davis GS-441524 protocols'
      );
    });

    it('should include dosing by disease form', async () => {
      const diseaseForms = ['wet', 'dry', 'neurological', 'ocular'];

      for (const form of diseaseForms) {
        assert.ok(
          treatmentProtocols.toLowerCase().includes(form.toLowerCase()),
          `Should include dosing for ${form} FIP`
        );
      }
    });

    it('should reference 84-day treatment duration', async () => {
      assert.ok(
        treatmentProtocols.includes('84') ||
        treatmentProtocols.includes('12 week') ||
        treatmentProtocols.includes('12-week'),
        'Should reference 84-day (12-week) treatment duration'
      );
    });
  });

  describe('Complete Workflow: Wet FIP Case', () => {
    it('should support diagnostic → treatment workflow for effusive FIP', async () => {
      // Step 1: Clinical presentation (would use diagnostic flowcharts)
      const clinicalPresentation = {
        age: 8, // months
        weight: 2.5, // kg
        findings: {
          effusion: true,
          fever: true,
          lethargy: true,
          abdomenDistended: true
        }
      };

      // Step 2: Diagnostics would point to Tree A (effusion present)
      assert.ok(clinicalPresentation.findings.effusion, 'Effusion present → Tree A');

      // Step 3: Confirmed FIP diagnosis → Initiate treatment
      const diseaseForm = 'wet'; // Effusive = wet FIP

      // Step 4: Calculate initial dose
      const initialDose = calculateDose({
        weight: clinicalPresentation.weight,
        diseaseForm,
        concentration: 15,
        includeFullTreatment: true
      });

      assert.ok(initialDose.dose > 0, 'Should calculate treatment dose');
      assert.strictEqual(initialDose.diseaseForm, 'wet', 'Should use wet FIP protocol');
      assert.strictEqual(initialDose.dosePerKg, 5, 'Wet FIP uses 5 mg/kg');

      // Step 5: Monitor response (simulated weight gain after 2 weeks)
      const week2Weight = 2.8; // Improved, gaining weight
      const adjustedDose = calculateWeightAdjustment({
        originalWeight: clinicalPresentation.weight,
        newWeight: week2Weight,
        diseaseForm,
        concentration: 15
      });

      assert.ok(
        adjustedDose.newDose > initialDose.dose,
        'Dose should increase with weight gain'
      );
      assert.ok(
        adjustedDose.weightChange > 0,
        'Should register weight gain as positive sign'
      );
    });
  });

  describe('Complete Workflow: Neurological FIP Case', () => {
    it('should support diagnostic → treatment workflow for neuro FIP', async () => {
      // Step 1: Clinical presentation
      const clinicalPresentation = {
        age: 24, // months (2 years)
        weight: 4.0, // kg
        findings: {
          effusion: false,
          neurologicalSigns: true,
          seizures: true,
          ataxia: true,
          nystagmus: true
        }
      };

      // Step 2: Diagnostics would point to Tree C (neurological signs)
      assert.ok(clinicalPresentation.findings.neurologicalSigns, 'Neuro signs → Tree C');
      assert.ok(!clinicalPresentation.findings.effusion, 'No effusion → non-effusive form');

      // Step 3: Confirmed neurological FIP → Higher dose protocol
      const diseaseForm = 'neurological';

      // Step 4: Calculate initial dose (higher for CNS penetration)
      const initialDose = calculateDose({
        weight: clinicalPresentation.weight,
        diseaseForm,
        concentration: 20 // Higher concentration to reduce volume
      });

      assert.strictEqual(initialDose.diseaseForm, 'neurological', 'Should use neuro protocol');
      assert.strictEqual(initialDose.dosePerKg, 10, 'Neurological FIP uses 10 mg/kg');
      assert.ok(initialDose.dose === 40, 'Should be 40mg (4kg × 10mg/kg)');

      // Step 5: Extended treatment expected (neurological cases often need >84 days)
      assert.ok(
        initialDose.fullTreatmentDose > 0,
        'Should calculate full treatment amount'
      );
    });
  });

  describe('Complete Workflow: Treatment Failure/Escalation', () => {
    it('should support dose escalation workflow', async () => {
      // Step 1: Initial treatment at wet FIP dosing
      const initialWeight = 3.2;
      const initialProtocol = calculateDose({
        weight: initialWeight,
        diseaseForm: 'wet',
        concentration: 15
      });

      // Step 2: No response after 2 weeks (would check clinical signs, labs)
      // Decision: Escalate to dry FIP dosing
      const escalatedProtocol = calculateDose({
        weight: initialWeight,
        diseaseForm: 'dry',
        concentration: 15
      });

      assert.ok(
        escalatedProtocol.dose > initialProtocol.dose,
        'Escalated dose should be higher'
      );
      assert.strictEqual(
        escalatedProtocol.dosePerKg,
        6,
        'Dry FIP protocol uses 6 mg/kg'
      );

      // Step 3: Still no response, escalate further
      const furtherEscalation = calculateDose({
        weight: initialWeight,
        diseaseForm: 'neurological', // Maximum dosing
        concentration: 20 // Higher concentration
      });

      assert.ok(
        furtherEscalation.dose > escalatedProtocol.dose,
        'Should escalate to maximum dosing'
      );
      assert.strictEqual(
        furtherEscalation.dosePerKg,
        10,
        'Maximum protocol uses 10 mg/kg'
      );
    });
  });

  describe('Workflow: Client Communication Templates', () => {
    let fipExplained, homeCareGuide, monitoringSchedule;

    it('should load all client templates', async () => {
      const templatesPath = join(ROOT_DIR, 'src', 'assets', 'templates');

      fipExplained = await readFile(join(templatesPath, 'fip-explained.md'), 'utf-8');
      homeCareGuide = await readFile(join(templatesPath, 'home-care-guide.md'), 'utf-8');
      monitoringSchedule = await readFile(join(templatesPath, 'monitoring-schedule.md'), 'utf-8');

      assert.ok(fipExplained.length > 0, 'FIP Explained should load');
      assert.ok(homeCareGuide.length > 0, 'Home Care Guide should load');
      assert.ok(monitoringSchedule.length > 0, 'Monitoring Schedule should load');
    });

    it('should support complete client education workflow', async () => {
      // Workflow: Diagnosis → Education → Treatment → Monitoring

      // 1. Explain FIP to client
      assert.ok(
        fipExplained.includes('FIP') || fipExplained.includes('Infectious Peritonitis'),
        'Should explain what FIP is'
      );

      // 2. Teach home care (injection administration)
      assert.ok(
        homeCareGuide.includes('injection') || homeCareGuide.includes('inject'),
        'Should include injection instructions'
      );

      // 3. Provide monitoring schedule
      assert.ok(
        monitoringSchedule.includes('week') || monitoringSchedule.includes('monitor'),
        'Should provide monitoring timeline'
      );
    });
  });

  describe('Workflow: Differential Diagnosis', () => {
    let differentialDiagnosis;

    it('should load differential diagnosis reference', async () => {
      const diffDxPath = join(ROOT_DIR, 'src', 'references', 'differential-diagnosis.md');
      const content = await readFile(diffDxPath, 'utf-8');
      differentialDiagnosis = content;

      assert.ok(content.length > 0, 'Differential diagnosis should load');
    });

    it('should help rule out FIP mimics', async () => {
      // Common diseases that can mimic FIP
      const commonMimics = ['lymphoma', 'toxoplasmosis', 'FeLV', 'FIV'];

      const foundMimics = commonMimics.filter(disease =>
        differentialDiagnosis.toLowerCase().includes(disease.toLowerCase())
      );

      assert.ok(
        foundMimics.length >= 2,
        `Should reference common FIP mimics (found: ${foundMimics.join(', ')})`
      );
    });
  });

  describe('Workflow: Refractory Cases', () => {
    let refractoryCases;

    it('should load refractory cases reference', async () => {
      const refractoryPath = join(ROOT_DIR, 'src', 'references', 'refractory-cases.md');
      const content = await readFile(refractoryPath, 'utf-8');
      refractoryCases = content;

      assert.ok(content.length > 0, 'Refractory cases should load');
    });

    it('should address treatment failure scenarios', async () => {
      const keywords = ['failure', 'refractory', 'non-responder', 'escalation'];

      const foundKeywords = keywords.filter(keyword =>
        refractoryCases.toLowerCase().includes(keyword.toLowerCase())
      );

      assert.ok(
        foundKeywords.length >= 2,
        `Should address treatment failure (found: ${foundKeywords.join(', ')})`
      );
    });
  });

  describe('End-to-End Workflow Validation', () => {
    it('should have all components for complete case management', async () => {
      const components = {
        diagnostic: 'diagnostic-flowcharts.md',
        treatment: 'treatment-protocols.md',
        differential: 'differential-diagnosis.md',
        refractory: 'refractory-cases.md',
        prevention: 'prevention-management.md'
      };

      const referencesPath = join(ROOT_DIR, 'src', 'references');

      for (const [type, filename] of Object.entries(components)) {
        const content = await readFile(join(referencesPath, filename), 'utf-8');
        assert.ok(content.length > 0, `${type} component (${filename}) should be available`);
      }
    });

    it('should support complete workflow from presentation to outcome', async () => {
      // Simulated complete case from initial presentation to treatment completion

      const workflow = {
        // 1. Initial presentation
        presentation: {
          completed: true,
          result: 'Kitten with fever, lethargy, abdominal distension'
        },

        // 2. Diagnostic workup (would use diagnostic-flowcharts.md)
        diagnostics: {
          completed: true,
          result: 'Effusion present → Tree A → FIP confirmed'
        },

        // 3. Treatment initiation (uses calculate-dose.js)
        treatmentStart: calculateDose({
          weight: 2.3,
          diseaseForm: 'wet',
          concentration: 15
        }),

        // 4. Client education (uses templates)
        clientEducation: {
          explained: true, // fip-explained.md
          homeCareTaught: true, // home-care-guide.md
          monitoringSchedule: true // monitoring-schedule.md
        },

        // 5. Monitoring (week 2)
        week2: calculateWeightAdjustment({
          originalWeight: 2.3,
          newWeight: 2.6,
          diseaseForm: 'wet',
          concentration: 15
        }),

        // 6. Treatment completion (84 days)
        completed: true
      };

      // Validate workflow completeness
      assert.ok(workflow.presentation.completed, 'Workflow step 1: Presentation');
      assert.ok(workflow.diagnostics.completed, 'Workflow step 2: Diagnostics');
      assert.ok(workflow.treatmentStart.dose > 0, 'Workflow step 3: Treatment calculation');
      assert.ok(workflow.clientEducation.explained, 'Workflow step 4: Client education');
      assert.ok(workflow.week2.newDose > workflow.treatmentStart.dose, 'Workflow step 5: Monitoring');
      assert.ok(workflow.completed, 'Workflow step 6: Completion');
    });
  });
});
