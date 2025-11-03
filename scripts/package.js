#!/usr/bin/env node

/**
 * Package Script for FIP Veterinary Advisor Skill
 *
 * Creates a .skill package file (ZIP archive) from the dist directory
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import archiver from 'archiver';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

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

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

/**
 * Check if dist directory exists
 */
async function checkDist() {
  try {
    await fs.access(distDir);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get package version from package.json
 */
async function getVersion() {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(rootDir, 'package.json'), 'utf-8')
  );
  return packageJson.version;
}

/**
 * Create ZIP archive of dist directory
 */
async function createArchive(outputPath) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => {
      resolve(archive.pointer());
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add all files from dist directory
    archive.directory(distDir, false);

    archive.finalize();
  });
}

/**
 * Calculate file checksum
 */
async function calculateChecksum(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

/**
 * Generate checksum file
 */
async function generateChecksums(skillPath) {
  info('Generating checksums...');

  const sha256 = await calculateChecksum(skillPath);
  const checksumContent = `SHA256: ${sha256}\nFile: ${path.basename(skillPath)}\n`;

  const checksumPath = skillPath.replace('.skill', '.sha256');
  await fs.writeFile(checksumPath, checksumContent);

  success(`Checksum file created: ${path.basename(checksumPath)}`);
}

/**
 * Main packaging process
 */
async function packageSkill() {
  log('\n📦 Packaging FIP Veterinary Advisor Skill\n', 'blue');

  try {
    // Check if dist exists
    if (!(await checkDist())) {
      error('Dist directory not found. Run "npm run build" first.');
      process.exit(1);
    }

    // Get version
    const version = await getVersion();
    info(`Packaging version ${version}`);

    // Create package filename
    const filename = `fip-veterinary-advisor-v${version}.skill`;
    const outputPath = path.join(distDir, filename);

    // Create archive
    info('Creating archive...');
    const size = await createArchive(outputPath);
    success(`Package created: ${filename} (${(size / 1024).toFixed(2)} KB)`);

    // Generate checksums
    await generateChecksums(outputPath);

    // Move to root for easy access
    const finalPath = path.join(rootDir, filename);
    await fs.copyFile(outputPath, finalPath);
    info(`Package copied to: ${filename}`);

    log('\n✨ Packaging completed successfully!\n', 'green');
    log(`📄 Package: ${filename}`, 'cyan');
    log(`📊 Size: ${(size / 1024).toFixed(2)} KB`, 'cyan');
    log(`🔒 Checksum: ${path.basename(outputPath).replace('.skill', '.sha256')}`, 'cyan');

  } catch (err) {
    error(`\nPackaging failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run packaging
packageSkill();
