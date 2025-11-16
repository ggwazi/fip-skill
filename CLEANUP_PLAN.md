# Repository Cleanup and Best Practices Plan

> **Created:** 2025-11-16
> **Status:** Planning Phase
> **Priority:** High

This document outlines a comprehensive plan to cleanup, restructure, and apply best practices to the FIP Veterinary Advisor Skill repository.

---

## 📊 Executive Summary

The repository is well-structured and professionally organized. However, there are several areas for improvement:

- **Critical Issues:** 2 (documentation redundancy, outdated tracking)
- **Important Improvements:** 5 (testing, code standards, tooling)
- **Nice to Have:** 8 (optimizations, enhancements)
- **Estimated Effort:** 2-3 days

---

## 🔍 Findings

### ✅ Strengths

1. **Clean Repository State**
   - No build artifacts (.skill, .sha256 files)
   - No node_modules committed
   - Proper .gitignore configuration
   - No temporary files or logs

2. **Well-Organized Structure**
   - Clear separation of concerns (src/, scripts/, tests/, docs/)
   - Logical file organization
   - Professional naming conventions
   - Good use of subdirectories

3. **Solid Infrastructure**
   - Comprehensive build scripts
   - GitHub Actions CI/CD workflows
   - Testing framework in place
   - Markdown linting configured

4. **Good Documentation**
   - Comprehensive README.md
   - Contributing guidelines
   - Changelog tracking
   - Multiple docs in docs/ directory

### ⚠️ Issues Identified

#### 🔴 Critical Issues

1. **Documentation Redundancy**
   - **Problem:** TODO.md and ROADMAP.md track the same content with significant overlap
   - **Impact:** Confusion about source of truth, maintenance burden, sync issues
   - **Example:** Both list the same 14 missing items with different status markers

2. **Outdated Tracking Information**
   - **Problem:** TODO.md lists files as missing that actually exist
   - **Evidence:**
     - TODO.md says "Missing 4 client education templates" (lines 26, 34)
     - BUT: 4 templates exist in `src/assets/templates/`:
       - fip-explained.md (exists, 15KB)
       - home-care-guide.md (exists, 13KB)
       - monitoring-schedule.md (exists, 3.7KB)
       - treatment-consent.md (exists, 3.4KB)
     - TODO.md line 130 says `refractory-cases.md` is "HIGH PRIORITY" missing
     - BUT: `src/references/refractory-cases.md` exists (732 lines, 21KB)
   - **Impact:** Misleading contributors, wasted effort

#### 🟡 Important Issues

3. **Missing Integration Tests**
   - **Problem:** Only unit tests exist, no integration tests
   - **Current Coverage:** 2 unit test files (dose-calculator, maintenance-tools)
   - **Missing:** tests/integration/ directory (correctly identified in TODO)
   - **Impact:** Cannot verify end-to-end workflows

4. **Inconsistent Error Handling in Scripts**
   - **Problem:** Scripts use different patterns for error handling
   - **Examples:**
     - Some use try/catch blocks
     - Some use process.exit()
     - Some return error codes
     - No standard error logging
   - **Impact:** Difficult debugging, inconsistent behavior

5. **No Development Tooling**
   - **Missing:**
     - EditorConfig (.editorconfig)
     - Prettier configuration (for consistent formatting)
     - Husky pre-commit hooks (to enforce standards)
     - JSDoc configuration
   - **Impact:** Inconsistent code style across contributors

6. **Incomplete API Documentation**
   - **Problem:** Scripts have JSDoc comments but no generated API docs
   - **Missing:** docs/api/ directory
   - **Impact:** Contributors must read source code to understand APIs

7. **No Dependency Management**
   - **Problem:** No package-lock.json committed
   - **Impact:** Non-deterministic builds, version drift
   - **Note:** Should run `npm install` and commit lockfile

#### 🟢 Minor Issues

8. **Potentially Redundant .markdownlintignore**
   - **File:** .markdownlintignore (8 lines)
   - **Question:** Could this be consolidated into .markdownlint.json?
   - **Current:** Ignores docs/archive/, dist/, node_modules/, templates/
   - **Recommendation:** Keep it (valid use case for ignoring template long lines)

9. **No CODEOWNERS File**
   - **Missing:** .github/CODEOWNERS
   - **Impact:** No automatic reviewer assignment
   - **Nice to have:** Define code ownership for medical vs. technical content

10. **No Security Policy**
    - **Missing:** SECURITY.md
    - **Impact:** No clear process for reporting security issues
    - **Best practice:** Define vulnerability reporting process

11. **Missing Pull Request Labels Automation**
    - **Current:** Manual labeling in pr-check.yml
    - **Better:** Use GitHub Actions labeler with .github/labeler.yml

12. **No Dependabot Configuration**
    - **Missing:** .github/dependabot.yml
    - **Impact:** Manual dependency updates
    - **Best practice:** Automated security updates

13. **No Issue Templates Enhancement**
    - **Current:** Basic issue templates
    - **Enhancement:** Add issue forms (YAML) for better structure

14. **License File Not Validated**
    - **Present:** LICENSE file exists
    - **Action:** Verify it's complete MIT license
    - **Add:** License header comments in source files

15. **No Code Coverage Reporting**
    - **Current:** Test coverage exists but not reported
    - **Missing:** Coverage thresholds, CI reporting
    - **Tool:** Built-in Node.js coverage (experimental)

---

## 🎯 Cleanup Plan

### Phase 1: Critical Fixes (Priority 1) - Day 1

#### Task 1.1: Audit and Update TODO.md

**Time:** 1 hour

- [ ] Compare TODO.md against actual repository state
- [ ] Mark existing files as completed:
  - [ ] home-care-guide.md ✅
  - [ ] fip-explained.md ✅
  - [ ] monitoring-schedule.md ✅
  - [ ] treatment-consent.md ✅
  - [ ] refractory-cases.md ✅
- [ ] Update file counts and statistics
- [ ] Verify "Current State" section (lines 19-31)
- [ ] Add "Last Verified" date

#### Task 1.2: Consolidate TODO.md and ROADMAP.md

**Time:** 2 hours

**Decision Options:**

**Option A: Merge into Single ROADMAP.md** (Recommended)
- Keep ROADMAP.md as primary tracking document
- Archive TODO.md to docs/archive/
- Update ROADMAP.md with all relevant TODO items
- Add section for "Completed Items" with checkmarks
- Single source of truth

**Option B: Keep Separate with Clear Boundaries**
- TODO.md = Operational checklist (what exists, what doesn't)
- ROADMAP.md = Strategic planning (versions, releases)
- Add cross-references between them
- Automated sync process

**Recommendation:** Option A

**Actions:**
- [ ] Merge unique content from TODO.md into ROADMAP.md
- [ ] Move TODO.md to docs/archive/TODO_v2.1.0.md
- [ ] Update all references to TODO.md in other docs
- [ ] Update CONTRIBUTING.md to reference ROADMAP.md

#### Task 1.3: Verify File Inventory

**Time:** 30 minutes

- [ ] Create comprehensive file inventory script
- [ ] Compare against documentation claims
- [ ] Update all counts in README.md, ROADMAP.md
- [ ] Document discrepancies

---

### Phase 2: Infrastructure Improvements (Priority 2) - Day 2

#### Task 2.1: Add Missing Integration Tests

**Time:** 4 hours

**Structure:**

```
tests/
├── unit/                           # Existing
│   ├── dose-calculator.test.js    ✅
│   └── maintenance-tools.test.js  ✅
├── integration/                    # NEW
│   ├── skill-loading.test.js      # Test SKILL.md loads
│   ├── workflow.test.js           # Test diagnostic workflows
│   ├── scripts-integration.test.js # Test all scripts together
│   └── fixtures/
│       ├── sample-cases.json      # Test data
│       └── mock-skill.md          # Minimal test skill
└── e2e/                           # FUTURE
    └── full-workflow.test.js      # End-to-end scenarios
```

**Test Coverage:**
- [ ] Skill file parsing and loading
- [ ] Reference document accessibility
- [ ] Script execution and integration
- [ ] Diagnostic workflow trees A, B, C, D
- [ ] Treatment workflow (dose calc → tracking → cost)

#### Task 2.2: Standardize Error Handling

**Time:** 2 hours

**Create:** `scripts/utils/error-handler.js`

```javascript
/**
 * Standardized error handling utilities
 */
export class ScriptError extends Error {
  constructor(message, code, context = {}) {
    super(message);
    this.name = 'ScriptError';
    this.code = code;
    this.context = context;
  }
}

export function handleError(error, exitOnError = true) {
  // Standardized logging
  // Context preservation
  // Exit code management
}

export function validateRequired(params, required) {
  // Parameter validation
}
```

**Update all scripts to use:**
- [ ] build.js
- [ ] package.js
- [ ] validate.js
- [ ] version.js
- [ ] find-issues.js
- [ ] find-closeable-branches.js
- [ ] src/scripts/*.js

#### Task 2.3: Add Development Tooling

**Time:** 1 hour

**Add EditorConfig** (`.editorconfig`):

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
max_line_length = 180

[*.js]
indent_size = 2
```

**Add Prettier** (`.prettierrc.json`):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**Update package.json:**

```json
{
  "scripts": {
    "format": "prettier --write '**/*.{js,json,md}'",
    "format:check": "prettier --check '**/*.{js,json,md}'"
  },
  "devDependencies": {
    "prettier": "^3.1.0",
    "@prettier/plugin-xml": "^3.2.2"
  }
}
```

#### Task 2.4: Add Package Lock

**Time:** 10 minutes

```bash
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json for deterministic builds"
```

---

### Phase 3: Documentation Enhancements (Priority 3) - Day 2-3

#### Task 3.1: Generate API Documentation

**Time:** 2 hours

**Add JSDoc Generation:**

**Install:**

```bash
npm install --save-dev jsdoc jsdoc-to-markdown
```

**Add scripts:**

```json
{
  "scripts": {
    "docs:api": "node scripts/generate-api-docs.js",
    "docs:jsdoc": "jsdoc -c jsdoc.json"
  }
}
```

**Create:** `scripts/generate-api-docs.js`
- Generate markdown from JSDoc comments
- Create docs/api/*.md for each script
- Automated as part of release process

**Create:** `jsdoc.json`
- Configuration for JSDoc generation

**Generate docs for:**
- [ ] calculate-dose.js → docs/api/calculate-dose.md
- [ ] treatment-tracker.js → docs/api/treatment-tracker.md
- [ ] cost-estimator.js → docs/api/cost-estimator.md
- [ ] Future: diagnostic-scorer.js

#### Task 3.2: Add SECURITY.md

**Time:** 30 minutes

**Create:** `SECURITY.md`

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.1.x   | :white_check_mark: |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

### Medical Content Issues
For issues related to medical accuracy or patient safety:
- Email: [maintainer email]
- Subject: "FIP Skill - Medical Safety Issue"
- Response time: 24-48 hours

### Security Vulnerabilities
For code security issues:
- Use GitHub Security Advisories
- Private disclosure preferred
- Response time: 72 hours

## Scope
This project is an educational resource. Security concerns focus on:
- Code injection vulnerabilities
- Data validation issues
- Dependency vulnerabilities
```

#### Task 3.3: Add CODEOWNERS

**Time:** 15 minutes

**Create:** `.github/CODEOWNERS`

```
# Medical content requires veterinary review
/src/SKILL.md @ggwazi
/src/references/ @ggwazi
/src/assets/templates/ @ggwazi
docs/reference/ @ggwazi

# Code changes can be reviewed by any maintainer
/src/scripts/ @ggwazi
/scripts/ @ggwazi
/tests/ @ggwazi

# Infrastructure
.github/ @ggwazi
*.json @ggwazi
*.md @ggwazi
```

#### Task 3.4: Add Architecture Documentation

**Time:** 2 hours

**Create:** `docs/architecture.md`

**Sections:**
- System Overview
- Repository Structure Explained
- Build Pipeline Architecture
- Skill Loading Mechanism
- Script Execution Model
- Testing Strategy
- CI/CD Pipeline
- Release Process
- Design Decisions & Rationale
- Future Considerations

---

### Phase 4: GitHub Configuration (Priority 4) - Day 3

#### Task 4.1: Add Dependabot

**Time:** 15 minutes

**Create:** `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    reviewers:
      - "ggwazi"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore"
      include: "scope"
```

#### Task 4.2: Enhance Issue Templates with Forms

**Time:** 1 hour

**Convert to YAML issue forms** (better UX than markdown):

**Create:** `.github/ISSUE_TEMPLATE/bug_report.yml`
**Create:** `.github/ISSUE_TEMPLATE/content_update.yml`
**Create:** `.github/ISSUE_TEMPLATE/feature_request.yml`

Benefits:
- Structured input (dropdowns, checkboxes)
- Required fields enforcement
- Better data validation

#### Task 4.3: Add PR Labeler

**Time:** 30 minutes

**Create:** `.github/labeler.yml`

```yaml
content:
  - 'src/SKILL.md'
  - 'src/references/**'
  - 'src/assets/templates/**'

documentation:
  - 'docs/**'
  - '*.md'

scripts:
  - 'src/scripts/**'

build:
  - 'scripts/**'
  - 'package.json'

testing:
  - 'tests/**'

ci-cd:
  - '.github/workflows/**'
```

**Update workflow:**

```yaml
# .github/workflows/label.yml (NEW)
name: Label PRs
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

#### Task 4.4: Add Code Coverage Reporting

**Time:** 1 hour

**Update:** `.github/workflows/ci.yml`

```yaml
- name: Run tests with coverage
  run: npm run test:coverage

- name: Check coverage thresholds
  run: |
    # Add coverage threshold checks
    # Fail if coverage < 80% for utils
    # Warn if coverage < 60% overall
```

**Add:** `scripts/check-coverage.js`
- Parse coverage output
- Enforce thresholds
- Generate reports

---

### Phase 5: Code Quality (Priority 5) - Day 3

#### Task 5.1: Add Pre-commit Hooks

**Time:** 1 hour

**Install Husky:**

```bash
npm install --save-dev husky lint-staged
npx husky install
```

**Create:** `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:staged
```

**Add to package.json:**

```json
{
  "lint-staged": {
    "*.md": ["markdownlint --fix", "prettier --write"],
    "*.js": ["prettier --write"],
    "*.json": ["prettier --write"]
  },
  "scripts": {
    "lint:staged": "lint-staged",
    "prepare": "husky install"
  }
}
```

#### Task 5.2: Enhance JSDoc Comments

**Time:** 2 hours

**Standards:**
- All exported functions must have JSDoc
- Include @param, @returns, @throws
- Add @example for complex functions
- Link to related functions with @see

**Update:**
- [ ] src/scripts/calculate-dose.js
- [ ] src/scripts/treatment-tracker.js
- [ ] src/scripts/cost-estimator.js
- [ ] src/scripts/constants.js
- [ ] All scripts/ files

#### Task 5.3: Add License Headers

**Time:** 30 minutes

**Add to all .js files:**

```javascript
/**
 * @license
 * Copyright (c) 2024 FIP Veterinary Skill Team
 * SPDX-License-Identifier: MIT
 */
```

**Create script:** `scripts/add-license-headers.js`

---

## 📁 Proposed Directory Structure

### Current Structure ✅ (Good)

```
fip-skill/
├── .github/              # GitHub configuration
├── docs/                 # Documentation
├── scripts/              # Build scripts
│   └── utils/           # Shared utilities
├── src/                  # Source files
│   ├── assets/
│   │   └── templates/   # Client templates
│   ├── references/      # Veterinary references
│   ├── scripts/         # Utility scripts
│   └── SKILL.md         # Main skill file
└── tests/               # Tests
    └── unit/            # Unit tests
```

### Proposed Structure (Enhanced)

```
fip-skill/
├── .github/
│   ├── ISSUE_TEMPLATE/  # Issue templates (YAML forms)
│   ├── workflows/       # CI/CD workflows
│   ├── CODEOWNERS       # NEW
│   ├── dependabot.yml   # NEW
│   ├── labeler.yml      # NEW
│   └── copilot-instructions.md
├── .husky/              # NEW - Git hooks
│   └── pre-commit
├── docs/
│   ├── api/             # NEW - Generated API docs
│   │   ├── calculate-dose.md
│   │   ├── treatment-tracker.md
│   │   └── cost-estimator.md
│   ├── archive/         # Archived documents
│   │   ├── IMPROVEMENT_PLAN.md ✅
│   │   └── TODO_v2.1.0.md  # NEW - Archived TODO
│   ├── reference/       # Evidence base
│   ├── architecture.md  # NEW
│   ├── extending.md
│   ├── installation.md
│   └── summary.md
├── scripts/
│   ├── utils/
│   │   ├── error-handler.js   # NEW
│   │   ├── logger.js
│   │   └── fs-helpers.js
│   ├── build.js
│   ├── package.js
│   ├── validate.js
│   ├── generate-api-docs.js   # NEW
│   └── check-coverage.js      # NEW
├── src/
│   ├── assets/
│   │   └── templates/   # 4 existing files ✅
│   ├── references/      # 5 existing files ✅
│   ├── scripts/
│   │   ├── calculate-dose.js
│   │   ├── treatment-tracker.js
│   │   ├── cost-estimator.js
│   │   ├── constants.js
│   │   └── diagnostic-scorer.js  # FUTURE
│   └── SKILL.md
├── tests/
│   ├── unit/            # Existing ✅
│   ├── integration/     # NEW
│   │   ├── skill-loading.test.js
│   │   ├── workflow.test.js
│   │   ├── scripts-integration.test.js
│   │   └── fixtures/
│   │       ├── sample-cases.json
│   │       └── mock-skill.md
│   └── e2e/             # FUTURE
├── .editorconfig        # NEW
├── .prettierrc.json     # NEW
├── jsdoc.json           # NEW
├── SECURITY.md          # NEW
├── ROADMAP.md           # Enhanced (merged with TODO)
└── ... (existing files)
```

---

## 🔧 Recommended Best Practices

### Code Quality

1. **Linting:** ✅ Already using markdownlint
2. **Formatting:** ➕ Add Prettier
3. **Type Checking:** ⏭️ Future: Consider TypeScript or JSDoc @types
4. **Code Review:** ✅ PR templates exist
5. **Pre-commit Hooks:** ➕ Add Husky

### Testing

1. **Unit Tests:** ✅ Exist (2 files)
2. **Integration Tests:** ➕ Add (missing)
3. **Coverage:** ➕ Enforce thresholds
4. **Test Data:** ➕ Add fixtures/
5. **Continuous Testing:** ✅ CI runs tests

### Documentation

1. **README:** ✅ Comprehensive
2. **API Docs:** ➕ Generate from JSDoc
3. **Architecture:** ➕ Add docs/architecture.md
4. **Changelog:** ✅ Maintained
5. **Contributing:** ✅ Exists

### Security

1. **Dependency Scanning:** ➕ Add Dependabot
2. **Security Policy:** ➕ Add SECURITY.md
3. **License:** ✅ MIT license exists
4. **Secrets:** ✅ No secrets found
5. **Audit:** ✅ npm audit in CI

### Maintenance

1. **Issue Templates:** ✅ Exist, ➕ Enhance with YAML forms
2. **PR Templates:** ✅ Exist
3. **Labeling:** ➕ Automate with labeler
4. **Codeowners:** ➕ Add .github/CODEOWNERS
5. **Roadmap:** ✅ Exists, ➕ Consolidate with TODO

---

## 📋 Implementation Checklist

### Day 1: Critical Fixes

- [ ] Audit TODO.md against actual files
- [ ] Mark completed items (templates, refractory-cases.md)
- [ ] Decide: Merge TODO.md + ROADMAP.md or keep separate
- [ ] If merging: Create consolidated ROADMAP.md
- [ ] Archive old TODO.md to docs/archive/
- [ ] Update all cross-references
- [ ] Run validation to confirm accuracy

### Day 2: Infrastructure

- [ ] Create tests/integration/ directory
- [ ] Write skill-loading.test.js
- [ ] Write workflow.test.js
- [ ] Write scripts-integration.test.js
- [ ] Create test fixtures
- [ ] Create error-handler.js utility
- [ ] Update all scripts to use error-handler
- [ ] Add .editorconfig
- [ ] Add .prettierrc.json
- [ ] Run npm install (create package-lock.json)
- [ ] Format all files with Prettier
- [ ] Commit changes

### Day 3: Documentation & Tooling

- [ ] Install jsdoc and jsdoc-to-markdown
- [ ] Create generate-api-docs.js script
- [ ] Generate API docs for all scripts
- [ ] Create docs/architecture.md
- [ ] Create SECURITY.md
- [ ] Create .github/CODEOWNERS
- [ ] Create .github/dependabot.yml
- [ ] Convert issue templates to YAML forms
- [ ] Create .github/labeler.yml
- [ ] Add coverage threshold checks
- [ ] Install Husky and lint-staged
- [ ] Configure pre-commit hooks
- [ ] Enhance JSDoc comments
- [ ] Add license headers to all .js files
- [ ] Run full test suite
- [ ] Update CHANGELOG.md
- [ ] Create cleanup summary report

---

## 🎯 Success Metrics

### Before Cleanup

- **Documentation Files:** 11 (with redundancy)
- **Test Coverage:** Unit tests only (~40% coverage estimate)
- **Code Consistency:** Informal
- **Automation:** Basic (CI, no pre-commit)
- **API Docs:** None
- **Tracked Issues:** Inaccurate (outdated TODO.md)

### After Cleanup

- **Documentation Files:** 12+ (consolidated, accurate)
- **Test Coverage:** 60-80% (with integration tests)
- **Code Consistency:** Enforced (Prettier, EditorConfig, Husky)
- **Automation:** Comprehensive (CI, pre-commit, Dependabot)
- **API Docs:** Auto-generated for all scripts
- **Tracked Issues:** Accurate (single source: ROADMAP.md)

---

## 🚀 Next Steps After Cleanup

### Immediate (Week 1)

1. Review and approve this cleanup plan
2. Execute Phase 1 (Critical Fixes)
3. Execute Phase 2 (Infrastructure)
4. Execute Phase 3 (Documentation)

### Short Term (Week 2)

1. Execute Phase 4 (GitHub Config)
2. Execute Phase 5 (Code Quality)
3. Full testing and validation
4. Create v2.1.1 release with cleanup

### Medium Term (Month 1)

1. Implement missing content per ROADMAP.md
2. Add diagnostic-scorer.js
3. Complete integration test suite
4. Release v2.2.0

### Long Term (Quarter 1)

1. Consider TypeScript migration
2. Add E2E testing
3. Performance optimization
4. Release v2.3.0+

---

## 📞 Questions & Decisions Needed

### Critical Decisions

1. **TODO.md vs ROADMAP.md:** Merge or keep separate?
   - **Recommendation:** Merge into ROADMAP.md
   - **Rationale:** Single source of truth, less maintenance

2. **Prettier Adoption:** Add formatting enforcement?
   - **Recommendation:** Yes, add Prettier
   - **Rationale:** Consistent code style, reduces bike-shedding

3. **Pre-commit Hooks:** Enforce quality gates locally?
   - **Recommendation:** Yes, add Husky
   - **Rationale:** Catch issues before push, faster feedback

### Nice to Have Decisions

4. **TypeScript Migration:** Convert .js to .ts?
   - **Recommendation:** Not now, consider for v3.0
   - **Rationale:** Significant effort, use JSDoc types for now

5. **Monorepo Structure:** Split into packages?
   - **Recommendation:** No, keep monolithic
   - **Rationale:** Project size doesn't warrant complexity

---

## 📚 Resources & References

### Tools to Install

- Prettier: Code formatting
- Husky: Git hooks
- JSDoc: Documentation generation
- lint-staged: Run linters on staged files

### Documentation

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [JSDoc](https://jsdoc.app/)
- [Prettier](https://prettier.io/)

---

**Maintainer:** @ggwazi
**Created:** 2025-11-16
**Status:** 🟡 Awaiting Approval
**Estimated Effort:** 2-3 days
**Priority:** High
