#!/usr/bin/env node

/**
 * Find Issues Since Last Merge
 * 
 * This script identifies issues, errors, and problems that have appeared
 * since the last merge commit. It compares:
 * - Validation results
 * - Test results
 * - Build errors
 * - Lint warnings
 * 
 * Usage: npm run find-issues
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Execute a command and return output
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
  } catch (error) {
    if (options.ignoreError) {
      return error.stdout || '';
    }
    throw error;
  }
}

/**
 * Print section header
 */
function printHeader(text) {
  console.log(`\n${colors.bright}${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}${text}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

/**
 * Print subsection
 */
function printSubsection(text) {
  console.log(`\n${colors.bright}${colors.blue}${text}${colors.reset}`);
  console.log(`${colors.blue}${'-'.repeat(40)}${colors.reset}`);
}

/**
 * Find the last merge commit
 */
function findLastMerge() {
  try {
    const mergeCommit = exec('git log --merges --pretty=format:"%H" -1', { silent: true }).trim();
    if (!mergeCommit) {
      console.log(`${colors.yellow}⚠️  No merge commits found. Using first commit instead.${colors.reset}`);
      const firstCommit = exec('git rev-list --max-parents=0 HEAD', { silent: true }).trim();
      return firstCommit;
    }
    
    const commitInfo = exec(`git log --pretty=format:"%h - %s (%cr)" -1 ${mergeCommit}`, { silent: true }).trim();
    console.log(`${colors.green}✓ Last merge: ${commitInfo}${colors.reset}`);
    return mergeCommit;
  } catch (error) {
    console.error(`${colors.red}✗ Error finding last merge: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

/**
 * Check validation results
 */
function checkValidation() {
  printSubsection('📋 Validation Issues');
  
  try {
    exec('node scripts/validate.js', { silent: false });
    console.log(`${colors.green}✓ No validation issues found${colors.reset}`);
    return [];
  } catch (error) {
    // Validation failed, parse the output to extract issues
    const output = error.stdout || error.stderr || '';
    const issues = [];
    
    // Extract broken links
    const brokenLinkMatches = output.matchAll(/❌ Broken link in (.+?): (.+)/g);
    for (const match of brokenLinkMatches) {
      issues.push({
        type: 'broken_link',
        file: match[1],
        link: match[2],
        severity: 'error',
      });
    }
    
    // Extract other errors
    const errorMatches = output.matchAll(/❌ (.+)/g);
    for (const match of errorMatches) {
      if (!match[1].includes('Broken link')) {
        issues.push({
          type: 'validation_error',
          message: match[1],
          severity: 'error',
        });
      }
    }
    
    return issues;
  }
}

/**
 * Check linting issues
 */
function checkLinting() {
  printSubsection('🔍 Linting Issues');
  
  try {
    exec('npm run lint', { silent: false });
    console.log(`${colors.green}✓ No linting issues found${colors.reset}`);
    return [];
  } catch (error) {
    const output = error.stdout || error.stderr || '';
    const issues = [];
    
    // Parse markdown linting errors
    const lines = output.split('\n');
    for (const line of lines) {
      const match = line.match(/(.+?):(\d+):(\d+)?\s+(.+?)\s+(.+)/);
      if (match) {
        issues.push({
          type: 'lint',
          file: match[1],
          line: match[2],
          column: match[3] || '',
          rule: match[4],
          message: match[5],
          severity: 'warning',
        });
      }
    }
    
    return issues;
  }
}

/**
 * Check test results
 */
function checkTests() {
  printSubsection('🧪 Test Issues');
  
  try {
    // Run tests without pretest (to avoid re-running validation)
    exec('node --test tests/**/*.test.js', { silent: false });
    console.log(`${colors.green}✓ All tests passing${colors.reset}`);
    return [];
  } catch (error) {
    const output = error.stdout || error.stderr || '';
    const issues = [];
    
    // Parse test failures
    const failureMatches = output.matchAll(/# (Subtest: .+?)[\s\S]*?not ok \d+ - (.+)/g);
    for (const match of failureMatches) {
      issues.push({
        type: 'test_failure',
        test: match[1],
        message: match[2],
        severity: 'error',
      });
    }
    
    return issues;
  }
}

/**
 * Check for uncommitted changes
 */
function checkUncommittedChanges() {
  printSubsection('📝 Uncommitted Changes');
  
  const status = exec('git status --porcelain', { silent: true });
  
  if (!status.trim()) {
    console.log(`${colors.green}✓ No uncommitted changes${colors.reset}`);
    return [];
  }
  
  const issues = [];
  const lines = status.split('\n').filter(l => l.trim());
  
  for (const line of lines) {
    const status = line.substring(0, 2);
    const file = line.substring(3);
    
    issues.push({
      type: 'uncommitted',
      file,
      status: status.trim(),
      severity: 'warning',
    });
  }
  
  return issues;
}

/**
 * Get changed files since last merge
 */
function getChangedFiles(lastMerge) {
  printSubsection('📁 Files Changed Since Last Merge');
  
  try {
    const output = exec(`git diff --name-status ${lastMerge}..HEAD`, { silent: true });
    
    if (!output.trim()) {
      console.log(`${colors.green}✓ No files changed since last merge${colors.reset}`);
      return [];
    }
    
    const changes = [];
    const lines = output.split('\n').filter(l => l.trim());
    
    for (const line of lines) {
      const [status, ...fileParts] = line.split('\t');
      const file = fileParts.join('\t');
      changes.push({ status, file });
      
      const statusSymbol = status === 'A' ? '+' : status === 'D' ? '-' : '~';
      const statusColor = status === 'A' ? colors.green : status === 'D' ? colors.red : colors.yellow;
      console.log(`  ${statusColor}${statusSymbol} ${file}${colors.reset}`);
    }
    
    return changes;
  } catch (error) {
    console.error(`${colors.red}✗ Error getting changed files: ${error.message}${colors.reset}`);
    return [];
  }
}

/**
 * Main function
 */
function main() {
  printHeader('🔍 Finding Issues Since Last Merge');
  
  const lastMerge = findLastMerge();
  const changedFiles = getChangedFiles(lastMerge);
  
  const allIssues = {
    validation: checkValidation(),
    linting: checkLinting(),
    tests: checkTests(),
    uncommitted: checkUncommittedChanges(),
  };
  
  // Summary
  printHeader('📊 Summary');
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const [category, issues] of Object.entries(allIssues)) {
    const errors = issues.filter(i => i.severity === 'error').length;
    const warnings = issues.filter(i => i.severity === 'warning').length;
    
    totalErrors += errors;
    totalWarnings += warnings;
    
    if (issues.length > 0) {
      const icon = errors > 0 ? '❌' : '⚠️';
      console.log(`${icon} ${category}: ${errors} error(s), ${warnings} warning(s)`);
      
      // Show details
      for (const issue of issues.slice(0, 5)) {
        const prefix = issue.severity === 'error' ? colors.red : colors.yellow;
        if (issue.type === 'broken_link') {
          console.log(`  ${prefix}• Broken link in ${issue.file}: ${issue.link}${colors.reset}`);
        } else if (issue.type === 'lint') {
          console.log(`  ${prefix}• ${issue.file}:${issue.line} - ${issue.message}${colors.reset}`);
        } else if (issue.type === 'test_failure') {
          console.log(`  ${prefix}• ${issue.test}: ${issue.message}${colors.reset}`);
        } else if (issue.type === 'uncommitted') {
          console.log(`  ${prefix}• [${issue.status}] ${issue.file}${colors.reset}`);
        } else {
          console.log(`  ${prefix}• ${issue.message || JSON.stringify(issue)}${colors.reset}`);
        }
      }
      
      if (issues.length > 5) {
        console.log(`  ${colors.blue}  ... and ${issues.length - 5} more${colors.reset}`);
      }
    } else {
      console.log(`${colors.green}✓ ${category}: No issues${colors.reset}`);
    }
  }
  
  console.log(`\n${colors.bright}Total: ${totalErrors} error(s), ${totalWarnings} warning(s)${colors.reset}`);
  console.log(`${colors.bright}Files changed since last merge: ${changedFiles.length}${colors.reset}\n`);
  
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
