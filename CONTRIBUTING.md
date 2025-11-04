# Contributing to FIP Veterinary Advisor Skill

Thank you for your interest in contributing to the FIP Veterinary Advisor skill! This document provides guidelines for contributing medical content, code, documentation, and other improvements.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Types of Contributions](#types-of-contributions)
3. [Before You Start](#before-you-start)
4. [Contribution Process](#contribution-process)
5. [Medical Content Guidelines](#medical-content-guidelines)
6. [Code Contribution Guidelines](#code-contribution-guidelines)
7. [Testing Requirements](#testing-requirements)
8. [Documentation Standards](#documentation-standards)
9. [Review Process](#review-process)

---

## Code of Conduct

### Our Standards

- **Patient Safety First:** All contributions must prioritize accurate, evidence-based information
- **Professional Discourse:** Maintain respectful, professional communication
- **Evidence-Based:** Support medical claims with peer-reviewed sources
- **Collaborative:** Work together to improve veterinary care for FIP patients

### Unacceptable Behavior

- Submitting unsubstantiated medical claims
- Promoting specific commercial products without evidence
- Harassment or unprofessional conduct
- Ignoring evidence-based guidelines

---

## Types of Contributions

### 1. Medical Content Updates

- Correcting inaccuracies
- Adding new research findings
- Updating treatment protocols
- Expanding diagnostic guidance

### 2. Code Contributions

- Utility scripts (dose calculators, trackers)
- Build system improvements
- Test coverage
- Bug fixes

### 3. Documentation

- Installation guides
- Usage examples
- API documentation
- Clarifications

### 4. Templates & Assets

- Client education materials
- Treatment forms
- Monitoring templates

---

## Before You Start

### For Medical Content

1. **Check Existing Content:** Ensure your update isn't already covered
2. **Gather Evidence:** Collect peer-reviewed sources supporting your contribution
3. **Review Guidelines:** Familiarize yourself with ABCD and UC Davis protocols
4. **Open an Issue:** Discuss major changes before implementing

### For Code

1. **Check Issues:** Look for existing discussions or related work
2. **Review Code Style:** Understand the project's structure and conventions
3. **Setup Environment:** Install dependencies and verify build works
4. **Write Tests:** Plan test coverage for new functionality

---

## Contribution Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/fip-skill.git
cd fip-skill

# Add upstream remote
git remote add upstream https://github.com/ggwazi/fip-skill.git
```

### 2. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for content updates
git checkout -b content/update-description
```

### 3. Make Your Changes

```bash
# Edit files
# Add tests
# Update documentation
# Update CHANGELOG.md
```

### 4. Test Your Changes

```bash
# Install dependencies
npm install

# Run validation
npm run validate

# Run tests
npm test

# Build and package
npm run release
```

### 5. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add dosage calculator for neurological FIP"

# Or for content
git commit -m "content: update stopping criteria based on 2024 study"
```

**Commit Message Format:**

- `feat:` New feature
- `fix:` Bug fix
- `content:` Medical content update
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring
- `chore:` Build/tooling

### 6. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create Pull Request
# Fill out the PR template completely
```

---

## Medical Content Guidelines

### Evidence Requirements

All medical content changes MUST be supported by:

1. **Primary Sources:**
   - Peer-reviewed publications
   - Official veterinary guidelines (ABCD, AAFP, etc.)
   - Clinical trial data
   - Veterinary school protocols

2. **Citation Format:**

   ```markdown
   According to the ABCD Guidelines (2024), the diagnostic approach should...

   [Citation: ABCD FIP Guidelines, November 2024, DOI: 10.xxx/xxx]
   ```

### What Requires Evidence

- ✅ Diagnostic criteria
- ✅ Treatment protocols
- ✅ Dosing recommendations
- ✅ Monitoring parameters
- ✅ Prognostic information
- ✅ Drug efficacy claims
- ❌ General veterinary knowledge (e.g., "cats are obligate carnivores")
- ❌ Basic facts (e.g., "FIP stands for Feline Infectious Peritonitis")

### Content Quality Standards

- **Accurate:** Reflect current evidence
- **Clear:** Use appropriate veterinary terminology
- **Actionable:** Provide practical guidance
- **Balanced:** Present evidence objectively
- **Updated:** Reflect latest research

### Review Process for Medical Content

Medical content changes undergo additional review:

1. **Evidence Verification:** Citations checked for accuracy
2. **Medical Review:** Content reviewed by veterinary professionals
3. **Consistency Check:** Ensure no contradictions with existing content
4. **Impact Assessment:** Evaluate effect on clinical practice

---

## Code Contribution Guidelines

### Code Style

**JavaScript/Node.js:**

- Use ES modules (`import/export`)
- Clear variable names
- JSDoc comments for functions
- Error handling for all inputs

```javascript
/**
 * Calculate GS-441524 dose
 *
 * @param {Object} params - Parameters
 * @param {number} params.weight - Weight in kg
 * @returns {Object} Dosing result
 */
export function calculateDose({ weight }) {
  if (typeof weight !== 'number' || weight <= 0) {
    throw new Error('Weight must be a positive number');
  }
  // Implementation
}
```

**Markdown:**

- Follow markdownlint rules
- Use ATX-style headings (`#`)
- Line length ≤ 120 characters (except code blocks)
- Consistent formatting

### File Organization

- **Source files:** `src/`
- **Build scripts:** `scripts/`
- **Tests:** `tests/`
- **Documentation:** `docs/`

### Adding New Scripts

1. Create in `src/scripts/`
2. Add JSDoc comments
3. Export functions
4. Add CLI interface if useful
5. Write unit tests
6. Update documentation

---

## Testing Requirements

### Required Tests

All code changes must include tests:

**Unit Tests:**

```javascript
// tests/unit/dose-calculator.test.js
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
  });
});
```

**Integration Tests:**

- Test skill loading
- Test script execution
- Test build process

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
node --test tests/unit/dose-calculator.test.js

# Run with coverage
npm run test:coverage
```

---

## Documentation Standards

### Required Documentation

1. **Code Comments:**
   - JSDoc for all exported functions
   - Inline comments for complex logic

2. **README Updates:**
   - Add new features to feature list
   - Update usage examples

3. **CHANGELOG:**
   - Document all changes
   - Follow Keep a Changelog format

### Documentation Format

```markdown
## Feature Name

Brief description of what it does.

### Usage

\`\`\`javascript
// Example code
\`\`\`

### Parameters

- `param1` (type): Description
- `param2` (type): Description

### Returns

Description of return value

### Example

\`\`\`javascript
const result = functionName({ param1: value });
console.log(result);
\`\`\`
```

---

## Review Process

### What Reviewers Check

**For Medical Content:**

1. Evidence citations present and accurate
2. Information reflects current best practices
3. No contradictions with existing content
4. Clear and actionable guidance
5. Appropriate disclaimers

**For Code:**

1. Tests pass
2. Code follows style guidelines
3. Functions well-documented
4. Error handling present
5. No breaking changes (or documented)

### Response Times

- Initial review: Within 1 week
- Follow-up: Within 3 days
- Final approval: When all checks pass

### Making Requested Changes

```bash
# Make changes
# Commit
git add .
git commit -m "fix: address review comments"

# Push
git push origin feature/your-feature-name
```

---

## Questions or Need Help?

- **General Questions:** Open a discussion on GitHub
- **Bug Reports:** Use the bug report template
- **Feature Ideas:** Use the feature request template
- **Medical Content:** Use the content update template

---

## Recognition

Contributors will be:

- Listed in project contributors
- Acknowledged in relevant documentation
- Credited for significant contributions

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping improve FIP treatment for cats worldwide! 🐱
