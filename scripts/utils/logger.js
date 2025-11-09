/**
 * Console Logging Utilities
 *
 * Provides consistent logging functions across all build scripts
 * @module scripts/utils/logger
 */

import { colors } from './colors.js';

/**
 * Log a message with optional color
 * @param {string} message - Message to log
 * @param {string} color - Color name from colors object
 */
export function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

/**
 * Log an error message (red)
 * @param {string} message - Error message
 */
export function error(message) {
  log(`❌ ${message}`, 'red');
}

/**
 * Log a success message (green)
 * @param {string} message - Success message
 */
export function success(message) {
  log(`✅ ${message}`, 'green');
}

/**
 * Log a warning message (yellow)
 * @param {string} message - Warning message
 */
export function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

/**
 * Log an info message (cyan)
 * @param {string} message - Info message
 */
export function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

/**
 * Print a section header
 * @param {string} text - Header text
 * @param {string} color - Color name (default: 'blue')
 */
export function header(text, color = 'blue') {
  log(`\n${text}\n`, color);
}

/**
 * Print a divider line
 * @param {number} length - Length of divider (default: 50)
 * @param {string} color - Color name (default: 'cyan')
 */
export function divider(length = 50, color = 'cyan') {
  log('='.repeat(length), color);
}

export default {
  log,
  error,
  success,
  warning,
  info,
  header,
  divider
};
