#!/usr/bin/env node

/**
 * Version Management Script
 *
 * Handles version-related operations:
 * - Display current version
 * - Bump version (major, minor, patch)
 * - Update version in package.json
 *
 * Usage:
 *   node scripts/version.js                 # Display current version
 *   node scripts/version.js patch           # Bump patch version
 *   node scripts/version.js minor           # Bump minor version
 *   node scripts/version.js major           # Bump major version
 *   node scripts/version.js set 1.2.3       # Set specific version
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { log, error, success, info } from './utils/logger.js';
import { readJSON, writeJSON } from './utils/fs-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

/**
 * Parse semantic version string
 * @param {string} version - Version string (e.g., "1.2.3")
 * @returns {{major: number, minor: number, patch: number}} Parsed version
 */
function parseVersion(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
  };
}

/**
 * Format version object to string
 * @param {{major: number, minor: number, patch: number}} version - Version object
 * @returns {string} Formatted version string
 */
function formatVersion(version) {
  return `${version.major}.${version.minor}.${version.patch}`;
}

/**
 * Get current version from package.json
 * @returns {Promise<string>} Current version
 */
async function getCurrentVersion() {
  const packageJson = await readJSON(path.join(rootDir, 'package.json'));
  return packageJson.version;
}

/**
 * Update version in package.json
 * @param {string} newVersion - New version string
 */
async function updateVersion(newVersion) {
  const packagePath = path.join(rootDir, 'package.json');
  const packageJson = await readJSON(packagePath);
  
  const oldVersion = packageJson.version;
  packageJson.version = newVersion;
  
  await writeJSON(packagePath, packageJson);
  
  success(`Version updated: ${oldVersion} → ${newVersion}`);
  info(`Updated: ${path.relative(process.cwd(), packagePath)}`);
}

/**
 * Bump version by type
 * @param {string} bumpType - Type of bump: 'major', 'minor', or 'patch'
 * @returns {Promise<string>} New version
 */
async function bumpVersion(bumpType) {
  const currentVersion = await getCurrentVersion();
  const parsed = parseVersion(currentVersion);
  
  switch (bumpType) {
    case 'major':
      parsed.major++;
      parsed.minor = 0;
      parsed.patch = 0;
      break;
    case 'minor':
      parsed.minor++;
      parsed.patch = 0;
      break;
    case 'patch':
      parsed.patch++;
      break;
    default:
      throw new Error(`Invalid bump type: ${bumpType}. Use 'major', 'minor', or 'patch'.`);
  }
  
  return formatVersion(parsed);
}

/**
 * Display current version
 */
async function displayVersion() {
  const version = await getCurrentVersion();
  log(`\nCurrent version: ${version}\n`, 'cyan');
}

/**
 * Main version management function
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    if (!command) {
      // No arguments - display current version
      await displayVersion();
      return;
    }
    
    log('\n📝 Version Management\n', 'blue');
    
    switch (command) {
      case 'major':
      case 'minor':
      case 'patch': {
        info(`Bumping ${command} version...`);
        const newVersion = await bumpVersion(command);
        await updateVersion(newVersion);
        log('\n✨ Version bump completed!\n', 'green');
        break;
      }
      
      case 'set': {
        const newVersion = args[1];
        if (!newVersion) {
          error('Please specify a version to set (e.g., npm run version set 1.2.3)');
          process.exit(1);
        }
        
        // Validate version format
        parseVersion(newVersion);
        
        info(`Setting version to ${newVersion}...`);
        await updateVersion(newVersion);
        log('\n✨ Version set successfully!\n', 'green');
        break;
      }
      
      case 'current':
      case 'show': {
        await displayVersion();
        break;
      }
      
      default:
        error(`Unknown command: ${command}`);
        log('\nUsage:', 'yellow');
        log('  node scripts/version.js              # Display current version');
        log('  node scripts/version.js patch        # Bump patch version');
        log('  node scripts/version.js minor        # Bump minor version');
        log('  node scripts/version.js major        # Bump major version');
        log('  node scripts/version.js set 1.2.3    # Set specific version\n');
        process.exit(1);
    }
    
  } catch (err) {
    error(`\nVersion management failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
}

// Run if called directly
main();
