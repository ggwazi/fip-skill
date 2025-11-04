# Copilot Instructions for FIP Veterinary Advisor

This repository contains a Claude skill for evidence-based diagnostic and treatment guidance for
Feline Infectious Peritonitis (FIP). This guide helps Copilot understand the repository structure,
development workflow, and contribution requirements.

## Project Overview

**Purpose:** Provide comprehensive, evidence-based veterinary guidance for diagnosing and treating FIP in cats.

**Technology Stack:**

- Node.js >= 18.0.0
- ES Modules (import/export)
- Native Node.js test runner
- Markdown for content
- Build automation scripts

**Key Components:**

1. **Skill Source** (`src/SKILL.md`) - Main skill file with workflows
2. **Reference Materials** (`src/references/`) - Detailed medical protocols
3. **Utility Scripts** (`src/scripts/`) - Dose calculators, trackers
4. **Build System** (`scripts/`) - Build automation and validation
5. **Tests** (`tests/`) - Unit and integration tests

## Development Setup

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/ggwazi/fip-skill.git
cd fip-skill

# Install dependencies
npm install

# Verify everything works
npm test
```

### Build and Package

```bash
# Build the skill from source files
npm run build

# Package into .skill file
npm run package

# Run full release workflow (test + build + package)
npm run release
```

### Validation and Testing

```bash
# Validate skill structure and check for broken links
npm run validate

# Lint markdown files
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Run all tests (includes pretest validation and linting)
npm test

# Run with coverage
npm run test:coverage
```

## Repository Structure

```text
fip-skill/
├── .github/                     # GitHub configuration
│   ├── workflows/              # CI/CD workflows
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
├── src/                        # Source files
│   ├── SKILL.md               # Main skill file (DO NOT edit directly)
│   ├── references/            # Medical reference documents
│   │   ├── diagnostic-flowcharts.md
│   │   ├── treatment-protocols.md
│   │   ├── differential-diagnosis.md
│   │   └── prevention-management.md
│   ├── scripts/               # Utility scripts
│   └── assets/                # Templates and forms
├── scripts/                    # Build automation
│   ├── build.js               # Build skill from sources
│   ├── package.js             # Package .skill file
│   ├── validate.js            # Validate structure
│   └── find-issues.js         # Find issues since last merge
├── tests/                      # Test suite
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── fixtures/              # Test fixtures
├── docs/                       # Documentation
├── dist/                       # Build output (gitignored)
└── package.json               # Project configuration
```

## Coding Guidelines

### JavaScript/Node.js Style

- **Use ES Modules:** Always use `import/export` syntax
- **JSDoc Comments:** Document all exported functions with JSDoc
- **Error Handling:** Validate inputs and throw meaningful errors
- **Clear Naming:** Use descriptive variable and function names
- **Functional Style:** Prefer pure functions when possible

**Example:**

```javascript
/**
 * Calculate GS-441524 dose for FIP treatment
 *
 * @param {Object} params - Dosing parameters
 * @param {number} params.weight - Cat weight in kg
 * @param {string} params.diseaseForm - Disease form (wet, dry, ocular, neurological)
 * @returns {Object} Dosing result with total dose and concentration
 * @throws {Error} If weight is invalid or disease form unknown
 */
export function calculateDose({ weight, diseaseForm }) {
  if (typeof weight !== 'number' || weight <= 0) {
    throw new Error('Weight must be a positive number');
  }
  // Implementation
}
```

### Markdown Style

- **Follow markdownlint rules:** Configuration in `.markdownlint.json`
- **ATX-style headings:** Use `#` instead of underline style
- **Line length:** Maximum 120 characters (except code blocks and tables)
- **Consistent formatting:** Use existing files as templates
- **Links:** Use reference-style links for better maintainability

### File Organization

- **Source files:** Place in `src/` directory
- **Build scripts:** Place in `scripts/` directory
- **Tests:** Place in `tests/unit/` or `tests/integration/`
- **Documentation:** Place in `docs/` directory
- **Temporary files:** Use `/tmp` for temporary files, never commit them

## Medical Content Guidelines

**CRITICAL:** All medical content must be evidence-based and properly cited.

### Evidence Requirements

1. **Primary Sources Required:**
   - Peer-reviewed publications
   - Official veterinary guidelines (ABCD, AAFP, etc.)
   - Clinical trial data
   - Veterinary school protocols (e.g., UC Davis)

2. **Citation Format:**

   ```markdown
   According to the ABCD Guidelines (2024), the diagnostic approach should...
   
   [Citation: ABCD FIP Guidelines, November 2024]
   ```

3. **What Requires Evidence:**
   - Diagnostic criteria
   - Treatment protocols
   - Dosing recommendations
   - Monitoring parameters
   - Prognostic information
   - Drug efficacy claims

4. **What Does NOT Require Citation:**
   - General veterinary knowledge
   - Basic definitions
   - Common terminology

### Content Quality Standards

- **Accurate:** Reflect current evidence
- **Clear:** Use appropriate veterinary terminology
- **Actionable:** Provide practical guidance
- **Balanced:** Present evidence objectively
- **Patient Safety First:** Prioritize accuracy over all else

## Testing Requirements

### Test Coverage

**All code changes MUST include tests:**

1. **Unit Tests:**
   - Test individual functions
   - Test error handling
   - Test edge cases
   - Use Node.js native test runner

2. **Integration Tests:**
   - Test skill loading
   - Test script execution
   - Test build process

**Example Unit Test:**

```javascript
import { test } from 'node:test';
import assert from 'node:assert';
import { calculateDose } from '../../src/scripts/calculate-dose.js';

test('calculates correct dose for wet FIP', () => {
  const result = calculateDose({ weight: 3, diseaseForm: 'wet' });
  assert.strictEqual(result.total_dose_mg, 15);
});

test('throws error for invalid weight', () => {
  assert.throws(() => {
    calculateDose({ weight: -1, diseaseForm: 'wet' });
  }, /Weight must be a positive number/);
});
```

### Running Tests

```bash
# Run all tests (includes validation and linting)
npm test

# Run specific test file
node --test tests/unit/dose-calculator.test.js

# Run with coverage
npm run test:coverage
```

## Common Tasks

### Adding a New Utility Script

1. Create the script in `src/scripts/`
2. Add JSDoc comments
3. Export functions
4. Create unit tests in `tests/unit/`
5. Update documentation
6. Run `npm test` to validate

### Updating Medical Content

1. Gather peer-reviewed sources
2. Edit relevant file in `src/references/`
3. Add citations
4. Run `npm run validate` to check for broken links
5. Run `npm run lint` to check markdown formatting
6. Update CHANGELOG.md

### Adding New Reference Material

1. Create markdown file in `src/references/`
2. Follow existing file structure
3. Include all citations
4. Update `src/SKILL.md` to reference new material
5. Run validation and tests

### Fixing Validation Errors

```bash
# Check what's broken
npm run validate

# Fix broken links by updating anchor references
# Fix missing sections by adding required content
# Verify fixes
npm run validate
```

## Commit Message Format

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `content:` Medical content update
- `docs:` Documentation changes
- `test:` Test changes
- `refactor:` Code refactoring
- `chore:` Build/tooling changes

**Examples:**

```text
feat: add dosage calculator for neurological FIP
fix: correct wet FIP dosing calculation
content: update ABCD guidelines to 2024 version
docs: improve installation instructions
test: add tests for treatment tracker
```

## Pull Request Guidelines

### Before Creating a PR

1. **Run full test suite:** `npm test`
2. **Build and package:** `npm run release`
3. **Check for issues:** `npm run find-issues`
4. **Update CHANGELOG.md**
5. **Fill out PR template completely**

### PR Checklist

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Functions are documented with JSDoc
- [ ] Medical content has citations
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (or documented)
- [ ] Build succeeds
- [ ] Validation passes

## Known Issues and Constraints

### Current Validation Warnings

The repository currently has some broken internal links that need to be fixed:

- Links to diagnostic tree sections in flowcharts
- Links to treatment protocol sections

When working on these files, ensure all anchor links are valid.

### Build Artifacts

- `dist/` directory is gitignored
- Built `.skill` files are gitignored (except releases)
- Never commit `node_modules/`

## Important Notes for Copilot

1. **Medical Accuracy is Critical:** Always verify medical claims with sources
2. **Evidence-Based Only:** Never make unsubstantiated medical claims
3. **Test Everything:** Run tests after every code change
4. **Validate Frequently:** Run `npm run validate` to catch issues early
5. **Follow Existing Patterns:** Use existing code as templates
6. **Document Thoroughly:** Add JSDoc comments and update docs
7. **Patient Safety First:** When in doubt, be conservative with medical advice

## Useful Commands Reference

```bash
# Development
npm install              # Install dependencies
npm test                # Run all tests (includes validation and linting)
npm run build           # Build skill from sources
npm run package         # Create .skill package
npm run release         # Full release workflow

# Validation
npm run validate        # Validate skill structure
npm run lint            # Lint markdown files
npm run lint:fix        # Auto-fix markdown issues

# Testing
npm run test:coverage   # Run tests with coverage
node --test tests/unit/specific-test.js  # Run specific test

# Utilities
npm run find-issues     # Find issues since last merge
npm run find-closeable-branches  # Find branches to clean up

# Cleanup
npm run clean           # Remove build artifacts
```

## Getting Help

- **Documentation Issues:** Check `docs/` directory
- **Build Issues:** Check `scripts/` directory source code
- **Medical Content Questions:** Review ABCD FIP guidelines PDF in `docs/reference/icatcare_fipupdate_july25.pdf`
- **Contributing Guide:** See `CONTRIBUTING.md`
- **Changelog:** See `CHANGELOG.md`

## License

This project is licensed under the MIT License. All contributions must be compatible with this license.
