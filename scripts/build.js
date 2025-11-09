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
import { log, error, success, info } from './utils/logger.js';
import { fileExists, copyDir, hasContent, countFiles, readJSON, writeJSON } from './utils/fs-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

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

  const packageJson = await readJSON(path.join(rootDir, 'package.json'));

  const metadata = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    buildDate: new Date().toISOString(),
    node: process.version
  };

  await writeJSON(path.join(distDir, '.build-info.json'), metadata);

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
  const stats = await countFiles(distDir);

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
