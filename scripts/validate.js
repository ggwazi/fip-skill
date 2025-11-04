#!/usr/bin/env node

/**
 * Validation Script for FIP Veterinary Advisor Skill
 *
 * Validates:
 * 1. SKILL.md structure and frontmatter
 * 2. Reference documents exist and have required sections
 * 3. No broken internal links
 * 4. File sizes are reasonable
 * 5. Required sections present
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

/**
 * Console colors
 */
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

let validationErrors = 0;
let validationWarnings = 0;

/**
 * Check if file exists
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate YAML frontmatter in SKILL.md
 */
async function validateFrontmatter() {
  info('Validating SKILL.md frontmatter...');

  const skillPath = path.join(srcDir, 'SKILL.md');
  const content = await fs.readFile(skillPath, 'utf-8');

  // Check for frontmatter
  if (!content.startsWith('---')) {
    error('SKILL.md missing YAML frontmatter');
    validationErrors++;
    return;
  }

  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) {
    error('SKILL.md frontmatter not properly closed');
    validationErrors++;
    return;
  }

  const frontmatter = content.substring(3, frontmatterEnd);

  // Check required fields
  const requiredFields = ['name', 'description'];
  for (const field of requiredFields) {
    if (!frontmatter.includes(`${field}:`)) {
      error(`SKILL.md frontmatter missing required field: ${field}`);
      validationErrors++;
    }
  }

  success('SKILL.md frontmatter valid');
}

/**
 * Validate required sections in SKILL.md
 */
async function validateSkillSections() {
  info('Validating SKILL.md sections...');

  const skillPath = path.join(srcDir, 'SKILL.md');
  const content = await fs.readFile(skillPath, 'utf-8');

  const requiredSections = [
    'When to Use',
    'Workflow',
    'Quick Reference',
    'Diagnostic',
    'Treatment'
  ];

  for (const section of requiredSections) {
    if (!content.toLowerCase().includes(section.toLowerCase())) {
      warning(`SKILL.md may be missing section: ${section}`);
      validationWarnings++;
    }
  }

  success('SKILL.md sections validated');
}

/**
 * Validate reference documents exist
 */
async function validateReferences() {
  info('Validating reference documents...');

  const requiredRefs = [
    'diagnostic-flowcharts.md',
    'treatment-protocols.md',
    'differential-diagnosis.md',
    'prevention-management.md'
  ];

  const refsDir = path.join(srcDir, 'references');

  for (const ref of requiredRefs) {
    const refPath = path.join(refsDir, ref);
    if (!(await fileExists(refPath))) {
      error(`Missing reference document: ${ref}`);
      validationErrors++;
    } else {
      // Check file size
      const stats = await fs.stat(refPath);
      if (stats.size < 1000) {
        warning(`Reference document seems too small: ${ref} (${stats.size} bytes)`);
        validationWarnings++;
      } else if (stats.size > 500000) {
        warning(`Reference document very large: ${ref} (${(stats.size / 1024).toFixed(2)} KB)`);
        validationWarnings++;
      }
    }
  }

  success('Reference documents validated');
}

/**
 * Convert a markdown heading to an anchor ID
 * Follows GitHub's anchor generation rules
 */
function headingToAnchor(heading) {
  return heading
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

/**
 * Extract all heading anchors from a markdown file
 */
async function extractAnchors(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const anchors = new Set();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const headingText = match[1];
    const anchor = headingToAnchor(headingText);
    anchors.add(anchor);
  }

  return anchors;
}

/**
 * Check for broken internal links
 */
async function validateLinks() {
  info('Checking for broken internal links...');

  const skillPath = path.join(srcDir, 'SKILL.md');
  const content = await fs.readFile(skillPath, 'utf-8');

  // Find all markdown links [text](path)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let brokenLinks = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    const linkPath = match[2];

    // Skip external links and standalone anchors
    if (linkPath.startsWith('http') || linkPath.startsWith('#')) {
      continue;
    }

    // Split path and anchor
    const [filePath, anchor] = linkPath.split('#');

    // Check if file exists
    const fullPath = path.join(srcDir, filePath);
    if (!(await fileExists(fullPath))) {
      error(`Broken link in SKILL.md: ${linkPath} (file not found)`);
      brokenLinks++;
      validationErrors++;
      continue;
    }

    // If link has an anchor, verify it exists in the target file
    if (anchor) {
      const anchors = await extractAnchors(fullPath);
      if (!anchors.has(anchor)) {
        error(`Broken link in SKILL.md: ${linkPath} (anchor not found)`);
        brokenLinks++;
        validationErrors++;
      }
    }
  }

  if (brokenLinks === 0) {
    success('No broken internal links found');
  }
}

/**
 * Validate file sizes
 */
async function validateFileSizes() {
  info('Validating file sizes...');

  const skillPath = path.join(srcDir, 'SKILL.md');
  const stats = await fs.stat(skillPath);
  const skillSizeKB = stats.size / 1024;

  if (skillSizeKB > 100) {
    warning(`SKILL.md is large: ${skillSizeKB.toFixed(2)} KB. Consider moving content to references.`);
    validationWarnings++;
  }

  success('File sizes validated');
}

/**
 * Check for common content issues
 */
async function validateContent() {
  info('Validating content quality...');

  const skillPath = path.join(srcDir, 'SKILL.md');
  const content = await fs.readFile(skillPath, 'utf-8');

  // Check for TODO markers
  if (content.includes('TODO') || content.includes('FIXME')) {
    warning('SKILL.md contains TODO/FIXME markers');
    validationWarnings++;
  }

  // Check for placeholder text
  if (content.includes('Lorem ipsum') || content.includes('placeholder')) {
    error('SKILL.md contains placeholder text');
    validationErrors++;
  }

  // Check for reasonable content length
  const lines = content.split('\n').length;
  if (lines < 100) {
    warning(`SKILL.md seems short: ${lines} lines`);
    validationWarnings++;
  }

  success('Content quality validated');
}

/**
 * Validate package.json
 */
async function validatePackageJson() {
  info('Validating package.json...');

  const packagePath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf-8'));

  // Check required fields
  const requiredFields = ['name', 'version', 'description', 'scripts'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      error(`package.json missing required field: ${field}`);
      validationErrors++;
    }
  }

  // Check required scripts
  const requiredScripts = ['build', 'package', 'validate', 'test'];
  for (const script of requiredScripts) {
    if (!packageJson.scripts || !packageJson.scripts[script]) {
      error(`package.json missing required script: ${script}`);
      validationErrors++;
    }
  }

  success('package.json validated');
}

/**
 * Main validation process
 */
async function validate() {
  log('\n🔍 Validating FIP Veterinary Advisor Skill\n', 'blue');

  try {
    await validatePackageJson();
    await validateFrontmatter();
    await validateSkillSections();
    await validateReferences();
    await validateLinks();
    await validateFileSizes();
    await validateContent();

    log('\n' + '='.repeat(50), 'cyan');

    if (validationErrors > 0) {
      log(`\n❌ Validation failed with ${validationErrors} error(s) and ${validationWarnings} warning(s)\n`, 'red');
      process.exit(1);
    } else if (validationWarnings > 0) {
      log(`\n✅ Validation passed with ${validationWarnings} warning(s)\n`, 'yellow');
    } else {
      log('\n✨ Validation passed with no issues!\n', 'green');
    }

  } catch (err) {
    error(`\nValidation error: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run validation
validate();
