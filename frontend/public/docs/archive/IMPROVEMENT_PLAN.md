# FIP Skill - Comprehensive Improvement & Extension Plan

## Executive Summary

This plan outlines a complete overhaul of the FIP veterinary advisor skill repository to transform it into a professional, maintainable, and extensible Claude skill project with proper CI/CD, testing, and development workflows.

---

## Current State Analysis

### ✅ Strengths

1. **Excellent Content Quality**
   - Evidence-based veterinary guidance (ABCD Guidelines 2024, UC Davis protocols)
   - Comprehensive coverage of FIP diagnosis and treatment
   - Well-structured SKILL.md with workflows and decision trees
   - 4 detailed reference documents (210+ KB of content)

2. **Good Documentation**
   - Installation guide
   - Extension guide with examples
   - Multiple detailed summaries
   - Clear usage examples

3. **Proper Skill Architecture**
   - Core SKILL.md + progressive reference loading
   - Well-organized references/ directory
   - Version history maintained

### ❌ Critical Gaps

1. **No Project Infrastructure**
   - Missing package.json (no dependency management)
   - Missing build system
   - No automated testing
   - No CI/CD pipeline

2. **Poor Repository Structure**
   - 8 documentation files cluttering root directory
   - Packaged .skill files in root (should be in releases/)
   - Empty scripts/ and assets/ directories
   - No tests/ directory

3. **No Development Tooling**
   - No markdown linting
   - No skill validation
   - No automated packaging
   - No quality checks

4. **No GitHub Actions**
   - No automated testing
   - No release automation
   - No PR validation
   - No documentation deployment

---

## Phase 1: Repository Restructuring

### Goal

Transform into a professional Node.js/TypeScript project with proper tooling

### Tasks

#### 1.1 Create Project Infrastructure

**Add package.json:**

```json
{
  "name": "@skills/fip-veterinary-advisor",
  "version": "2.1.0",
  "description": "Evidence-based diagnostic and treatment guidance for Feline Infectious Peritonitis (FIP)",
  "main": "SKILL.md",
  "type": "module",
  "scripts": {
    "build": "node scripts/build.js",
    "package": "node scripts/package.js",
    "validate": "node scripts/validate.js",
    "lint": "markdownlint '**/*.md' --ignore node_modules --ignore dist",
    "lint:fix": "markdownlint '**/*.md' --ignore node_modules --ignore dist --fix",
    "test": "npm run validate && npm run lint",
    "version": "node scripts/version.js",
    "release": "npm run test && npm run build && npm run package"
  },
  "keywords": [
    "claude-skill",
    "veterinary",
    "fip",
    "feline-infectious-peritonitis",
    "diagnostics",
    "treatment"
  ],
  "author": "FIP Veterinary Skill Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/ggwazi/fip-skill.git"
  },
  "devDependencies": {
    "markdownlint-cli": "^0.38.0",
    "archiver": "^6.0.1",
    "chalk": "^5.3.0",
    "globby": "^14.0.0"
  },
  "files": [
    "SKILL.md",
    "references/",
    "scripts/",
    "assets/"
  ],
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### 1.2 Reorganize Directory Structure

**New Structure:**

```
fip-skill/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Continuous Integration
│   │   ├── release.yml         # Release automation
│   │   └── docs.yml            # Documentation deployment
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── content_update.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── installation.md         # Moved from root
│   ├── usage.md                # Renamed from FIP-Skill-Installation-Guide.md
│   ├── extending.md            # Moved from How-to-Extend-FIP-Skill.md
│   ├── architecture.md         # New - system design
│   ├── contributing.md         # New - contribution guidelines
│   ├── changelog.md            # New - version history
│   ├── api/                    # For script documentation
│   └── reference/              # Original PDFs and sources
│       └── icatcare_fipupdate_july25.pdf
│
├── src/                        # Source files for skill
│   ├── SKILL.md                # Moved from root
│   ├── references/
│   │   ├── diagnostic-flowcharts.md
│   │   ├── treatment-protocols.md
│   │   ├── differential-diagnosis.md
│   │   └── prevention-management.md
│   ├── scripts/
│   │   ├── calculate-dose.js   # New - dosage calculator
│   │   ├── treatment-tracker.js # New - monitoring tool
│   │   └── cost-estimator.js   # New - cost calculator
│   └── assets/
│       ├── templates/
│       │   ├── treatment-consent.md
│       │   └── monitoring-schedule.md
│       └── forms/
│           └── client-education.md
│
├── scripts/                    # Build and automation scripts
│   ├── build.js                # Build the skill
│   ├── package.js              # Create .skill package
│   ├── validate.js             # Validate skill structure
│   ├── version.js              # Version management
│   └── utils/
│       ├── file-checker.js
│       └── markdown-validator.js
│
├── tests/                      # Test suite
│   ├── unit/
│   │   ├── dose-calculator.test.js
│   │   └── validators.test.js
│   ├── integration/
│   │   └── skill-loading.test.js
│   └── fixtures/
│       └── sample-cases.json
│
├── dist/                       # Build output (gitignored)
│   └── fip-veterinary-advisor-v2.1.0.skill
│
├── .gitignore
├── .markdownlint.json          # Markdown linting rules
├── package.json
├── README.md                   # Main readme
├── LICENSE
└── CHANGELOG.md                # Version history
```

#### 1.3 Create Configuration Files

**.gitignore:**

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build output
dist/
*.skill

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Environment
.env
.env.local
```

**.markdownlint.json:**

```json
{
  "default": true,
  "MD013": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
}
```

---

## Phase 2: Capability Extensions

### Goal

Add practical tools and enhanced functionality

### 2.1 Dosage Calculator Script

**Purpose:** Automated GS-441524 dosage calculations

**File:** `src/scripts/calculate-dose.js`

**Features:**

- Calculate dose by weight and disease form
- Weekly weight adjustment calculations
- Volume calculations for different concentrations
- Cost estimation per treatment cycle
- Support for oral vs injectable conversions

**Usage:**

```javascript
// Can be called by Claude or run directly
const result = calculateDose({
  weight: 3.5,
  diseaseForm: 'neurological',
  concentration: 15
});
```

### 2.2 Treatment Monitoring Tracker

**Purpose:** Track patient progress over treatment course

**File:** `src/scripts/treatment-tracker.js`

**Features:**

- Record daily weights, temperatures
- Track blood work results over time
- Calculate trends (A:G ratio, globulin levels)
- Generate progress reports
- Alert on concerning trends

**Output:**

- CSV export of data
- Markdown progress report
- Treatment timeline visualization (text-based)

### 2.3 Cost Estimator

**Purpose:** Calculate treatment costs for client planning

**File:** `src/scripts/cost-estimator.js`

**Features:**

- Estimate drug costs by duration
- Include monitoring costs
- Factor in weight changes
- Compare different drug sources/concentrations
- Generate client-facing cost breakdown

### 2.4 Diagnostic Scorer

**Purpose:** Quantify FIP suspicion based on findings

**File:** `src/scripts/diagnostic-scorer.js`

**Features:**

- Implement the +/- evidence weighting system
- Calculate total diagnostic score
- Recommend diagnostic tree to follow
- Suggest next diagnostic steps
- Track probability changes as tests are added

### 2.5 Client Education Templates

**Purpose:** Pre-written materials for client communication

**Files in:** `src/assets/templates/`

**Templates:**

1. **treatment-consent.md** - Informed consent template
2. **monitoring-schedule.md** - Appointment calendar
3. **home-care-guide.md** - Injection instructions
4. **fip-explained.md** - FIP basics for clients
5. **prognosis-discussion.md** - Outcomes and expectations
6. **relapse-watch.md** - Post-treatment monitoring

### 2.6 Enhanced Reference Documents

**New documents to add:**

1. **refractory-cases.md** - Managing treatment failures
2. **combination-therapy.md** - Multiple antiviral protocols
3. **pediatric-fip.md** - Kittens <12 weeks considerations
4. **case-studies.md** - Real-world treatment examples
5. **drug-sources.md** - Availability by region (with disclaimers)
6. **laboratory-reference.md** - Complete lab interpretation guide

---

## Phase 3: GitHub Actions CI/CD

### Goal

Automated testing, validation, and release workflow

### 3.1 Continuous Integration Workflow

**File:** `.github/workflows/ci.yml`

**Triggers:**

- Push to any branch
- Pull requests
- Manual workflow dispatch

**Jobs:**

1. **Lint**

   ```yaml
   - Validate markdown formatting
   - Check for broken links
   - Verify file structure
   ```

2. **Validate**

   ```yaml
   - Ensure SKILL.md has required sections
   - Check reference document structure
   - Validate script syntax
   - Check for required frontmatter
   ```

3. **Test**

   ```yaml
   - Run unit tests for scripts
   - Test skill packaging
   - Validate generated .skill file
   ```

4. **Build**

   ```yaml
   - Package skill
   - Generate checksums
   - Upload artifacts
   ```

### 3.2 Release Automation Workflow

**File:** `.github/workflows/release.yml`

**Triggers:**

- Push to main branch with version tag (v*)
- Manual release trigger

**Jobs:**

1. **Validate Release**

   ```yaml
   - Run full test suite
   - Check version consistency
   - Validate changelog
   ```

2. **Build Release**

   ```yaml
   - Package skill with version number
   - Generate multiple formats
   - Create checksums
   - Generate release notes from changelog
   ```

3. **Create GitHub Release**

   ```yaml
   - Create release with notes
   - Attach .skill package
   - Attach checksums
   - Tag release appropriately
   ```

4. **Update Documentation**

   ```yaml
   - Deploy docs to GitHub Pages
   - Update version badges
   - Archive old versions
   ```

### 3.3 Pull Request Validation

**File:** `.github/workflows/pr-check.yml`

**Triggers:**

- Pull request opened/updated

**Jobs:**

1. **Content Validation**

   ```yaml
   - Check for breaking changes
   - Validate evidence citations
   - Check markdown quality
   - Ensure no malicious content
   ```

2. **Build Verification**

   ```yaml
   - Test skill can be packaged
   - Validate new scripts work
   - Check for file conflicts
   ```

3. **Documentation Check**

   ```yaml
   - Ensure docs updated if needed
   - Check changelog updated
   - Validate examples still work
   ```

### 3.4 Documentation Deployment

**File:** `.github/workflows/docs.yml`

**Triggers:**

- Push to main branch
- Manual trigger

**Jobs:**

1. **Build Documentation**

   ```yaml
   - Generate API docs from scripts
   - Build documentation site
   - Create searchable index
   ```

2. **Deploy to GitHub Pages**

   ```yaml
   - Deploy to gh-pages branch
   - Update version selector
   - Configure custom domain if available
   ```

---

## Phase 4: Testing & Validation

### Goal

Ensure quality and reliability

### 4.1 Unit Tests

**Test Coverage:**

1. **Dose Calculator** (`tests/unit/dose-calculator.test.js`)
   - Correct dosing by weight
   - Correct dosing by disease form
   - Volume calculations
   - Edge cases (very small/large cats)

2. **Treatment Tracker** (`tests/unit/treatment-tracker.test.js`)
   - Data recording accuracy
   - Trend calculations
   - Alert thresholds
   - Export formats

3. **Validators** (`tests/unit/validators.test.js`)
   - SKILL.md structure validation
   - Reference document validation
   - Frontmatter parsing
   - Link checking

### 4.2 Integration Tests

**Test Scenarios:**

1. **Skill Loading** (`tests/integration/skill-loading.test.js`)
   - Skill can be loaded
   - References are accessible
   - Scripts can be executed
   - Assets can be read

2. **End-to-End Workflow** (`tests/integration/e2e-workflow.test.js`)
   - Complete diagnostic workflow
   - Complete treatment workflow
   - Generate client materials
   - Calculate costs

### 4.3 Validation Scripts

**Automated Checks:**

1. **Skill Structure Validator**
   - Required sections present
   - Proper YAML frontmatter
   - All references exist
   - No broken internal links

2. **Content Validator**
   - Evidence citations present
   - Dosing information consistent
   - No contradictions between documents
   - Medical accuracy checks (basic)

3. **Package Validator**
   - .skill file structure correct
   - All files included
   - Compression successful
   - File size reasonable (<10MB)

---

## Phase 5: Documentation Improvements

### Goal

Professional, comprehensive documentation

### 5.1 Documentation Site Structure

```
docs/
├── index.md                    # Landing page
├── getting-started/
│   ├── installation.md
│   ├── quick-start.md
│   └── first-case.md
├── guides/
│   ├── diagnostic-workflow.md
│   ├── treatment-planning.md
│   ├── monitoring-protocol.md
│   └── client-communication.md
├── reference/
│   ├── dosing-tables.md
│   ├── diagnostic-criteria.md
│   ├── differential-diagnosis.md
│   └── evidence-base.md
├── development/
│   ├── contributing.md
│   ├── extending-skill.md
│   ├── scripts-api.md
│   └── testing.md
└── api/
    ├── calculate-dose.md
    ├── treatment-tracker.md
    └── diagnostic-scorer.md
```

### 5.2 README Improvements

**New README.md Structure:**

```markdown
# FIP Veterinary Advisor - Claude Skill

[Badges: Build Status | Release | License | Version]

> Evidence-based diagnostic and treatment guidance for Feline Infectious
> Peritonitis (FIP) based on ABCD Guidelines 2024 and UC Davis protocols.

## Features
- 🎯 Systematic diagnostic workflows
- 💊 Complete GS-441524 treatment protocols
- 📊 Automated dosage calculations
- 📈 Treatment monitoring tools
- 💬 Client communication templates
- 📚 85+ pages of evidence-based guidance

## Quick Start
[Installation instructions]

## Documentation
[Links to documentation]

## Development
[Contributing guide]

## Evidence Base
[Citations and sources]

## License
MIT
```

### 5.3 API Documentation

**Auto-generated from JSDoc:**

```javascript
/**
 * Calculate GS-441524 dosage for FIP treatment
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.weight - Cat weight in kg
 * @param {string} params.diseaseForm - Disease form (wet|dry|ocular|neurological)
 * @param {number} [params.concentration=15] - Drug concentration in mg/ml
 * @returns {Object} Dosing calculation result
 *
 * @example
 * calculateDose({ weight: 3.5, diseaseForm: 'neurological' })
 * // Returns: { totalDose: 35, volume: 2.33, ... }
 */
```

---

## Phase 6: Quality Assurance & Best Practices

### 6.1 Code Quality

**Linting Rules:**

- Markdown: markdownlint with custom rules
- JavaScript: ESLint with recommended rules
- Consistent formatting: Prettier

**Pre-commit Hooks:**

```bash
# Using husky
- Lint staged files
- Run validators
- Check commit message format
```

### 6.2 Version Management

**Semantic Versioning:**

- MAJOR: Breaking changes to skill structure
- MINOR: New features, new reference documents
- PATCH: Bug fixes, content updates

**CHANGELOG.md:**

```markdown
# Changelog

## [2.1.0] - 2025-01-15

### Added
- Dosage calculator script
- Treatment monitoring tracker
- Cost estimation tool
- Client education templates

### Changed
- Restructured repository for better maintainability
- Improved documentation organization

### Fixed
- Corrected neurological FIP dosing reference

## [2.0.0] - 2024-12-01
...
```

### 6.3 Security

**Considerations:**

1. **No Secrets in Repo**
   - No API keys
   - No credentials
   - Use GitHub secrets for CI/CD

2. **Dependabot**
   - Enable for npm dependencies
   - Auto-update security patches

3. **Content Validation**
   - Validate no malicious scripts
   - Check external links
   - Scan for sensitive information

---

## Phase 7: Community & Collaboration

### 7.1 Contribution Guidelines

**CONTRIBUTING.md:**

```markdown
# Contributing to FIP Skill

## Types of Contributions
- 🐛 Bug reports (inaccurate information)
- 💡 Feature requests (new capabilities)
- 📝 Content updates (new research)
- 🔧 Code improvements (scripts, tools)

## Content Update Process
1. Provide evidence citation
2. Update relevant .md file
3. Update changelog
4. Submit PR with description

## Code Contributions
1. Fork repository
2. Create feature branch
3. Add tests
4. Submit PR

## Review Process
- Evidence verification
- Medical accuracy check
- Code review
- Documentation review
```

### 7.2 Issue Templates

**Bug Report Template:**

```markdown
---
name: Content Error
about: Report inaccurate medical information
---

## Location
Which file and section contains the error?

## Current Content
What does it currently say?

## Correct Information
What should it say?

## Evidence
Link to peer-reviewed source or guideline

## Impact
Why is this important to fix?
```

### 7.3 Collaboration Features

**Pull Request Template:**

```markdown
## Type of Change
- [ ] Content update
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation

## Description
What does this change?

## Evidence
Citations for medical changes

## Testing
How was this tested?

## Checklist
- [ ] Tests pass
- [ ] Docs updated
- [ ] Changelog updated
```

---

## Implementation Timeline

### Week 1: Foundation

- ✅ Create package.json
- ✅ Reorganize directory structure
- ✅ Move documentation to docs/
- ✅ Create configuration files
- ✅ Initial commit to new structure

### Week 2: Build System

- Create build scripts
- Create packaging scripts
- Create validation scripts
- Test build process

### Week 3: Scripts & Tools

- Implement dose calculator
- Implement treatment tracker
- Implement cost estimator
- Add unit tests

### Week 4: GitHub Actions

- Setup CI workflow
- Setup release workflow
- Setup PR validation
- Test automation

### Week 5: Documentation

- Improve README
- Create contribution guide
- Write API documentation
- Setup GitHub Pages

### Week 6: Testing & Polish

- Complete test coverage
- Fix any issues
- Polish documentation
- Prepare release

---

## Success Metrics

### Technical Metrics

- ✅ All tests pass
- ✅ 100% CI/CD coverage
- ✅ Build time <2 minutes
- ✅ Package size <50KB

### Quality Metrics

- ✅ No broken links
- ✅ All references validated
- ✅ Markdown lint passing
- ✅ Scripts tested and documented

### User Metrics

- ✅ Installation time <5 minutes
- ✅ Clear documentation
- ✅ Examples for all features
- ✅ Active issue tracking

---

## Future Enhancements

### Phase 8 (Future)

1. **Interactive Tools**
   - Web-based dose calculator
   - Treatment timeline visualizer
   - Diagnostic decision tree UI

2. **Integration Features**
   - Export to veterinary EMR formats
   - Integration with practice management systems
   - API for external tools

3. **Advanced Analytics**
   - Treatment outcome tracking
   - Success rate analytics
   - Cost optimization suggestions

4. **Multilingual Support**
   - Translate skill to multiple languages
   - Regional protocol variations
   - Localized drug availability

---

## Risks & Mitigations

### Risk: Breaking Changes

**Mitigation:** Semantic versioning, clear migration guides

### Risk: Content Accuracy

**Mitigation:** Peer review process, evidence citations required

### Risk: Maintenance Burden

**Mitigation:** Automated testing, clear contribution guidelines

### Risk: CI/CD Costs

**Mitigation:** Use GitHub Actions free tier, optimize workflows

---

## Conclusion

This plan transforms the FIP skill from a collection of markdown files into a professional, maintainable, and extensible Claude skill project with:

✅ Proper project structure
✅ Automated CI/CD
✅ Comprehensive testing
✅ Quality tooling
✅ Rich documentation
✅ Community collaboration features
✅ Practical utility scripts
✅ Professional release process

**Ready to implement!**
