/**
 * File System Helper Utilities
 *
 * Common file system operations used across build scripts
 * @module scripts/utils/fs-helpers
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Check if a file or directory exists
 * @param {string} filePath - Path to check
 * @returns {Promise<boolean>} True if exists, false otherwise
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Copy a directory recursively
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 * @returns {Promise<void>}
 */
export async function copyDir(src, dest) {
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
 * Check if a directory has any content (excluding .gitkeep)
 * @param {string} dir - Directory to check
 * @returns {Promise<boolean>} True if directory has content
 */
export async function hasContent(dir) {
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
}

/**
 * Count files recursively in a directory
 * @param {string} dir - Directory to count
 * @returns {Promise<{files: number, size: number}>} File count and total size
 */
export async function countFiles(dir) {
  const stats = {
    files: 0,
    size: 0
  };

  async function count(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await count(fullPath);
      } else {
        stats.files++;
        const fileStats = await fs.stat(fullPath);
        stats.size += fileStats.size;
      }
    }
  }

  await count(dir);
  return stats;
}

/**
 * Read JSON file
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<any>} Parsed JSON content
 */
export async function readJSON(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Write JSON file with formatting
 * @param {string} filePath - Path to write
 * @param {any} data - Data to write
 * @param {number} spaces - Indentation spaces (default: 2)
 * @returns {Promise<void>}
 */
export async function writeJSON(filePath, data, spaces = 2) {
  const content = JSON.stringify(data, null, spaces);
  await fs.writeFile(filePath, content);
}

export default {
  fileExists,
  copyDir,
  hasContent,
  countFiles,
  readJSON,
  writeJSON
};
