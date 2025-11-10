# FIP Veterinary Advisor Skill - Development Roadmap

> **Last Updated:** 2024-11-04
> **Current Version:** 2.1.0
> **Target Version:** 2.3.0
> **Status:** Active Development

This roadmap outlines the development plan for completing the FIP Veterinary Advisor skill. The repository infrastructure is complete (v2.1.0) - focus is now on **content completion**.

---

## 📊 Current Status

### ✅ Completed (v2.1.0)

- Core infrastructure (package.json, build system)
- GitHub Actions CI/CD workflows
- Testing framework (unit tests)
- 4 reference documents (diagnostic flowcharts, treatment protocols, differential diagnosis, prevention)
- 3 utility scripts (dose calculator, treatment tracker, cost estimator)
- 2 client templates (treatment consent, monitoring schedule)
- Comprehensive documentation (installation, extending, contributing)
- Build and release automation

### 🎯 To Complete (v2.2.0 - v2.3.0)

- **4 client education templates** 🔴 HIGH PRIORITY
- **6 enhanced reference documents** 🟡 MEDIUM PRIORITY
- **1 diagnostic utility script** 🟡 MEDIUM PRIORITY
- **Integration tests** 🟡 MEDIUM PRIORITY
- **API documentation** 🟢 LOW PRIORITY

---

## 🚀 Release Plan

### Version 2.2.0 - Client Education Focus

**Target Date:** 2-3 weeks
**Focus:** Essential client-facing materials

**Deliverables:**

1. ✅ home-care-guide.md - Injection instructions for clients
2. ✅ fip-explained.md - FIP basics in client-friendly language
3. prognosis-discussion.md - Framework for discussing outcomes
4. refractory-cases.md - Managing treatment failures (veterinary focus)

**Success Criteria:**

- All 4 files implemented with evidence citations
- Templates tested for clarity and completeness
- SKILL.md updated with references
- Tests passing, markdown lint clean

---

### Version 2.3.0 - Advanced Veterinary Guidance

**Target Date:** 4-6 weeks
**Focus:** Complex cases and special populations

**Deliverables:**

1. combination-therapy.md - Multiple antiviral protocols
2. pediatric-fip.md - Kittens <12 weeks considerations
3. laboratory-reference.md - Complete lab interpretation guide
4. diagnostic-scorer.js - Quantify FIP suspicion
5. relapse-watch.md - Post-treatment monitoring
6. Integration tests suite

**Success Criteria:**

- Reference documents complete with citations
- Diagnostic scorer script tested
- Integration tests covering all workflows
- Full skill validation passing

---

### Version 2.4.0 - Documentation & Polish (Future)

**Target Date:** 8-10 weeks
**Focus:** Professional documentation and optional content

**Deliverables:**

1. case-studies.md - Real-world examples (anonymized)
2. drug-sources.md - Regional availability (with disclaimers)
3. docs/api/ - API documentation for scripts
4. docs/architecture.md - System design overview
5. Final polish and optimization

---

## 📋 Detailed Task Breakdown

### 🔴 Priority 1: Essential Client Templates (Week 1-2)

#### 1. home-care-guide.md

**Location:** `src/assets/templates/home-care-guide.md`
**Size:** ~3-4 KB
**Status:** ✅ IN PROGRESS

**Content Requirements:**

- Injection site selection and rotation
- Proper subcutaneous injection technique
- Storage and handling of GS-441524
- Safety precautions (human and pet)
- Missed dose protocol
- When to call veterinarian
- Common side effects and reactions
- Visual references (text descriptions)

**Evidence Base:**

- UC Davis protocols
- Veterinary nursing standards
- Published GS-441524 studies

---

#### 2. fip-explained.md

**Location:** `src/assets/templates/fip-explained.md`
**Size:** ~3-5 KB
**Status:** ✅ IN PROGRESS

**Content Requirements:**

- FIP basics (simplified pathophysiology)
- Coronavirus mutation explanation
- Why FIP was historically fatal
- Modern treatment breakthrough
- Success rates and realistic expectations
- Common misconceptions debunked
- Resources for further information

**Tone:** Compassionate, clear, non-technical
**Audience:** Pet owners with minimal medical knowledge

---

#### 3. prognosis-discussion.md

**Location:** `src/assets/templates/prognosis-discussion.md`
**Size:** ~4-5 KB
**Status:** 🔲 NOT STARTED

**Content Requirements:**

- Realistic success rates by disease form
- Factors affecting prognosis (age, form, timing)
- Treatment duration expectations (12+ weeks)
- Financial investment discussion points
- Quality of life considerations
- When euthanasia may be appropriate
- Scripts for difficult conversations

**Evidence Base:**

- ABCD Guidelines 2024
- Published outcome studies
- UC Davis treatment data

---

#### 4. refractory-cases.md

**Location:** `src/references/refractory-cases.md`
**Size:** ~5-7 KB
**Status:** ✅ IN PROGRESS

**Content Requirements:**

- Definition of treatment failure
- Reasons for failure (dosing, quality, misdiagnosis)
- Dose escalation protocols
- Alternative/adjunctive therapies
- Switching between formulations
- Managing concurrent conditions
- When to consider euthanasia
- Case examples and troubleshooting

**Evidence Base:**

- UC Davis research
- Published case series
- ABCD Guidelines

---

### 🟡 Priority 2: Advanced References (Week 3-4)

#### 5. combination-therapy.md

**Location:** `src/references/combination-therapy.md`
**Size:** ~4-6 KB
**Status:** 🔲 NOT STARTED

**Content Requirements:**

- GS-441524 + Remdesivir protocols
- Corticosteroid use (when/why/dosing)
- Immunomodulators (Polyprenyl Immunostimulant)
- Supportive care medications
- Pain management protocols
- Nutrition support
- Drug interactions to avoid
- Evidence quality markers

**Caution:** Clearly distinguish experimental vs. established therapies

---

#### 6. pediatric-fip.md

**Location:** `src/references/pediatric-fip.md`
**Size:** ~3-5 KB
**Status:** 🔲 NOT STARTED

**Content Requirements:**

- Challenges in neonatal/pediatric FIP
- Dosing adjustments for small kittens
- Injection volume considerations
- Growth monitoring during treatment
- Maternal antibody interference with testing
- Litter management protocols
- Prognosis differences in young kittens
- Queen/cattery considerations

**Evidence Base:** Limited - note where data is sparse

---

#### 7. laboratory-reference.md

**Location:** `src/references/laboratory-reference.md`
**Size:** ~6-8 KB
**Status:** 🔲 NOT STARTED

**Content Requirements:**

- CBC interpretation (anemia, lymphopenia patterns)
- Chemistry panel (globulin, A:G ratio, bilirubin)
- Effusion analysis (Rivalta test, cell counts, protein, PCR)
- Advanced testing (immunofluorescence, immunohistochemistry)
- Monitoring bloodwork trends
- Response indicators and warning signs
- When to adjust treatment

**Format:** Reference tables, decision trees

---

#### 8. diagnostic-scorer.js

**Location:** `src/scripts/diagnostic-scorer.js`
**Size:** ~150-200 lines
**Status:** 🔲 NOT STARTED

**Functionality:**

```javascript
/**
 * Calculate FIP probability score based on weighted evidence
 * @param {Object} findings - Clinical and laboratory findings
 * @returns {Object} Score and recommended diagnostic tree
 */
```

**Features:**

- Implement +/- evidence weighting from ABCD flowcharts
- Calculate cumulative diagnostic score
- Recommend which diagnostic tree (A, B, C, or D)
- Suggest next diagnostic steps
- Output probability categories (low/moderate/high)

**Testing Required:** Unit tests in `tests/unit/diagnostic-scorer.test.js`

---

#### 9. Integration Tests

**Location:** `tests/integration/`
**Status:** 🔲 NOT STARTED

**Required Test Files:**

- `skill-loading.test.js` - Skill loads and parses correctly
- `workflow.test.js` - Diagnostic and treatment workflows
- `scripts.test.js` - All utility scripts work together
- `fixtures/sample-cases.json` - Test data

**Test Coverage:**

- Skill loading and reference accessibility
- Diagnostic workflows (Trees A, B, C, D)
- Treatment workflows (dose calculation, cost estimation)
- Script integration and data flow

---

### 🟢 Priority 3: Optional Content (Week 5-6)

#### 10. relapse-watch.md

**Location:** `src/assets/templates/relapse-watch.md`
**Size:** ~2-3 KB
**Status:** 🔲 NOT STARTED

**Content:** Post-treatment monitoring guidance, signs of relapse, bloodwork timeline

---

#### 11. case-studies.md

**Location:** `src/references/case-studies.md`
**Size:** ~8-10 KB
**Status:** 🔲 NOT STARTED

**Content:** 5-10 detailed case studies with outcomes, lessons learned

**Important:** Ensure client consent and anonymization

---

#### 12. drug-sources.md

**Location:** `src/references/drug-sources.md`
**Size:** ~3-4 KB
**Status:** 🔲 NOT STARTED

**Content:** Regional availability, quality considerations, legal disclaimers

**Caution:** Sensitive content - focus on education, not sourcing recommendations

---

#### 13. API Documentation

**Location:** `docs/api/`
**Status:** 🔲 NOT STARTED

**Required Files:**

- `calculate-dose.md` - Dose calculator API
- `treatment-tracker.md` - Treatment tracker API
- `cost-estimator.md` - Cost estimator API
- `diagnostic-scorer.md` - Diagnostic scorer API

**Generation:** Consider auto-generating from JSDoc comments

---

#### 14. architecture.md

**Location:** `docs/architecture.md`
**Size:** ~4-6 KB
**Status:** 🔲 NOT STARTED

**Content:** System design, build process, skill file format, design decisions

---

## 🎯 Implementation Workflow

### For Each Content File

1. **Research Phase**
   - Review evidence sources (ABCD Guidelines, UC Davis, peer-reviewed literature)
   - Gather citations and references
   - Outline content structure

2. **Creation Phase**
   - Write content following existing templates
   - Include all required sections
   - Add evidence citations
   - Follow markdown style guide

3. **Integration Phase**
   - Link from SKILL.md (if applicable)
   - Add to package.json files array
   - Update cross-references

4. **Validation Phase**
   - Run `npm run validate`
   - Run `npm run lint`
   - Run `npm test`
   - Fix any issues

5. **Documentation Phase**
   - Update CHANGELOG.md
   - Update README.md (if needed)
   - Update this ROADMAP.md

---

## 📏 Quality Standards

### All Content Must Have

- [ ] Evidence citations from peer-reviewed sources
- [ ] Medical accuracy verification
- [ ] Appropriate disclaimers
- [ ] Client-friendly language (if applicable)
- [ ] Markdown lint passing
- [ ] File size reasonable (<10KB for references)
- [ ] Linked from SKILL.md (if applicable)
- [ ] Added to package.json files array

### All Scripts Must Have

- [ ] JSDoc comments
- [ ] Input validation
- [ ] Error handling
- [ ] Unit tests with >80% coverage
- [ ] Clear function signatures
- [ ] Usage examples

---

## 📊 Progress Tracking

### Current Sprint (Week 1-2): v2.2.0 Prep

- [x] Repository cleanup (delete .skill artifacts)
- [x] Archive IMPROVEMENT_PLAN.md
- [x] Create ROADMAP.md
- [⏳] Implement home-care-guide.md
- [⏳] Implement fip-explained.md
- [⏳] Implement refractory-cases.md
- [ ] Implement prognosis-discussion.md

### Next Sprint (Week 3-4): v2.2.0 Release

- [ ] Complete remaining v2.2.0 deliverables
- [ ] Full testing and validation
- [ ] Update all documentation
- [ ] Release v2.2.0

### Future Sprint (Week 5+): v2.3.0

- [ ] Advanced reference documents
- [ ] Diagnostic scorer script
- [ ] Integration tests
- [ ] Release v2.3.0

---

## 🔗 References

- **Evidence Base:** `docs/reference/icatcare_fipupdate_july25.pdf`
- **Existing Templates:** `src/assets/templates/*.md`
- **Existing References:** `src/references/*.md`
- **Contributing Guide:** `CONTRIBUTING.md`
- **Archive:** `docs/archive/IMPROVEMENT_PLAN.md` (historical context)

---

## 📞 Questions or Issues?

- Open an issue with the `content` label for medical content questions
- Open an issue with the `feature` label for new feature requests
- Check `CONTRIBUTING.md` for contribution guidelines
- Review archived `IMPROVEMENT_PLAN.md` for historical context

---

**Version:** 2.1.0 → 2.3.0
**Last Updated:** 2024-11-04
**Maintainer:** @ggwazi
**Status:** 🟢 Active Development
