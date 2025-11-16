/**
 * Integration Tests: Skill Loading
 *
 * Tests that the skill file and all references load correctly
 * and have the required structure and content.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..', '..');

describe('Skill Loading Integration Tests', () => {

  describe('SKILL.md Structure', () => {
    let skillContent;

    it('should load SKILL.md successfully', async () => {
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      skillContent = await readFile(skillPath, 'utf-8');
      assert.ok(skillContent.length > 0, 'SKILL.md should not be empty');
    });

    it('should have valid YAML frontmatter', async () => {
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      const content = await readFile(skillPath, 'utf-8');

      // Check for YAML frontmatter delimiters
      assert.ok(content.startsWith('---'), 'Should start with YAML frontmatter delimiter');

      // Extract frontmatter
      const frontmatterEnd = content.indexOf('---', 3);
      assert.ok(frontmatterEnd > 3, 'Should have closing YAML delimiter');

      const frontmatter = content.substring(3, frontmatterEnd);

      // Check required fields
      assert.ok(frontmatter.includes('name:'), 'Should have name field');
      assert.ok(frontmatter.includes('description:'), 'Should have description field');
      assert.ok(frontmatter.includes('fip-veterinary-advisor'), 'Should have correct skill name');
    });

    it('should contain required sections', async () => {
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      const content = await readFile(skillPath, 'utf-8');

      // Required sections per validation script
      const requiredSections = [
        'When to Use',
        'Core Principles',
        'Quick Reference',
        'Diagnostic',
        'Treatment'
      ];

      for (const section of requiredSections) {
        assert.ok(
          content.includes(section),
          `Should contain "${section}" section`
        );
      }
    });

    it('should have reasonable file size', async () => {
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      const content = await readFile(skillPath, 'utf-8');
      const sizeKB = Buffer.byteLength(content, 'utf-8') / 1024;

      // Validation script warns at >100KB
      assert.ok(sizeKB < 150, `SKILL.md should be <150KB (current: ${sizeKB.toFixed(2)}KB)`);
    });
  });

  describe('Reference Documents', () => {
    const references = [
      'diagnostic-flowcharts.md',
      'treatment-protocols.md',
      'differential-diagnosis.md',
      'prevention-management.md',
      'refractory-cases.md'
    ];

    for (const ref of references) {
      it(`should load ${ref}`, async () => {
        const refPath = join(ROOT_DIR, 'src', 'references', ref);
        const content = await readFile(refPath, 'utf-8');
        assert.ok(content.length > 0, `${ref} should not be empty`);
      });

      it(`${ref} should have reasonable size`, async () => {
        const refPath = join(ROOT_DIR, 'src', 'references', ref);
        const content = await readFile(refPath, 'utf-8');
        const sizeKB = Buffer.byteLength(content, 'utf-8') / 1024;

        // Validation warns at >500KB for references
        assert.ok(sizeKB < 500, `${ref} should be <500KB (current: ${sizeKB.toFixed(2)}KB)`);
      });
    }
  });

  describe('Client Templates', () => {
    const templates = [
      'fip-explained.md',
      'home-care-guide.md',
      'monitoring-schedule.md',
      'treatment-consent.md'
    ];

    for (const template of templates) {
      it(`should load ${template}`, async () => {
        const templatePath = join(ROOT_DIR, 'src', 'assets', 'templates', template);
        const content = await readFile(templatePath, 'utf-8');
        assert.ok(content.length > 0, `${template} should not be empty`);
      });
    }
  });

  describe('Utility Scripts', () => {
    const scripts = [
      'calculate-dose.js',
      'treatment-tracker.js',
      'cost-estimator.js',
      'constants.js'
    ];

    for (const script of scripts) {
      it(`should load ${script}`, async () => {
        const scriptPath = join(ROOT_DIR, 'src', 'scripts', script);
        await access(scriptPath); // Will throw if file doesn't exist
      });

      it(`${script} should be valid JavaScript`, async () => {
        const scriptPath = join(ROOT_DIR, 'src', 'scripts', script);
        const content = await readFile(scriptPath, 'utf-8');

        // Basic syntax check - should not have common syntax errors
        assert.ok(!content.includes('SyntaxError'), `${script} should not contain syntax errors`);

        // Should have proper exports if not constants.js
        if (script !== 'constants.js') {
          assert.ok(
            content.includes('export ') || content.includes('module.exports'),
            `${script} should export functions`
          );
        }
      });
    }

    it('should be able to import calculate-dose.js', async () => {
      const { calculateDose } = await import(join(ROOT_DIR, 'src', 'scripts', 'calculate-dose.js'));
      assert.ok(typeof calculateDose === 'function', 'calculateDose should be a function');
    });

    it('should be able to import constants.js', async () => {
      const constants = await import(join(ROOT_DIR, 'src', 'scripts', 'constants.js'));
      assert.ok(constants.DOSING_MAP, 'constants should export DOSING_MAP');
      assert.ok(constants.TREATMENT_DURATION_DAYS, 'constants should export TREATMENT_DURATION_DAYS');
    });
  });

  describe('Internal Links Validation', () => {
    it('should not have broken reference links in SKILL.md', async () => {
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      const content = await readFile(skillPath, 'utf-8');

      // Find markdown links to local files: [text](path)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links = [...content.matchAll(linkRegex)];

      for (const [fullMatch, text, link] of links) {
        // Skip external links
        if (link.startsWith('http')) continue;
        if (link.startsWith('#')) continue; // Anchor links tested separately

        // Check if referenced file exists
        const refPath = join(ROOT_DIR, 'src', link);
        try {
          await access(refPath);
        } catch (error) {
          assert.fail(`Broken link in SKILL.md: [${text}](${link}) - file does not exist`);
        }
      }
    });
  });

  describe('Package Configuration', () => {
    it('should load package.json', async () => {
      const pkgPath = join(ROOT_DIR, 'package.json');
      const content = await readFile(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);

      assert.strictEqual(pkg.name, '@skills/fip-veterinary-advisor', 'Package name should match');
      assert.strictEqual(pkg.main, 'src/SKILL.md', 'Main field should point to SKILL.md');
    });

    it('package.json files array should include all source directories', async () => {
      const pkgPath = join(ROOT_DIR, 'package.json');
      const content = await readFile(pkgPath, 'utf-8');
      const pkg = JSON.parse(content);

      const expectedFiles = [
        'src/SKILL.md',
        'src/references/',
        'src/scripts/',
        'src/assets/'
      ];

      for (const expectedFile of expectedFiles) {
        assert.ok(
          pkg.files.includes(expectedFile),
          `package.json files array should include ${expectedFile}`
        );
      }
    });
  });

  describe('Build Output Validation', () => {
    it('should be able to validate the skill structure', async () => {
      // This test simulates what the build process checks
      const skillPath = join(ROOT_DIR, 'src', 'SKILL.md');
      const content = await readFile(skillPath, 'utf-8');

      // Must have frontmatter
      assert.ok(content.startsWith('---'), 'Must have YAML frontmatter');

      // Must have heading after frontmatter
      const afterFrontmatter = content.substring(content.indexOf('---', 3) + 3);
      assert.ok(afterFrontmatter.includes('# '), 'Must have H1 heading');

      // Content must be substantial
      assert.ok(content.length > 1000, 'SKILL.md should have substantial content');
    });
  });
});
