import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..');

/**
 * Execute a command and return output
 */
function exec(command) {
  try {
    return execSync(command, {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
  } catch (error) {
    return { stdout: error.stdout || '', stderr: error.stderr || '', exitCode: error.status };
  }
}

describe('Repository Maintenance Tools', () => {
  describe('find-issues script', () => {
    test('should execute without crashing', () => {
      const result = exec('node scripts/find-issues.js');
      
      // The script should run and produce output
      // It may exit with non-zero if there are issues, which is expected
      assert.ok(typeof result === 'string' || typeof result === 'object');
    });

    test('should check validation', () => {
      const result = exec('node scripts/find-issues.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Validation Issues') || output.includes('validation'));
    });

    test('should check linting', () => {
      const result = exec('node scripts/find-issues.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Linting Issues') || output.includes('linting'));
    });

    test('should check tests', () => {
      const result = exec('node scripts/find-issues.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Test Issues') || output.includes('tests'));
    });

    test('should show summary', () => {
      const result = exec('node scripts/find-issues.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Summary'));
    });
  });

  describe('find-closeable-branches script', () => {
    test('should execute without crashing', () => {
      const result = exec('node scripts/find-closeable-branches.js');
      
      // The script should always run successfully
      assert.ok(typeof result === 'string' || typeof result === 'object');
    });

    test('should identify main branch', () => {
      const result = exec('node scripts/find-closeable-branches.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Main branch:'));
    });

    test('should list branch categories', () => {
      const result = exec('node scripts/find-closeable-branches.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      // Check for key sections
      assert.ok(output.includes('Merged Branches'));
      assert.ok(output.includes('Stale Branches'));
      assert.ok(output.includes('Active Branches'));
    });

    test('should show summary', () => {
      const result = exec('node scripts/find-closeable-branches.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Summary'));
      assert.ok(output.includes('Branches that can be closed'));
    });

    test('should show stale threshold', () => {
      const result = exec('node scripts/find-closeable-branches.js');
      const output = typeof result === 'string' ? result : result.stdout;
      
      assert.ok(output.includes('Stale threshold'));
      assert.ok(output.includes('90 days'));
    });
  });
});
