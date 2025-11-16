# FIP Veterinary Advisor Skill - Development Roadmap

> **Last Updated:** 2025-11-16
> **Last Verified:** 2025-11-16 (Phase 1 Cleanup)
> **Current Version:** 2.1.0
> **Target Version:** 2.3.0
> **Status:** Active Development

This roadmap outlines the development plan for completing the FIP Veterinary Advisor skill. The repository infrastructure is complete (v2.1.0) - focus is now on **content completion**.

**Note:** This document replaces and consolidates the previous TODO.md and ROADMAP.md files to provide a single source of truth for project status and planning.

---

## 📊 Current Status (Verified 2025-11-16)

### ✅ Completed Infrastructure (v2.1.0)

- Core infrastructure (package.json, build system)
- GitHub Actions CI/CD workflows (ci.yml, pr-check.yml, release.yml)
- Testing framework (Node.js native test runner)
- Unit tests (2 files: dose-calculator, maintenance-tools)
- Build scripts (7 files: build, package, validate, version, find-issues, find-closeable-branches)
- Comprehensive documentation (README, CHANGELOG, CONTRIBUTING, installation, extending, summary)
- Build and release automation

### ✅ Completed Content (v2.1.0 - Verified)

#### Client Education Templates (4/4 Complete) ✅
All located in `src/assets/templates/`:

1. ✅ **fip-explained.md** (15KB) - FIP basics in client-friendly language
2. ✅ **home-care-guide.md** (13KB) - Step-by-step injection instructions
3. ✅ **monitoring-schedule.md** (3.7KB) - Weekly/monthly monitoring checklist
4. ✅ **treatment-consent.md** (3.4KB) - Informed consent template

#### Reference Documents (5/5 Complete) ✅
All located in `src/references/`:

1. ✅ **diagnostic-flowcharts.md** (12KB, 373 lines) - ABCD diagnostic trees A-D
2. ✅ **treatment-protocols.md** (18KB, 727 lines) - UC Davis GS-441524 protocols
3. ✅ **differential-diagnosis.md** (15KB, 689 lines) - Diseases to differentiate from FIP
4. ✅ **prevention-management.md** (11KB, 399 lines) - Prevention and multi-cat households
5. ✅ **refractory-cases.md** (21KB, 732 lines) - Managing treatment failures

#### Utility Scripts (4/5 Complete)
All located in `src/scripts/`:

1. ✅ **calculate-dose.js** (6.1KB, 150 lines) - GS-441524 dose calculator
2. ✅ **treatment-tracker.js** (7.4KB) - Patient monitoring and progress tracking
3. ✅ **cost-estimator.js** (7.2KB) - Treatment cost estimation
4. ✅ **constants.js** (2.3KB, 87 lines) - Shared constants for all scripts
5. ❌ **diagnostic-scorer.js** - NOT STARTED (planned for v2.3.0)

### 🎯 Remaining Work (v2.2.0 - v2.4.0)

**Summary:** 9 content items + infrastructure improvements

- **1 client template** (prognosis-discussion.md) 🟡 MEDIUM PRIORITY
- **5 enhanced reference documents** 🟡 MEDIUM PRIORITY
- **1 diagnostic utility script** (diagnostic-scorer.js) 🟡 MEDIUM PRIORITY
- **1 post-treatment template** (relapse-watch.md) 🟢 LOW PRIORITY
- **Integration tests** 🔴 HIGH PRIORITY (infrastructure)
- **API documentation** 🟢 LOW PRIORITY

---

## 📈 File Inventory (Verified 2025-11-16)

| Category | Complete | Total | Completion |
|----------|----------|-------|------------|
| **Client Templates** | 4 | 5 | 80% |
| **Reference Documents** | 5 | 10 | 50% |
| **Utility Scripts** | 4 | 5 | 80% |
| **Unit Tests** | 2 | 2 | 100% |
| **Integration Tests** | 0 | 4 | 0% |
| **API Documentation** | 0 | 4 | 0% |
| **Overall Content** | 13 | 24 | 54% |

---

## 🚀 Release Plan

### Version 2.1.1 - Repository Cleanup (In Progress)

**Target Date:** Current week
**Focus:** Repository restructuring and best practices

**Deliverables:**

1. ✅ Comprehensive cleanup plan (CLEANUP_PLAN.md)
2. ✅ Consolidated roadmap (this file)
3. ⏳ Archive old TODO.md
4. ⏳ Integration tests foundation
5. ⏳ Development tooling (Prettier, EditorConfig, Husky)
6. ⏳ Enhanced documentation (API docs, architecture.md, SECURITY.md)

**Success Criteria:**

- Single source of truth for project tracking
- Accurate file inventory
- Infrastructure improvements documented
- All tests passing

---

### Version 2.2.0 - Content Completion

**Target Date:** 3-4 weeks
**Focus:** Complete remaining client-facing and reference materials

**Deliverables:**

#### High Priority (Essential)

1. ❌ **prognosis-discussion.md** - Framework for discussing outcomes with clients
   - Location: `src/assets/templates/prognosis-discussion.md`
   - Size: ~4-5 KB
   - Content: Success rates, financial discussion, quality of life, difficult conversations

#### Medium Priority (Important)

2. ❌ **combination-therapy.md** - Multiple antiviral protocols and adjunctive treatments
   - Location: `src/references/combination-therapy.md`
   - Size: ~4-6 KB
   - Content: GS-441524 + Remdesivir, corticosteroids, immunomodulators, drug interactions

3. ❌ **pediatric-fip.md** - Special considerations for kittens <12 weeks old
   - Location: `src/references/pediatric-fip.md`
   - Size: ~3-5 KB
   - Content: Dosing adjustments, injection volumes, growth monitoring, litter management

4. ❌ **laboratory-reference.md** - Complete guide to interpreting lab results
   - Location: `src/references/laboratory-reference.md`
   - Size: ~6-8 KB
   - Content: CBC interpretation, chemistry panels, effusion analysis, monitoring trends

#### Low Priority (Nice to Have)

5. ❌ **relapse-watch.md** - Post-treatment monitoring guidance
   - Location: `src/assets/templates/relapse-watch.md`
   - Size: ~2-3 KB
   - Content: Signs of relapse, monitoring schedule, when to restart treatment

**Success Criteria:**

- All 5 files implemented with evidence citations
- Medical accuracy reviewed
- SKILL.md updated with references
- Tests passing, markdown lint clean
- Documentation updated

---

### Version 2.3.0 - Advanced Features & Testing

**Target Date:** 6-8 weeks
**Focus:** Advanced tooling and comprehensive testing

**Deliverables:**

1. ❌ **diagnostic-scorer.js** - Quantify FIP suspicion based on clinical findings
   - Location: `src/scripts/diagnostic-scorer.js`
   - Size: ~150-200 lines
   - Features: ABCD flowchart evidence weighting, probability scoring, tree recommendation
   - Testing: Unit tests required in `tests/unit/diagnostic-scorer.test.js`

2. ❌ **Integration Tests** - End-to-end workflow testing
   - Location: `tests/integration/`
   - Files:
     - `skill-loading.test.js` - Test SKILL.md loads correctly
     - `workflow.test.js` - Test diagnostic and treatment workflows
     - `scripts-integration.test.js` - Test all scripts work together
     - `fixtures/sample-cases.json` - Test data
   - Coverage: All diagnostic trees (A, B, C, D), dose calculation, tracking, cost estimation

3. ❌ **API Documentation** - Generated from JSDoc comments
   - Location: `docs/api/`
   - Files:
     - `calculate-dose.md`
     - `treatment-tracker.md`
     - `cost-estimator.md`
     - `diagnostic-scorer.md`
   - Auto-generated from JSDoc using jsdoc-to-markdown

**Success Criteria:**

- Diagnostic scorer implemented and tested
- Integration tests covering all workflows
- Test coverage >60% overall, >80% for scripts
- API documentation complete
- Full skill validation passing

---

### Version 2.4.0 - Polish & Optional Content (Future)

**Target Date:** 10-12 weeks
**Focus:** Professional polish and optional advanced content

**Deliverables:**

1. ❌ **case-studies.md** - Real-world treatment examples
   - Location: `src/references/case-studies.md`
   - Size: ~8-10 KB
   - Content: 5-10 detailed cases with outcomes, lessons learned
   - **Important:** Ensure client consent and anonymization

2. ❌ **drug-sources.md** - Regional availability and quality considerations
   - Location: `src/references/drug-sources.md`
   - Size: ~3-4 KB
   - Content: Legal status overview, compounding pharmacies, quality considerations
   - **Caution:** Sensitive content - focus on education, not sourcing recommendations

3. ❌ **docs/architecture.md** - System design and technical overview
   - Size: ~4-6 KB
   - Content: Repository structure, build process, skill format, design decisions

4. Final polish and optimization
   - Code review and refactoring
   - Performance optimization
   - Documentation review
   - User experience improvements

---

## 📋 Detailed Content Requirements

### Missing Client Template

#### prognosis-discussion.md 🟡 MEDIUM PRIORITY

**Purpose:** Framework for discussing outcomes and expectations with clients

**Location:** `src/assets/templates/prognosis-discussion.md`
**Target Size:** 4-5 KB
**Audience:** Veterinarians communicating with cat owners

**Required Sections:**

1. **Realistic Success Rates**
   - 85%+ for wet FIP (effusive)
   - 60-70% for neurological FIP
   - 70-80% for ocular FIP
   - Factors affecting outcomes

2. **Treatment Duration Expectations**
   - Minimum 12 weeks (84 days)
   - Possible extensions for neurological/ocular
   - Monitoring requirements
   - Timeline for improvement

3. **Financial Investment**
   - Cost range discussion points
   - Payment plan considerations
   - Insurance coverage (if applicable)
   - Budget planning tools

4. **Quality of Life Considerations**
   - Daily injection burden
   - Side effects management
   - Activity restrictions
   - Family impact

5. **Decision-Making Framework**
   - Is treatment right for this cat?
   - Is treatment feasible for this family?
   - When to reconsider
   - Alternative options

6. **Difficult Conversations**
   - When treatment isn't working
   - When euthanasia may be appropriate
   - Supporting grieving clients
   - Sample scripts

**Evidence Base:**
- ABCD Guidelines 2024 (prognosis data)
- Published outcome studies
- UC Davis treatment success rates

**Tone:** Evidence-based, compassionate, realistic

---

### Missing Reference Documents

#### combination-therapy.md 🟡 MEDIUM PRIORITY

**Purpose:** Multiple antiviral protocols and adjunctive treatments

**Location:** `src/references/combination-therapy.md`
**Target Size:** 4-6 KB

**Required Sections:**

1. **Antiviral Combinations**
   - GS-441524 + Remdesivir protocols
   - When to consider combination therapy
   - Dosing for each agent
   - Evidence quality

2. **Corticosteroid Use**
   - Indications (severe inflammation, neurological FIP)
   - Prednisolone dosing protocols
   - When to taper
   - Risks vs. benefits

3. **Immunomodulators**
   - Polyprenyl Immunostimulant (PI)
   - Mechanism and rationale
   - Dosing and administration
   - Limited evidence base

4. **Supportive Care**
   - Appetite stimulants
   - Anti-nausea medications
   - Pain management
   - Nutrition support

5. **Drug Interactions**
   - Medications to avoid
   - Timing considerations
   - Monitoring requirements

6. **Evidence Quality Markers**
   - ⭐⭐⭐ Well-established (GS-441524 monotherapy)
   - ⭐⭐ Moderate evidence (corticosteroids in neuro FIP)
   - ⭐ Limited evidence (immunomodulators)
   - ❓ Experimental (novel combinations)

**Caution:** Clearly distinguish experimental vs. established therapies

---

#### pediatric-fip.md 🟡 MEDIUM PRIORITY

**Purpose:** Special considerations for kittens <12 weeks old

**Location:** `src/references/pediatric-fip.md`
**Target Size:** 3-5 KB

**Required Sections:**

1. **Unique Challenges**
   - Small body size and injection volumes
   - Rapid growth during treatment
   - Limited venous access
   - Diagnostic challenges

2. **Dosing Adjustments**
   - Weight-based dosing considerations
   - Concentration selection for small volumes
   - Injection site rotation in tiny kittens
   - Frequency considerations

3. **Injection Volume Considerations**
   - Maximum subcutaneous volume per site
   - Multiple site protocols
   - Dilution strategies
   - Concentration optimization

4. **Growth Monitoring**
   - Weekly weight checks
   - Dose adjustments for growth
   - Expected weight gain curves
   - When growth is abnormal

5. **Diagnostic Challenges**
   - Maternal antibody interference
   - Testing timeline considerations
   - Clinical diagnosis emphasis
   - Rivalta test reliability

6. **Litter Management**
   - Preventing spread to littermates
   - Isolation protocols
   - Environmental decontamination
   - When to test other kittens

7. **Prognosis Differences**
   - Success rates in young kittens
   - Neurological involvement more common
   - Failure to thrive concerns

8. **Queen/Cattery Considerations**
   - Breeding decisions
   - Genetic factors
   - Cattery management
   - Future litter planning

**Evidence Base:** Limited - explicitly note where data is sparse

---

#### laboratory-reference.md 🟡 MEDIUM PRIORITY

**Purpose:** Complete guide to interpreting lab results in FIP

**Location:** `src/references/laboratory-reference.md`
**Target Size:** 6-8 KB

**Required Sections:**

1. **Complete Blood Count (CBC)**
   - **Anemia patterns:** Non-regenerative anemia common
   - **Lymphopenia:** Significant finding (absolute lymphocyte count <1500/μL)
   - **Neutrophil changes:** Left shift, toxic changes
   - **Thrombocytopenia:** May be present
   - **Reference ranges and FIP-specific patterns**

2. **Chemistry Panel**
   - **Globulin elevation:** Total protein >7.8 g/dL, globulin >5.1 g/dL
   - **Albumin:Globulin (A:G) ratio:** <0.8 highly suspicious, <0.6 very suspicious
   - **Bilirubin patterns:** Hyperbilirubinemia in wet FIP
   - **Liver enzymes:** ALT, ALP elevation patterns
   - **Kidney values:** BUN, creatinine in renal involvement

3. **Effusion Analysis** (Wet FIP)
   - **Rivalta test:** Procedure and interpretation (positive = FIP likely)
   - **Protein content:** Typically >3.5 g/dL
   - **Cell count and differential:** Low cellularity, predominantly neutrophils
   - **PCR testing on fluid:** Sensitivity and specificity considerations
   - **Visual appearance:** Straw-colored, viscous, clots on standing

4. **Advanced Testing**
   - **Immunofluorescence (IF):** Requires biopsy, highly specific
   - **Immunohistochemistry (IHC):** Gold standard, requires tissue
   - **PCR interpretation:** False positives/negatives, viral load significance
   - **Serology:** Limited utility, cannot distinguish FCoV from FIPV

5. **Monitoring Bloodwork Trends During Treatment**
   - **Response indicators:**
     - Decreasing globulin
     - Increasing A:G ratio
     - Resolving anemia
     - Normalizing lymphocyte count
   - **Warning signs:**
     - Persistent lymphopenia after 2 weeks
     - Rising bilirubin despite treatment
     - Worsening anemia
   - **When to adjust treatment:** Dose escalation triggers

6. **Laboratory Decision Trees**
   - Initial diagnostic workup flowchart
   - Monitoring frequency guidelines
   - Treatment adjustment decision points

**Format:** Reference tables, normal ranges, decision trees, interpretation guides

---

### Missing Utility Script

#### diagnostic-scorer.js 🟡 MEDIUM PRIORITY

**Purpose:** Quantify FIP suspicion based on clinical findings using ABCD Guidelines weighting

**Location:** `src/scripts/diagnostic-scorer.js`
**Target Size:** 150-200 lines

**Functionality:**

```javascript
/**
 * Calculate FIP probability score based on weighted evidence from ABCD flowcharts
 *
 * @param {Object} findings - Clinical and laboratory findings
 * @param {boolean} findings.effusion - Presence of effusion (wet FIP)
 * @param {number} findings.agRatio - Albumin:Globulin ratio (if available)
 * @param {number} findings.globulin - Globulin level in g/dL (if available)
 * @param {boolean} findings.rivalta - Rivalta test result (if effusion present)
 * @param {boolean} findings.lymphopenia - Lymphopenia present (<1500/μL)
 * @param {string} findings.neurologicalSigns - None/mild/severe
 * @param {string} findings.ocularSigns - None/uveitis/other
 * @param {number} findings.age - Age in months
 * @param {boolean} findings.fever - Non-responsive fever
 * @returns {Object} score, probability, recommendedTree, nextSteps
 */
export function calculateDiagnosticScore(findings) {
  // Implementation
}

/**
 * Determine which ABCD diagnostic tree to follow
 * @param {Object} findings
 * @returns {string} Tree A, B, C, or D
 */
export function recommendDiagnosticTree(findings) {
  // Implementation
}

/**
 * Suggest next diagnostic steps based on current findings
 * @param {Object} findings
 * @param {number} currentScore
 * @returns {Array<string>} Recommended next steps
 */
export function suggestNextSteps(findings, currentScore) {
  // Implementation
}
```

**Features:**

1. **Evidence Weighting** (based on ABCD Guidelines)
   - Strong positive evidence (+3): Effusion with positive Rivalta, A:G <0.6
   - Moderate positive (+2): A:G 0.6-0.8, hyperglobulinemia >5.1 g/dL
   - Mild positive (+1): Lymphopenia, fever, young age, ocular signs
   - Weak positive (+0.5): Neurological signs without other findings
   - Negative evidence (-1): Normal A:G ratio >1.0, normal globulin

2. **Probability Categories**
   - Low suspicion: Score 0-3
   - Moderate suspicion: Score 4-7
   - High suspicion: Score 8-12
   - Very high suspicion: Score >12

3. **Tree Recommendation Logic**
   - Tree A: Effusion present
   - Tree B: Dry FIP suspected (no effusion, systemic signs)
   - Tree C: Neurological signs predominate
   - Tree D: Ocular signs predominate

4. **Output Format**
   ```javascript
   {
     score: 9,
     probability: "high",
     recommendedTree: "A",
     confidence: "moderate",
     nextSteps: [
       "Perform Rivalta test on effusion",
       "Analyze effusion protein content and cytology",
       "Consider PCR on effusion fluid",
       "Evaluate A:G ratio if not already done"
     ],
     warnings: [
       "PCR alone cannot diagnose FIP - interpret in clinical context"
     ]
   }
   ```

**Testing Requirements:**
- Unit tests in `tests/unit/diagnostic-scorer.test.js`
- Test all diagnostic trees (A, B, C, D)
- Test edge cases (minimal findings, maximal findings)
- Test probability thresholds
- Validate against known FIP cases

---

### Missing Post-Treatment Template

#### relapse-watch.md 🟢 LOW PRIORITY

**Purpose:** Post-treatment monitoring guidance for preventing and detecting relapse

**Location:** `src/assets/templates/relapse-watch.md`
**Target Size:** 2-3 KB

**Required Sections:**

1. **Signs of Relapse to Watch For**
   - Return of fever
   - Decreased appetite
   - Lethargy
   - Re-accumulation of effusion
   - Neurological or ocular signs returning

2. **Monitoring Schedule After Treatment Ends**
   - Weekly for first month
   - Monthly for 3 months
   - Every 3 months for first year
   - Annual thereafter

3. **Bloodwork Timeline**
   - 1 month post-treatment: CBC, chemistry
   - 3 months post-treatment: Repeat labs
   - 6 months: Full panel
   - 12 months: Annual check

4. **When to Restart Treatment**
   - Clinical relapse criteria
   - Laboratory relapse indicators
   - How quickly to act
   - Duration of retreatment

5. **Lifetime Considerations**
   - FIP survivors may have chronic changes
   - Monitoring for late complications
   - Quality of life in survivors
   - Life expectancy data

6. **Multi-Cat Household Precautions**
   - Coronavirus shedding post-recovery
   - Introducing new cats
   - Environmental management
   - Monitoring other cats

7. **Client Checklist**
   - Daily observations
   - Weekly weight checks
   - Temperature monitoring (if indicated)
   - When to call immediately

---

## 🎯 Implementation Workflow

### For Each Content File

1. **Research Phase**
   - Review evidence sources (ABCD Guidelines, UC Davis research, peer-reviewed literature)
   - Gather citations and references
   - Review existing related content
   - Outline content structure

2. **Creation Phase**
   - Write content following existing template patterns
   - Include all required sections (see detailed requirements above)
   - Add evidence citations throughout
   - Follow markdown style guide (.markdownlint.json)
   - Include appropriate disclaimers

3. **Integration Phase**
   - Link from SKILL.md in relevant sections (if applicable)
   - Add to package.json `files` array (if new directory)
   - Update cross-references in related documents
   - Add to this ROADMAP.md completion tracking

4. **Validation Phase**
   - Run `npm run validate` - Comprehensive validation checks
   - Run `npm run lint` - Markdown linting
   - Run `npm test` - All tests must pass
   - Fix any issues identified

5. **Documentation Phase**
   - Update CHANGELOG.md with additions
   - Update README.md feature list (if applicable)
   - Update this ROADMAP.md status
   - Update completion percentages

---

## 📏 Quality Standards

### All Content Must Have

- [ ] **Evidence citations** from peer-reviewed sources or authoritative guidelines
- [ ] **Medical accuracy** verification (ideally by DVM)
- [ ] **Appropriate disclaimers** (educational purposes, not medical advice)
- [ ] **Client-friendly language** (if client-facing template)
- [ ] **Markdown lint passing** (npm run lint)
- [ ] **File size reasonable** (<10KB for references, <5KB for templates)
- [ ] **Linked from SKILL.md** (if applicable to workflows)
- [ ] **Added to package.json** files array (if new directory)
- [ ] **Consistent formatting** with existing files

### All Scripts Must Have

- [ ] **JSDoc comments** with @param, @returns, @throws, @example
- [ ] **Input validation** for all parameters
- [ ] **Error handling** with meaningful error messages
- [ ] **Unit tests** with >80% code coverage
- [ ] **Clear function signatures** with TypeScript-style JSDoc types
- [ ] **Usage examples** in comments or separate examples file
- [ ] **Constants** extracted to constants.js where appropriate
- [ ] **Export functions** properly for testing and reuse

---

## 📊 Progress Tracking

### Current Sprint: Repository Cleanup (Week of 2025-11-16)

- [x] Comprehensive repository analysis
- [x] Create CLEANUP_PLAN.md
- [x] Audit TODO.md vs actual files
- [x] Create consolidated ROADMAP.md
- [x] Archive TODO.md to docs/archive/
- [x] Update cross-references in documentation
- [ ] Begin infrastructure improvements (Prettier, EditorConfig, etc.)
- [ ] Release v2.1.1

### Next Sprint: Content Completion (Weeks 2-4)

**Goal:** Complete v2.2.0 content deliverables

- [ ] prognosis-discussion.md (HIGH PRIORITY)
- [ ] combination-therapy.md
- [ ] pediatric-fip.md
- [ ] laboratory-reference.md
- [ ] relapse-watch.md
- [ ] Update SKILL.md with new references
- [ ] Full validation and testing
- [ ] Release v2.2.0

### Future Sprint: Advanced Features (Weeks 5-8)

**Goal:** Complete v2.3.0 with tooling and testing

- [ ] Implement diagnostic-scorer.js
- [ ] Create integration test suite
- [ ] Generate API documentation
- [ ] Add docs/architecture.md
- [ ] Achieve >60% test coverage
- [ ] Release v2.3.0

### Long-term: Polish & Optional Content (Weeks 9-12)

**Goal:** Complete v2.4.0 with polish

- [ ] case-studies.md (with client consent)
- [ ] drug-sources.md (with appropriate disclaimers)
- [ ] Final code review and refactoring
- [ ] Performance optimization
- [ ] Documentation review
- [ ] Release v2.4.0

---

## 🔗 References & Resources

### Evidence Base
- **ABCD FIP Guidelines 2024:** `docs/reference/icatcare_fipupdate_july25.pdf`
- **Existing References:** `src/references/*.md` (5 files)
- **UC Davis Protocols:** Embedded in treatment-protocols.md

### Templates for New Content
- **Client template format:** `src/assets/templates/fip-explained.md`
- **Reference format:** `src/references/treatment-protocols.md`
- **Script format:** `src/scripts/calculate-dose.js`

### Development Resources
- **Contributing Guide:** `CONTRIBUTING.md`
- **Cleanup Plan:** `CLEANUP_PLAN.md`
- **Build Configuration:** `package.json`
- **Validation Script:** `scripts/validate.js`
- **Archive:** `docs/archive/IMPROVEMENT_PLAN.md` (historical context)
- **Archive:** `docs/archive/TODO_v2.1.0.md` (replaced by this document)

### Documentation Standards
- **Markdown Linting:** `.markdownlint.json` (line length 180, ATX headings)
- **Line Endings:** LF (Unix-style)
- **Encoding:** UTF-8
- **Style Guide:** Follow existing file patterns

---

## 📞 Questions or Issues?

### For Content Issues
- **Medical accuracy questions:** Open issue with `content` label
- **Evidence citation questions:** Reference ABCD Guidelines or UC Davis research
- **Client language review:** Test with non-veterinary readers

### For Development Issues
- **Build failures:** Check `npm run validate` and `npm run lint`
- **Test failures:** Run `npm test` with verbose output
- **Feature requests:** Open issue with `feature` label
- **Bug reports:** Use bug report template in `.github/ISSUE_TEMPLATE/`

### For Contribution
- **How to contribute:** See `CONTRIBUTING.md`
- **Code review:** All PRs require review
- **CI/CD pipeline:** GitHub Actions must pass
- **Pre-commit:** Run validation and linting locally before pushing

---

## 📈 Success Metrics

### v2.2.0 Success Criteria
- [ ] 100% of planned content files implemented (5 files)
- [ ] All files have evidence citations
- [ ] Medical accuracy reviewed
- [ ] Markdown lint: 0 errors, 0 warnings
- [ ] Validation: All checks passing
- [ ] Tests: All passing (unit tests)
- [ ] Documentation: README, CHANGELOG updated
- [ ] Release: Tagged and published

### v2.3.0 Success Criteria
- [ ] diagnostic-scorer.js implemented and tested
- [ ] Integration tests: 4 test files, 20+ test cases
- [ ] Test coverage: >60% overall, >80% for src/scripts/
- [ ] API documentation: Auto-generated for all 5 scripts
- [ ] CI/CD: All workflows passing
- [ ] Release: Tagged and published

### v2.4.0 Success Criteria
- [ ] All optional content complete
- [ ] Code quality: >80% test coverage
- [ ] Documentation: Complete and accurate
- [ ] Performance: Build <5s, tests <10s
- [ ] Polish: No TODOs, no placeholders
- [ ] Release: Production-ready

---

## 🗂️ Archive Notice

**This document replaces:**
- `TODO.md` (archived to `docs/archive/TODO_v2.1.0.md`)
- Previous `ROADMAP.md` (content merged into this file)

**Rationale for consolidation:**
- Eliminates redundancy between TODO.md and ROADMAP.md
- Provides single source of truth for project status
- Reduces maintenance burden (one file to update)
- Improves accuracy (verified against actual repository state)
- Better organization (clear sections for completed vs. remaining work)

**Last verified:** 2025-11-16 - All file counts and statuses confirmed against actual repository

---

**Version:** 2.1.0 → 2.4.0
**Last Updated:** 2025-11-16
**Last Verified:** 2025-11-16
**Maintainer:** @ggwazi
**Status:** 🟢 Active Development
**Completion:** 54% (13/24 content items)
