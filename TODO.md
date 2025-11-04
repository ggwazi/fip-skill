# TODO: Missing Files for FIP Veterinary Advisor Skill

> **Last Updated:** 2024-11-04  
> **Version:** 2.1.0  
> **Status:** In Development

This document tracks missing files and features identified in the
[IMPROVEMENT_PLAN.md](IMPROVEMENT_PLAN.md) that need to be implemented
to complete the FIP Veterinary Advisor skill repository.

---

## 📊 Overview

**Total Missing Items:** 14  
**Priority Files:** 10  
**Nice-to-Have:** 4

### Current State

- ✅ Core infrastructure (package.json, build system, GitHub Actions)
- ✅ 4 reference documents
- ✅ 2 client templates
- ✅ 3 utility scripts (dose calculator, treatment tracker, cost estimator)
- ✅ Basic testing framework
- ❌ Missing 4 client education templates
- ❌ Missing 6 enhanced reference documents
- ❌ Missing 1 diagnostic utility script
- ❌ Missing integration tests
- ❌ Missing API documentation

---

## 🎯 Priority 1: Client Education Templates

**Location:** `src/assets/templates/`  
**Purpose:** Pre-written materials for client communication  
**Referenced in:** IMPROVEMENT_PLAN.md Phase 2.5

### Missing Templates

#### 1. `home-care-guide.md` 🔴 HIGH PRIORITY

**Purpose:** Step-by-step injection instructions for clients administering GS-441524 at home

**Should Include:**

- Injection site selection and rotation
- Proper injection technique (subcutaneous)
- Storage and handling of GS-441524
- Safety precautions
- What to do if you miss a dose
- When to call the veterinarian
- Common side effects and reactions
- Video/diagram references

**Target Size:** 3-4 KB  
**Evidence Base:** UC Davis protocols, veterinary nursing standards

---

#### 2. `fip-explained.md` 🟡 MEDIUM PRIORITY

**Purpose:** FIP basics explained in client-friendly language

**Should Include:**

- What is FIP? (simplified pathophysiology)
- How cats get FIP (coronavirus mutation)
- Why FIP is serious (historical lethality)
- How FIP is diagnosed (testing overview)
- Modern treatment options (GS-441524)
- Success rates and prognosis
- Common misconceptions debunked
- Resources for more information

**Target Size:** 3-5 KB  
**Tone:** Compassionate, clear, non-technical

---

#### 3. `prognosis-discussion.md` 🟡 MEDIUM PRIORITY

**Purpose:** Framework for discussing outcomes and expectations with clients

**Should Include:**

- Realistic success rates (85%+ for wet FIP, lower for neurological)
- Factors affecting prognosis (disease form, age, timing)
- Treatment duration expectations (12+ weeks)
- Financial investment discussion points
- Quality of life considerations
- Decision-making framework
- When euthanasia may be appropriate
- Scripts for difficult conversations

**Target Size:** 4-5 KB  
**Approach:** Evidence-based but empathetic

---

#### 4. `relapse-watch.md` 🟢 LOW PRIORITY

**Purpose:** Post-treatment monitoring guidance for preventing and detecting relapse

**Should Include:**

- Signs of relapse to watch for
- Monitoring schedule after treatment ends
- Bloodwork timeline (3, 6, 12 months)
- When to restart treatment
- Lifetime considerations for FIP survivors
- Multi-cat household precautions
- Quality of life markers
- Client checklist for home monitoring

**Target Size:** 2-3 KB  
**Timeline:** Post-treatment (84+ days)

---

## 📚 Priority 2: Enhanced Reference Documents

**Location:** `src/references/`  
**Purpose:** Advanced veterinary guidance for complex cases  
**Referenced in:** IMPROVEMENT_PLAN.md Phase 2.6

### Missing Reference Documents

#### 5. `refractory-cases.md` 🔴 HIGH PRIORITY

**Purpose:** Managing treatment failures and non-responders

**Should Include:**

- Definition of treatment failure (lack of response after 2-4 weeks)
- Reasons for treatment failure (dosing, drug quality, diagnosis error)
- Dose escalation protocols
- Alternative/adjunctive therapies
- Switching between oral and injectable forms
- Managing concurrent conditions
- When to consider euthanasia
- Case examples with outcomes
- Troubleshooting flowchart

**Target Size:** 5-7 KB  
**Evidence Base:** UC Davis research, published case series

---

#### 6. `combination-therapy.md` 🟡 MEDIUM PRIORITY

**Purpose:** Multiple antiviral protocols and adjunctive treatments

**Should Include:**

- GS-441524 + Remdesivir protocols
- Corticosteroid use (when/why/how much)
- Immunomodulators (Polyprenyl Immunostimulant)
- Supportive care medications
- Pain management
- Nutrition support
- Drug interactions to avoid
- Timing and sequencing of therapies
- Evidence quality for each approach

**Target Size:** 4-6 KB  
**Caution:** Clearly mark experimental vs. established therapies

---

#### 7. `pediatric-fip.md` 🟡 MEDIUM PRIORITY

**Purpose:** Special considerations for kittens <12 weeks old

**Should Include:**

- Unique challenges in neonatal/pediatric FIP
- Dosing adjustments for small size
- Injection volume considerations
- Growth monitoring during treatment
- Maternal antibody interference with testing
- Litter management (preventing spread)
- Prognosis differences in young kittens
- Case examples
- Queen/cattery considerations

**Target Size:** 3-5 KB  
**Evidence Base:** Limited - note where data is sparse

---

#### 8. `case-studies.md` 🟢 LOW PRIORITY

**Purpose:** Real-world treatment examples and learning cases

**Should Include:**

- 5-10 detailed case studies
- Each case: signalment, presentation, diagnostics, treatment, outcome
- Mix of success and failure cases
- Different disease forms represented
- Lessons learned from each case
- Decision points and reasoning
- Client communication highlights
- Cost examples (anonymized)

**Target Size:** 8-10 KB  
**Format:** Structured case presentations

**Note:** Ensure client consent and anonymization

---

#### 9. `drug-sources.md` 🟢 LOW PRIORITY

**Purpose:** Availability of GS-441524 by region

**Should Include:**

- Legal status overview (varies by country)
- Compounding pharmacies (where legal)
- Research suppliers
- Quality considerations
- Cost comparisons by source
- Import considerations
- Legal disclaimers (veterinarian responsibility)
- Quality testing recommendations
- Red flags for poor quality product

**Target Size:** 3-4 KB  
**Important:** Include strong legal and quality disclaimers

**Caution:** This is sensitive content - focus on education, not sourcing recommendations

---

#### 10. `laboratory-reference.md` 🟡 MEDIUM PRIORITY

**Purpose:** Complete guide to interpreting lab results in FIP

**Should Include:**

- Complete blood count (CBC) interpretation
  - Anemia patterns in FIP
  - Lymphopenia significance
  - Neutrophil changes
- Chemistry panel interpretation
  - Globulin elevation (quantify)
  - Albumin:Globulin (A:G) ratio
  - Bilirubin patterns
  - Liver enzyme patterns
- Effusion analysis
  - Rivalta test procedure and interpretation
  - Cell count and differential
  - Protein content
  - PCR testing on fluid
- Advanced testing
  - Immunofluorescence
  - Immunohistochemistry
  - PCR interpretation (false positives/negatives)
- Monitoring bloodwork trends
  - Response indicators
  - Warning signs
  - When to adjust treatment

**Target Size:** 6-8 KB  
**Format:** Reference tables, decision trees

---

## 🔧 Priority 3: Utility Scripts

**Location:** `src/scripts/`  
**Purpose:** Automated tools for calculations and tracking  
**Referenced in:** IMPROVEMENT_PLAN.md Phase 2.4

### Missing Script

#### 11. `diagnostic-scorer.js` 🟡 MEDIUM PRIORITY

**Purpose:** Quantify FIP suspicion based on clinical findings

**Functionality:**

```javascript
/**
 * Calculate FIP probability score based on weighted evidence
 * 
 * @param {Object} findings - Clinical and laboratory findings
 * @param {boolean} findings.effusion - Presence of effusion
 * @param {number} findings.agRatio - Albumin:Globulin ratio
 * @param {number} findings.globulin - Globulin level (g/dL)
 * @param {boolean} findings.rivalta - Rivalta test result
 * @param {boolean} findings.lymphopenia - Lymphopenia present
 * @param {string} findings.neurologicalSigns - None/mild/severe
 * @param {string} findings.ocularSigns - None/uveitis/other
 * @returns {Object} Score and recommended diagnostic tree
 */
```

**Features:**

- Implement +/- evidence weighting from ABCD flowcharts
- Calculate cumulative diagnostic score
- Recommend which diagnostic tree to follow (A, B, C, or D)
- Suggest next diagnostic steps
- Output probability categories (low/moderate/high suspicion)
- Export results for documentation

**Target Size:** 150-200 lines  
**Testing:** Unit tests required (see test file needed below)

---

## 🧪 Priority 4: Testing Infrastructure

**Location:** `tests/`  
**Purpose:** Ensure code quality and prevent regressions  
**Referenced in:** IMPROVEMENT_PLAN.md Phase 4.2

### Missing Test Infrastructure

#### 12. `tests/integration/` directory 🟡 MEDIUM PRIORITY

**Purpose:** End-to-end testing of skill workflows

**Needed Files:**

- `tests/integration/skill-loading.test.js` - Test skill can be loaded and parsed
- `tests/integration/workflow.test.js` - Test diagnostic and treatment workflows
- `tests/integration/scripts.test.js` - Test all utility scripts work together
- `tests/fixtures/sample-cases.json` - Test data for integration tests

**Test Scenarios:**

1. **Skill Loading**
   - SKILL.md loads successfully
   - All references are accessible
   - Scripts can be executed
   - Templates can be read

2. **Diagnostic Workflow**
   - Tree A (effusion present)
   - Tree B (dry FIP)
   - Tree C (neurological)
   - Tree D (ocular)

3. **Treatment Workflow**
   - Dose calculation
   - Cost estimation
   - Treatment tracking
   - Monitoring schedule

4. **Script Integration**
   - calculate-dose.js produces valid output
   - treatment-tracker.js accepts input
   - cost-estimator.js generates estimates
   - diagnostic-scorer.js (when implemented) scores correctly

**Target:** 5 integration test files, 20+ test cases

---

## 📖 Priority 5: Documentation

**Location:** `docs/`  
**Purpose:** Developer and user documentation  
**Referenced in:** IMPROVEMENT_PLAN.md Phase 5

### Missing Documentation

#### 13. `docs/api/` directory 🟢 LOW PRIORITY

**Purpose:** API documentation for utility scripts

**Needed Files:**

- `docs/api/calculate-dose.md` - Dose calculator API
- `docs/api/treatment-tracker.md` - Treatment tracker API
- `docs/api/cost-estimator.md` - Cost estimator API
- `docs/api/diagnostic-scorer.md` - Diagnostic scorer API (when implemented)

**Format:**

- Function signatures
- Parameter descriptions
- Return values
- Examples
- Edge cases
- Error handling

**Generation:** Consider auto-generating from JSDoc comments

---

#### 14. `docs/architecture.md` 🟢 LOW PRIORITY

**Purpose:** System design and technical overview

**Should Include:**

- Repository structure explanation
- Build process overview
- Skill file format
- Reference loading mechanism
- Script execution model
- Testing strategy
- CI/CD pipeline
- Release process
- Design decisions and rationale
- Future architecture considerations

**Target Size:** 4-6 KB  
**Audience:** Developers and contributors

---

## 📋 Implementation Plan

### Phase 1: High Priority Files (Week 1-2)

1. ✅ Create TODO.md (this file)
2. 🔲 `home-care-guide.md` - Most needed by clients
3. 🔲 `refractory-cases.md` - Critical for treatment failures

### Phase 2: Medium Priority Files (Week 3-4)

- 🔲 `fip-explained.md` - Client education
- 🔲 `prognosis-discussion.md` - Communication framework
- 🔲 `combination-therapy.md` - Advanced protocols
- 🔲 `pediatric-fip.md` - Special populations
- 🔲 `laboratory-reference.md` - Diagnostic interpretation
- 🔲 `diagnostic-scorer.js` - Utility script
- 🔲 `tests/integration/` - Testing infrastructure

### Phase 3: Low Priority Files (Week 5-6)

- 🔲 `relapse-watch.md` - Post-treatment monitoring
- 🔲 `case-studies.md` - Learning cases
- 🔲 `drug-sources.md` - Sensitive content, needs careful review
- 🔲 `docs/api/` - Developer documentation
- 🔲 `docs/architecture.md` - Technical overview

### Phase 4: Integration (Week 7)

- Link new files from SKILL.md
- Update build scripts if needed
- Add new files to package.json `files` array
- Create/update tests
- Run full validation
- Update CHANGELOG.md

### Phase 5: Release (Week 8)

- Final testing
- Documentation review
- Release v2.2.0

---

## 📝 File Creation Guidelines

### Evidence Requirements

All medical content must cite sources:

- ABCD Guidelines (2024)
- UC Davis research
- Peer-reviewed publications
- Published case series

### File Structure Template

```markdown
# [Title]

> **Purpose:** [Brief description]  
> **Audience:** [Veterinarians/Clients/Both]  
> **Evidence Base:** [Primary sources]

## Overview
[Introduction and context]

## [Section 1]
[Content]

## [Section 2]
[Content]

## References
[Citations]
```

### Quality Checklist

- [ ] Evidence citations included
- [ ] Medical accuracy reviewed
- [ ] Appropriate disclaimers
- [ ] Client-friendly language (if applicable)
- [ ] Markdown lint passing
- [ ] File size reasonable (<10KB for references)
- [ ] Linked from SKILL.md (if applicable)
- [ ] Added to package.json files array

---

## 🔗 Cross-References

### Files That Need Updates After Implementation

**SKILL.md** - Add references to new documents:

- Link to home-care-guide.md in treatment section
- Link to refractory-cases.md in troubleshooting
- Link to pediatric-fip.md in special considerations
- Link to diagnostic-scorer.js in diagnostic workflows

**package.json** - Add to `files` array:

```json
"files": [
  "src/SKILL.md",
  "src/references/",
  "src/scripts/",
  "src/assets/templates/"
]
```

**README.md** - Update feature list to reflect new capabilities

**CHANGELOG.md** - Document additions in version 2.2.0

---

## 🎯 Success Criteria

### Completion Metrics

- ✅ All 14 missing items implemented
- ✅ All tests passing
- ✅ Markdown lint clean
- ✅ Build successful
- ✅ Documentation complete
- ✅ Evidence citations verified

### Quality Metrics

- Medical accuracy reviewed by veterinarian(s)
- Client materials tested for clarity
- Scripts tested with real-world data
- Integration tests cover all workflows
- API documentation complete

---

## 📞 Contributing

To help implement these missing files:

1. **Choose a file** from the list above
2. **Review the guidelines** in this document
3. **Check the evidence base** (ABCD Guidelines, UC Davis)
4. **Create the file** following the template
5. **Add tests** if applicable
6. **Update cross-references** (SKILL.md, etc.)
7. **Submit a PR** with your contribution

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

---

## 📚 Resources

### Evidence Sources

- ABCD FIP Guidelines 2024: `docs/reference/icatcare_fipupdate_july25.pdf`
- Existing references: `src/references/*.md`
- UC Davis protocols: Embedded in treatment-protocols.md

### Templates

- Existing client templates: `src/assets/templates/treatment-consent.md`, `monitoring-schedule.md`
- Existing reference format: `src/references/treatment-protocols.md`

### Development

- IMPROVEMENT_PLAN.md - Original roadmap
- package.json - Build configuration
- scripts/validate.js - Validation requirements

---

**Note:** This is a living document. Update status as files are implemented.

**Maintainer:** @ggwazi  
**Last Review:** 2024-11-04  
**Next Review:** When v2.2.0 development begins
