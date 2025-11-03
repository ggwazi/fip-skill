#!/usr/bin/env node

/**
 * Build Script for FIP Veterinary Advisor Skill
 *
 * This script prepares the skill for packaging by:
 * 1. Validating source files
 * 2. Creating dist directory
 * 3. Copying necessary files
 * 4. Verifying structure
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

/**
 * Console colors for better output
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

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

/**
 * Check if a file exists
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
 * Copy directory recursively
 */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

/**
 * Validate required files exist
 */
async function validateSources() {
  info('Validating source files...');

  const requiredFiles = [
    'src/SKILL.md',
    'src/references/diagnostic-flowcharts.md',
    'src/references/treatment-protocols.md',
    'src/references/differential-diagnosis.md',
    'src/references/prevention-management.md'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(rootDir, file);
    if (!(await fileExists(filePath))) {
      error(`Required file missing: ${file}`);
      process.exit(1);
    }
  }

  success('All required files present');
}

/**
 * Clean and create dist directory
 */
async function prepareDist() {
  info('Preparing dist directory...');

  // Remove existing dist if it exists
  if (await fileExists(distDir)) {
    await fs.rm(distDir, { recursive: true });
  }

  // Create fresh dist directory
  await fs.mkdir(distDir, { recursive: true });

  success('Dist directory ready');
}

/**
 * Copy source files to dist
 */
async function copySourceFiles() {
  info('Copying source files...');

  // Copy SKILL.md
  await fs.copyFile(
    path.join(srcDir, 'SKILL.md'),
    path.join(distDir, 'SKILL.md')
  );

  // Copy references directory
  await copyDir(
    path.join(srcDir, 'references'),
    path.join(distDir, 'references')
  );

  // Copy scripts directory if it has content
  const scriptsDir = path.join(srcDir, 'scripts');
  if (await fileExists(scriptsDir)) {
    const scripts = await fs.readdir(scriptsDir);
    if (scripts.length > 1 || (scripts.length === 1 && scripts[0] !== '.gitkeep')) {
      await copyDir(scriptsDir, path.join(distDir, 'scripts'));
    }
  }

  // Copy assets directory if it has content
  const assetsDir = path.join(srcDir, 'assets');
  if (await fileExists(assetsDir)) {
    const hasContent = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === '.gitkeep') continue;
        if (entry.isFile()) return true;
        if (entry.isDirectory()) {
          const fullPath = path.join(dir, entry.name);
          if (await hasContent(fullPath)) return true;
        }
      }
      return false;
    };

    if (await hasContent(assetsDir)) {
      await copyDir(assetsDir, path.join(distDir, 'assets'));
    }
  }

  success('Source files copied');
}

/**
 * Generate build metadata
 */
async function generateMetadata() {
  info('Generating build metadata...');

  const packageJson = JSON.parse(
    await fs.readFile(path.join(rootDir, 'package.json'), 'utf-8')
  );

  const metadata = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    buildDate: new Date().toISOString(),
    node: process.version
  };

  await fs.writeFile(
    path.join(distDir, '.build-info.json'),
    JSON.stringify(metadata, null, 2)
  );

  success(`Build metadata generated (v${metadata.version})`);
}

/**
 * Verify build output
 */
async function verifyBuild() {
  info('Verifying build output...');

  const requiredInDist = [
    'SKILL.md',
    'references/diagnostic-flowcharts.md',
    'references/treatment-protocols.md',
    'references/differential-diagnosis.md',
    'references/prevention-management.md'
  ];

  for (const file of requiredInDist) {
    const filePath = path.join(distDir, file);
    if (!(await fileExists(filePath))) {
      error(`Build output missing: ${file}`);
      process.exit(1);
    }
  }

  // Get build stats
  const stats = {
    files: 0,
    size: 0
  };

  async function countFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await countFiles(fullPath);
      } else {
        stats.files++;
        const fileStats = await fs.stat(fullPath);
        stats.size += fileStats.size;
      }
    }
  }

  await countFiles(distDir);

  success(`Build verified: ${stats.files} files, ${(stats.size / 1024).toFixed(2)} KB`);
}

/**
 * Main build process
 */
async function build() {
  log('\n🚀 Building FIP Veterinary Advisor Skill\n', 'blue');

  try {
    await validateSources();
    await prepareDist();
    await copySourceFiles();
    await generateMetadata();
    await verifyBuild();

    log('\n✨ Build completed successfully!\n', 'green');
    info(`Build output: ${path.relative(process.cwd(), distDir)}`);
  } catch (err) {
    error(`\nBuild failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run build
build();
