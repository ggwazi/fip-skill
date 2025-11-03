#!/usr/bin/env node

/**
 * Find Closeable Branches
 * 
 * This script identifies Git branches that can potentially be closed/deleted:
 * - Branches that have been merged into main/master
 * - Stale branches (no commits in X days)
 * - Branches with no unique commits
 * 
 * Usage: npm run find-closeable-branches
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Configuration
const STALE_DAYS = 90; // Days after which a branch is considered stale
const DEFAULT_BRANCHES = ['main', 'master', 'develop', 'development'];

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
 * Get the main branch name
 */
function getMainBranch() {
  try {
    // Try to get default branch from remote
    const remoteBranches = exec('git branch -r', { ignoreError: true });
    
    for (const defaultBranch of DEFAULT_BRANCHES) {
      if (remoteBranches.includes(`origin/${defaultBranch}`)) {
        return defaultBranch;
      }
    }
    
    // Fallback to current branch
    const currentBranch = exec('git branch --show-current').trim();
    return currentBranch || 'main';
  } catch (error) {
    return 'main';
  }
}

/**
 * Get all local branches
 */
function getLocalBranches() {
  const output = exec('git branch --format="%(refname:short)"');
  return output.split('\n').filter(b => b.trim()).map(b => b.trim());
}

/**
 * Get all remote branches
 */
function getRemoteBranches() {
  const output = exec('git branch -r --format="%(refname:short)"', { ignoreError: true });
  return output.split('\n')
    .filter(b => b.trim() && !b.includes('HEAD'))
    .map(b => b.trim().replace('origin/', ''));
}

/**
 * Check if a branch is merged into the main branch
 */
function isMerged(branch, mainBranch) {
  try {
    const output = exec(`git branch --merged ${mainBranch} --format="%(refname:short)"`, { ignoreError: true });
    return output.split('\n').some(b => b.trim() === branch);
  } catch (error) {
    return false;
  }
}

/**
 * Get the last commit date for a branch
 */
function getLastCommitDate(branch) {
  try {
    const timestamp = exec(`git log -1 --format=%ct ${branch}`, { ignoreError: true }).trim();
    if (!timestamp) return null;
    return new Date(parseInt(timestamp) * 1000);
  } catch (error) {
    return null;
  }
}

/**
 * Get days since last commit
 */
function getDaysSinceLastCommit(branch) {
  const lastCommit = getLastCommitDate(branch);
  if (!lastCommit) return null;
  
  const now = new Date();
  const diffTime = Math.abs(now - lastCommit);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Get number of unique commits in a branch
 */
function getUniqueCommitCount(branch, mainBranch) {
  try {
    const output = exec(`git rev-list --count ${mainBranch}..${branch}`, { ignoreError: true }).trim();
    return parseInt(output) || 0;
  } catch (error) {
    return 0;
  }
}

/**
 * Get branch info
 */
function getBranchInfo(branch) {
  try {
    const info = exec(`git log -1 --format="%h - %s (%cr) by %an" ${branch}`, { ignoreError: true }).trim();
    return info;
  } catch (error) {
    return 'No commit info available';
  }
}

/**
 * Categorize branches
 */
function categorizeBranches(localBranches, remoteBranches, mainBranch) {
  const categories = {
    merged: [],
    stale: [],
    noUniqueCommits: [],
    active: [],
    remoteOnly: [],
  };
  
  // Check local branches
  for (const branch of localBranches) {
    if (DEFAULT_BRANCHES.includes(branch)) {
      continue; // Skip main branches
    }
    
    const merged = isMerged(branch, mainBranch);
    const daysSinceCommit = getDaysSinceLastCommit(branch);
    const uniqueCommits = getUniqueCommitCount(branch, mainBranch);
    const info = getBranchInfo(branch);
    
    const branchData = {
      name: branch,
      merged,
      daysSinceCommit,
      uniqueCommits,
      info,
    };
    
    if (merged) {
      categories.merged.push(branchData);
    } else if (uniqueCommits === 0) {
      categories.noUniqueCommits.push(branchData);
    } else if (daysSinceCommit && daysSinceCommit > STALE_DAYS) {
      categories.stale.push(branchData);
    } else {
      categories.active.push(branchData);
    }
  }
  
  // Check remote-only branches
  for (const remoteBranch of remoteBranches) {
    if (DEFAULT_BRANCHES.includes(remoteBranch) || localBranches.includes(remoteBranch)) {
      continue;
    }
    
    const merged = isMerged(`origin/${remoteBranch}`, mainBranch);
    const daysSinceCommit = getDaysSinceLastCommit(`origin/${remoteBranch}`);
    const uniqueCommits = getUniqueCommitCount(`origin/${remoteBranch}`, mainBranch);
    const info = getBranchInfo(`origin/${remoteBranch}`);
    
    categories.remoteOnly.push({
      name: remoteBranch,
      merged,
      daysSinceCommit,
      uniqueCommits,
      info,
    });
  }
  
  return categories;
}

/**
 * Print branch category
 */
function printBranchCategory(title, branches, recommendation) {
  printSubsection(title);
  
  if (branches.length === 0) {
    console.log(`${colors.green}✓ No branches in this category${colors.reset}`);
    return;
  }
  
  console.log(`${colors.yellow}Found ${branches.length} branch(es)${colors.reset}`);
  if (recommendation) {
    console.log(`${colors.magenta}${recommendation}${colors.reset}\n`);
  }
  
  for (const branch of branches) {
    console.log(`${colors.bright}${branch.name}${colors.reset}`);
    console.log(`  ${colors.blue}${branch.info}${colors.reset}`);
    
    if (branch.merged) {
      console.log(`  ${colors.green}✓ Merged${colors.reset}`);
    }
    
    if (branch.uniqueCommits !== undefined) {
      console.log(`  Unique commits: ${branch.uniqueCommits}`);
    }
    
    if (branch.daysSinceCommit !== undefined && branch.daysSinceCommit !== null) {
      const color = branch.daysSinceCommit > STALE_DAYS ? colors.red : colors.yellow;
      console.log(`  ${color}Last commit: ${branch.daysSinceCommit} days ago${colors.reset}`);
    }
    
    console.log('');
  }
}

/**
 * Main function
 */
function main() {
  printHeader('🌿 Finding Closeable Branches');
  
  const mainBranch = getMainBranch();
  console.log(`${colors.green}✓ Main branch: ${mainBranch}${colors.reset}`);
  console.log(`${colors.blue}ℹ️  Stale threshold: ${STALE_DAYS} days${colors.reset}`);
  
  const localBranches = getLocalBranches();
  const remoteBranches = getRemoteBranches();
  
  console.log(`\n${colors.blue}ℹ️  Found ${localBranches.length} local branch(es)${colors.reset}`);
  console.log(`${colors.blue}ℹ️  Found ${remoteBranches.length} remote branch(es)${colors.reset}`);
  
  const categories = categorizeBranches(localBranches, remoteBranches, mainBranch);
  
  // Print results
  printBranchCategory(
    '✅ Merged Branches (Safe to Delete)',
    categories.merged,
    '💡 These branches have been merged and can be safely deleted.'
  );
  
  printBranchCategory(
    '🕰️  Stale Branches (Review for Deletion)',
    categories.stale,
    `💡 These branches haven't been updated in ${STALE_DAYS}+ days.`
  );
  
  printBranchCategory(
    '🔄 No Unique Commits (Safe to Delete)',
    categories.noUniqueCommits,
    '💡 These branches have no unique commits compared to main.'
  );
  
  printBranchCategory(
    '🌐 Remote-Only Branches',
    categories.remoteOnly,
    '💡 These branches exist on remote but not locally.'
  );
  
  printBranchCategory(
    '✨ Active Branches (Keep)',
    categories.active,
    null
  );
  
  // Summary
  printHeader('📊 Summary');
  
  const totalCloseable = categories.merged.length + 
                        categories.stale.length + 
                        categories.noUniqueCommits.length;
  
  console.log(`${colors.yellow}Branches that can be closed: ${totalCloseable}${colors.reset}`);
  console.log(`  ${colors.green}✓ Merged: ${categories.merged.length}${colors.reset}`);
  console.log(`  ${colors.yellow}⚠️  Stale: ${categories.stale.length}${colors.reset}`);
  console.log(`  ${colors.blue}ℹ️  No unique commits: ${categories.noUniqueCommits.length}${colors.reset}`);
  console.log(`\n${colors.green}Active branches: ${categories.active.length}${colors.reset}`);
  console.log(`${colors.blue}Remote-only branches: ${categories.remoteOnly.length}${colors.reset}`);
  
  if (totalCloseable > 0) {
    console.log(`\n${colors.bright}${colors.yellow}Commands to delete local branches:${colors.reset}`);
    
    const allCloseable = [
      ...categories.merged,
      ...categories.stale,
      ...categories.noUniqueCommits,
    ];
    
    for (const branch of allCloseable) {
      console.log(`${colors.blue}git branch -d ${branch.name}${colors.reset}  # (or -D to force)`);
    }
    
    console.log(`\n${colors.bright}${colors.yellow}Commands to delete remote branches:${colors.reset}`);
    for (const branch of allCloseable) {
      console.log(`${colors.blue}git push origin --delete ${branch.name}${colors.reset}`);
    }
  }
  
  console.log('');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
