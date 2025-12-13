# How to Extend and Modify the FIP Skill

Complete guide to adding new content, updating existing information, and customizing the skill for your needs.

## Table of Contents

1. [Quick Start: Adding New Content](#quick-start-adding-new-content)
2. [Understanding Skill Structure](#understanding-skill-structure)
3. [Extension Method 1: Add Reference Documents](#extension-method-1-add-reference-documents)
4. [Extension Method 2: Update Existing Content](#extension-method-2-update-existing-content)
5. [Extension Method 3: Add Scripts](#extension-method-3-add-scripts)
6. [Extension Method 4: Add Assets](#extension-method-4-add-assets)
7. [Repackaging After Changes](#repackaging-after-changes)
8. [Testing Your Changes](#testing-your-changes)
9. [Common Extension Scenarios](#common-extension-scenarios)
10. [Best Practices](#best-practices)

---

## Quick Start: Adding New Content

**I just demonstrated this!** I added a new "Prevention and Management" reference document. Here's what happened:

### What I Did (3 Steps)

1. **Created new reference document**: `prevention-management.md` in the `references/` folder
2. **Updated SKILL.md** to reference it in the documentation section
3. **Repackaged** the skill into a new `.skill` file

**Result**: The skill now includes comprehensive prevention guidance that Claude will automatically load when relevant.

---

## Understanding Skill Structure

### Current FIP Skill Structure

```
fip-skill/
├── SKILL.md                    # Core workflows (always loaded when skill triggers)
├── references/                 # Detailed docs (loaded as needed)
│   ├── diagnostic-flowcharts.md
│   ├── treatment-protocols.md
│   ├── differential-diagnosis.md
│   └── prevention-management.md  # ← NEW! Just added this
├── scripts/                    # Executable code (currently empty)
└── assets/                     # Files for outputs (currently empty)
```

### How Claude Uses Each Part

**SKILL.md** (Core Document)

- **When loaded**: Automatically when skill triggers
- **Purpose**: Workflows, quick reference, decision trees
- **Keep it**: <500 lines if possible (currently ~600 lines)
- **Contains**: Essential procedures, when to use references

**Reference Documents** (`references/`)

- **When loaded**: Only when Claude determines they're needed
- **Purpose**: Comprehensive details on specific topics
- **Size**: Can be much larger (50-200 KB each)
- **Contains**: Complete protocols, extensive lists, detailed guidance

**Scripts** (`scripts/`)

- **When loaded**: Can be executed without loading into context
- **Purpose**: Deterministic calculations, repetitive tasks
- **Use for**: Dosage calculators, data processing, file manipulation

**Assets** (`assets/`)

- **When loaded**: Never loaded into context
- **Purpose**: Files used in Claude's outputs
- **Use for**: Templates, images, forms, example documents

---

## Extension Method 1: Add Reference Documents

**Best for**: New topic areas, comprehensive guides, detailed protocols

### Example: Adding "Client Education Materials"

**Step 1: Create the reference document**

```bash
# Navigate to your skill folder
cd fip-skill/references/

# Create new document
touch client-education.md
```

**Step 2: Write the content**

Create comprehensive content like I did with `prevention-management.md`. Structure it well:

```markdown
# Client Education Materials

## Overview
Brief description of what this covers

## Topic 1
Detailed information...

## Topic 2
More detailed information...

## Key Points Summary
Bullet points...
```

**Step 3: Reference it in SKILL.md**

Add to the "References and Resources" section:

```markdown
- **Client Education Materials:** [client-education.md](references/client-education.md)
  - Understanding FIP explanations
  - Treatment commitment discussions
  - Cost worksheets
  - Prognosis counseling guides
```

**Step 4: Add workflow guidance** (if needed)

If this should be used in specific situations, add to relevant workflow section:

```markdown
### Client Education

When clients need detailed explanations:

**See comprehensive materials:** [client-education.md](references/client-education.md)
- Pre-written explanations of FIP
- Visual aids descriptions
- Cost breakdown templates
- Decision-making frameworks
```

**Step 5: Repackage** (see [Repackaging section](#repackaging-after-changes))

### Other Reference Documents You Might Add

**Advanced Treatment Topics:**

- `refractory-cases.md` - Managing treatment failures
- `combination-therapy.md` - Using multiple antivirals
- `pediatric-considerations.md` - Treating very young kittens
- `geriatric-fip.md` - Special considerations for older cats

**Specialized Diagnostics:**

- `advanced-imaging.md` - MRI/CT interpretation for FIP
- `csf-analysis.md` - Detailed CSF collection and interpretation
- `histopathology-guide.md` - Understanding biopsy results
- `molecular-diagnostics.md` - PCR interpretation, viral sequencing

**Practice Management:**

- `client-education.md` - Pre-written explanations and materials
- `legal-considerations.md` - Liability, off-label drug use
- `cost-analysis.md` - Pricing strategies, payment plans
- `record-keeping.md` - Documentation templates

**Regional Adaptations:**

- `drug-access-usa.md` - US-specific availability
- `drug-access-europe.md` - European regulations
- `drug-access-australia.md` - Australian considerations

---

## Extension Method 2: Update Existing Content

**Best for**: Corrections, new research findings, protocol updates

### Scenario: New Treatment Protocol Published

**Step 1: Identify what needs updating**

Example: "New research shows 42-day treatment effective for wet FIP with specific criteria"

**Step 2: Locate the relevant file**

In this case: `references/treatment-protocols.md`

**Step 3: Update the content**

Add new section or modify existing:

```markdown
### Shorter Treatment Protocols (Evidence Update)

**42-Day Protocol for Wet FIP:**

Recent studies (2025) demonstrate 42-day treatment effective when ALL criteria met:
- Wet (effusive) FIP only
- No neurological involvement
- No ocular involvement at any point
- Complete clinical response by week 4
- Blood values normalized by week 6
- Weight gain >20% from baseline
- No fever >2 weeks into treatment

**Monitoring requirements:**
- Weekly blood work during treatment
- Biweekly for first 8 weeks post-treatment
- Monthly for next 16 weeks

**Success rate:** 87% (comparable to 12-week protocol)

**Not suitable for:**
- Dry FIP
- Any neurological or ocular involvement
- Slow response to treatment
- Incomplete clinical recovery by week 4
```

**Step 4: Update SKILL.md if workflow changes**

If this changes the decision-making process, update the relevant workflow section in SKILL.md.

**Step 5: Repackage**

### Scenario: Correcting an Error

**If you find a mistake:**

1. Locate the error in the file
2. Use `str_replace` or edit directly to fix it
3. Add a note in SKILL.md if it affects decision-making
4. Repackage

**Example correction:**

```markdown
<!-- OLD (INCORRECT) -->
Starting dose for neurological FIP: 8 mg/kg daily

<!-- NEW (CORRECTED) -->
Starting dose for neurological FIP: 10 mg/kg daily
```

---

## Extension Method 3: Add Scripts

**Best for**: Calculations, data processing, repetitive code tasks

### Example: Adding a Dosage Calculator

**Step 1: Create the script**

```python
# scripts/calculate_dose.py
#!/usr/bin/env python3
"""
GS-441524 Dosage Calculator for FIP Treatment
Calculates daily dose based on weight and disease form
"""

def calculate_dose(weight_kg, disease_form):
    """
    Calculate GS-441524 dose
    
    Args:
        weight_kg: Cat's weight in kilograms
        disease_form: 'wet', 'dry', 'ocular', or 'neurological'
    
    Returns:
        dict with dose_mg, volume_ml (assuming 15mg/ml concentration)
    """
    
    # Base dosing by disease form
    dosing_map = {
        'wet': 5,           # 4-6 mg/kg, using middle
        'dry': 6,           # 4-6 mg/kg, using higher end
        'ocular': 8,        # 8 mg/kg
        'neurological': 10  # 10 mg/kg
    }
    
    if disease_form not in dosing_map:
        raise ValueError(f"Disease form must be one of: {list(dosing_map.keys())}")
    
    mg_per_kg = dosing_map[disease_form]
    total_mg = weight_kg * mg_per_kg
    
    # Most GS-441524 is 15 mg/ml concentration
    volume_ml = total_mg / 15
    
    return {
        'weight_kg': weight_kg,
        'disease_form': disease_form,
        'dose_mg_per_kg': mg_per_kg,
        'total_dose_mg': round(total_mg, 2),
        'volume_ml': round(volume_ml, 3),
        'concentration': '15 mg/ml'
    }


def calculate_weekly_adjustment(current_weight, new_weight, current_dose_mg):
    """
    Calculate adjusted dose based on weekly weight change
    """
    weight_ratio = new_weight / current_weight
    new_dose_mg = current_dose_mg * weight_ratio
    new_volume_ml = new_dose_mg / 15
    
    return {
        'previous_weight_kg': current_weight,
        'current_weight_kg': new_weight,
        'weight_change_g': round((new_weight - current_weight) * 1000),
        'weight_change_percent': round(((new_weight - current_weight) / current_weight) * 100, 1),
        'previous_dose_mg': round(current_dose_mg, 2),
        'new_dose_mg': round(new_dose_mg, 2),
        'new_volume_ml': round(new_volume_ml, 3)
    }


if __name__ == "__main__":
    # Example usage
    import sys
    
    if len(sys.argv) != 3:
        print("Usage: python calculate_dose.py <weight_kg> <disease_form>")
        print("Disease forms: wet, dry, ocular, neurological")
        sys.exit(1)
    
    weight = float(sys.argv[1])
    disease = sys.argv[2].lower()
    
    result = calculate_dose(weight, disease)
    
    print(f"\nGS-441524 Dosing Calculation")
    print(f"=" * 40)
    print(f"Cat weight: {result['weight_kg']} kg")
    print(f"Disease form: {result['disease_form'].capitalize()}")
    print(f"Dose: {result['dose_mg_per_kg']} mg/kg")
    print(f"Total daily dose: {result['total_dose_mg']} mg")
    print(f"Volume to inject: {result['volume_ml']} ml")
    print(f"(Assuming {result['concentration']} concentration)")
    print(f"=" * 40)
```

**Step 2: Make it executable**

```bash
chmod +x scripts/calculate_dose.py
```

**Step 3: Reference in SKILL.md**

Add to appropriate workflow section:

```markdown
### Dosage Calculations

**Automated calculator available:**

Use `scripts/calculate_dose.py` for precise dosing:
```bash
python scripts/calculate_dose.py 3.5 neurological
```

Or call directly from Claude for automatic calculation.

```

**Step 4: Test the script**

```bash
python scripts/calculate_dose.py 3.2 wet
python scripts/calculate_dose.py 4.5 neurological
```

**Step 5: Repackage**

### Other Useful Scripts

**Treatment Monitoring:**

- `scripts/treatment_tracker.py` - Track weight, temp, bloodwork over time
- `scripts/graph_progress.py` - Generate progress graphs
- `scripts/relapse_risk.py` - Calculate relapse risk score

**Dosage Tools:**

- `scripts/dose_converter.py` - Convert between oral and injectable
- `scripts/compound_calculator.py` - Calculate compounding ratios
- `scripts/cost_estimator.py` - Estimate total treatment costs

**Diagnostic Support:**

- `scripts/rivalta_test.py` - Rivalta test result interpreter
- `scripts/ag_ratio.py` - A:G ratio calculator with interpretation
- `scripts/differential_scorer.py` - Score differential diagnoses

---

## Extension Method 4: Add Assets

**Best for**: Templates, forms, images, reference files to be used in outputs

### Example: Adding Client Forms

**Step 1: Create/collect the assets**

```bash
# Create assets subdirectory structure
mkdir -p fip-skill/assets/client-forms
mkdir -p fip-skill/assets/templates
mkdir -p fip-skill/assets/images
```

**Step 2: Add the files**

Example files to add:

- `assets/client-forms/treatment-consent-form.docx`
- `assets/client-forms/monitoring-schedule.pdf`
- `assets/templates/bloodwork-tracking.xlsx`
- `assets/images/fip-diagnostic-algorithm.png`

**Step 3: Reference in SKILL.md**

```markdown
### Client Documentation

**Pre-made forms available in assets/client-forms/:**
- Treatment consent form (Word doc)
- Monitoring schedule template (PDF)
- Cost estimate worksheet (Excel)
- Home injection guide (PDF with images)

Claude can help you customize these for your practice.
```

**Step 4: Tell Claude how to use them**

Add to workflow section:

```markdown
### Providing Client Materials

When clients need documentation:

1. Start with templates in `assets/client-forms/`
2. Customize for specific case
3. Review key points with client
4. Provide both written and verbal guidance

**Available templates:**
- `treatment-consent-form.docx` - Informed consent
- `monitoring-schedule.pdf` - Appointment calendar
- `cost-worksheet.xlsx` - Budget planning
- `injection-guide.pdf` - Step-by-step instructions with images
```

**Step 5: Repackage**

### Other Useful Assets

**Reference Materials:**

- `assets/reference/drug-formulations.pdf` - Available GS-441524 products
- `assets/reference/injection-sites-diagram.png` - Visual guide
- `assets/reference/fip-facts-handout.pdf` - Client education

**Templates:**

- `assets/templates/case-report-template.docx`
- `assets/templates/monitoring-spreadsheet.xlsx`
- `assets/templates/referral-letter.docx`

**Visual Aids:**

- `assets/images/diagnostic-flowchart.png`
- `assets/images/injection-technique.png`
- `assets/images/fip-signs-photos/` - Directory of clinical photos

---

## Repackaging After Changes

After making any changes, you need to repackage the skill.

### Method 1: Using ZIP Command (What I Used)

```bash
# Navigate to directory containing fip-skill folder
cd /home/claude

# Remove old package if it exists
rm -f fip-veterinary-advisor.skill

# Create new package
zip -r fip-veterinary-advisor.skill fip-skill/

# Move to outputs for easy download
mv fip-veterinary-advisor.skill /mnt/user-data/outputs/
```

### Method 2: Version-Named Packages

Good practice for tracking changes:

```bash
# Create versioned package
zip -r fip-veterinary-advisor-v2.0.skill fip-skill/

# Or with date
DATE=$(date +%Y%m%d)
zip -r fip-veterinary-advisor-$DATE.skill fip-skill/

# Examples:
# fip-veterinary-advisor-v2.0.skill
# fip-veterinary-advisor-20250102.skill
```

### What Gets Packaged

Everything in the `fip-skill/` directory:

- ✅ SKILL.md
- ✅ All files in references/
- ✅ All files in scripts/
- ✅ All files in assets/
- ✅ Directory structure is preserved

### Verify Package Contents

```bash
# List contents without extracting
unzip -l fip-veterinary-advisor.skill

# Should see:
# fip-skill/SKILL.md
# fip-skill/references/diagnostic-flowcharts.md
# fip-skill/references/treatment-protocols.md
# ... etc
```

---

## Testing Your Changes

### Before Repackaging

**Test locally first:**

1. **Review content**

   ```bash
   # Check file exists and has content
   cat fip-skill/references/prevention-management.md | head -50
   
   # Check file size (should be reasonable)
   ls -lh fip-skill/references/
   ```

2. **Verify references**

   ```bash
   # Check that SKILL.md references new content
   grep "prevention" fip-skill/SKILL.md
   ```

3. **Test scripts** (if added)

   ```bash
   # Run script to ensure it works
   python fip-skill/scripts/calculate_dose.py 3.5 wet
   ```

### After Installation

**Test the skill with Claude:**

1. **Simple query** - Check it triggers

   ```
   "Tell me about FIP prevention in multi-cat households"
   ```

2. **Reference loading** - Verify new content accessible

   ```
   "What does the prevention and management guide say about catteries?"
   ```

3. **Workflow integration** - Ensure it fits naturally

   ```
   "A client just had a cat diagnosed with FIP. They have 4 other cats. What should I tell them?"
   ```

4. **Error checking** - Try edge cases

   ```
   "Calculate dose for 2.8 kg cat with ocular FIP"
   ```

### Validation Checklist

- [ ] All markdown files have proper headings
- [ ] All links in SKILL.md work (reference correct paths)
- [ ] New content is referenced in SKILL.md
- [ ] Scripts are executable and tested
- [ ] No syntax errors in markdown
- [ ] File sizes reasonable (keep references under 200KB each if possible)
- [ ] Skill description updated if new capabilities added

---

## Common Extension Scenarios

### Scenario 1: New Drug Becomes Available

**What to update:**

1. **treatment-protocols.md** - Add new drug section

   ```markdown
   ### Alternative Antiviral: [Drug Name]
   
   **Availability:** Licensed in [countries]
   **Dosing:** [mg/kg daily]
   **Efficacy:** [cure rate] based on [studies]
   **Advantages:** 
   **Disadvantages:**
   **When to use:**
   ```

2. **SKILL.md** - Update "Available Antivirals" section

3. **Create new reference** - If drug is complex

   ```bash
   touch references/[drugname]-protocol.md
   ```

4. **Repackage and redistribute**

### Scenario 2: Your Region Has Specific Regulations

**What to add:**

1. **New reference document:**

   ```bash
   touch references/regional-guidance-[country].md
   ```

2. **Content to include:**
   - Legal status of GS-441524
   - Approved formulations
   - Prescription requirements
   - Compounding pharmacies
   - Regulatory reporting
   - Liability considerations

3. **Update SKILL.md description:**

   ```markdown
   description: ... Also includes region-specific guidance for [country]
   ```

### Scenario 3: Adding Your Practice Protocols

**What to add:**

1. **Practice-specific reference:**

   ```bash
   touch references/practice-protocols.md
   ```

2. **Content:**

   ```markdown
   # [Practice Name] FIP Protocols
   
   ## Our Standard Approach
   - Initial consultation procedures
   - Required tests before treatment
   - Monitoring schedule
   - Follow-up appointments
   - Emergency contact procedures
   
   ## Fee Structure
   - Initial diagnostic workup: $XXX
   - Weekly monitoring: $XXX
   - Emergency visits: $XXX
   - Discharge planning: $XXX
   
   ## Client Resources
   - Support groups we recommend
   - Pharmacy contacts
   - Emergency afterhours
   ```

3. **Reference in SKILL.md**

### Scenario 4: Research Update Changes Recommendations

**Example: New study shows different stopping criteria**

1. **Update treatment-protocols.md:**
   - Modify "Criteria for Stopping Treatment" section
   - Add reference to new study
   - Update recommendation with evidence

2. **Update SKILL.md workflow:**
   - Modify "Treatment Completion" section
   - Update decision tree if needed

3. **Add note about evidence update:**

   ```markdown
   ### Evidence Updates
   
   **[Date]:** Stopping criteria revised based on [Study, Year]
   - Previous recommendation: [old]
   - Current recommendation: [new]
   - Rationale: [explanation]
   ```

4. **Version the update:**

   ```bash
   zip -r fip-veterinary-advisor-v2.1-evidence-update.skill fip-skill/
   ```

---

## Best Practices

### Content Organization

**DO:**

- ✅ Keep SKILL.md under 500-600 lines
- ✅ Move detailed content to reference documents
- ✅ Use clear headings and structure
- ✅ Reference sources for protocols
- ✅ Include "When to use" guidance
- ✅ Provide examples

**DON'T:**

- ❌ Put everything in SKILL.md
- ❌ Duplicate content between files
- ❌ Create orphan references (not mentioned in SKILL.md)
- ❌ Make files unnecessarily huge (split if >200KB)
- ❌ Forget to update skill description

### File Naming

**Use clear, descriptive names:**

- ✅ `treatment-protocols.md`
- ✅ `calculate_dose.py`
- ✅ `client-consent-form.docx`

**Avoid:**

- ❌ `doc1.md`
- ❌ `script.py`
- ❌ `temp.pdf`

### Version Control

**Track versions systematically:**

```bash
# Include version or date in filename
fip-veterinary-advisor-v1.0.skill  # Initial release
fip-veterinary-advisor-v1.1.skill  # Minor update
fip-veterinary-advisor-v2.0.skill  # Major update

# Or use dates
fip-veterinary-advisor-20250101.skill
```

**Keep a changelog:**

Create `CHANGELOG.md` in skill folder:

```markdown
# FIP Skill Changelog

## Version 2.0 (2025-01-15)
- Added prevention-management.md reference
- Updated SKILL.md with prevention workflow
- Expanded skill description

## Version 1.1 (2025-01-10)
- Corrected neurological FIP starting dose
- Added relapse risk factors
- Improved client communication scripts

## Version 1.0 (2025-01-01)
- Initial release
- Four reference documents
- Complete diagnostic and treatment workflows
```

### Testing Protocol

**Before releasing updates:**

1. ✅ Test with Claude on various queries
2. ✅ Verify all links work
3. ✅ Check scripts execute correctly
4. ✅ Review for typos and errors
5. ✅ Confirm file sizes reasonable
6. ✅ Validate against original evidence
7. ✅ Test edge cases

### Documentation

**Always document:**

- What changed
- Why it changed  
- What evidence supports the change
- When it changed
- Who should use the new version

**Create update notes:**

```markdown
# Update Notes - Version 2.0

## What's New
- Prevention and management module
- Multi-cat household guidance
- Cattery breeding considerations

## Why Updated
- Frequent client questions about prevention
- Need for evidence-based multi-cat guidance
- Cattery management requests

## Evidence Base
- ABCD Prevention Guidelines
- Shelter Medicine Best Practices
- Feline Coronavirus Epidemiology Studies

## Who Benefits
- Veterinarians with multi-cat clients
- Cattery consultations
- Shelter veterinarians
```

---

## Quick Reference: Extension Checklist

### Adding New Reference Document

- [ ] Create file in `references/` folder
- [ ] Write comprehensive content with clear structure
- [ ] Reference it in SKILL.md "References and Resources" section
- [ ] Add to relevant workflow section if needed
- [ ] Update skill description if adding new capability
- [ ] Test with sample queries
- [ ] Repackage skill
- [ ] Version the update
- [ ] Document what changed

### Updating Existing Content

- [ ] Identify what needs changing
- [ ] Make changes to appropriate file(s)
- [ ] Update SKILL.md if workflow affected
- [ ] Note evidence supporting change
- [ ] Test functionality
- [ ] Repackage skill
- [ ] Version with descriptive name
- [ ] Document changes in changelog

### Adding Scripts

- [ ] Create script in `scripts/` folder
- [ ] Test script independently
- [ ] Make executable (if bash/python script)
- [ ] Document usage in comments
- [ ] Reference in SKILL.md
- [ ] Provide example usage
- [ ] Repackage skill
- [ ] Test script via Claude

### Adding Assets

- [ ] Create/collect asset files
- [ ] Organize in appropriate `assets/` subfolder
- [ ] Reference in SKILL.md
- [ ] Explain how to use
- [ ] Verify files open/work correctly
- [ ] Repackage skill
- [ ] Test access via Claude

---

## Summary

**The FIP skill is extensible!** You can:

1. **Add reference documents** - Easiest way to add comprehensive new content
2. **Update existing files** - Keep protocols current with new research
3. **Add scripts** - Automate calculations and repetitive tasks
4. **Add assets** - Include templates, forms, images

**Key principle:** Keep SKILL.md lean with workflows and quick reference. Put detailed content in references. Let Claude load what's needed when it's needed.

**I just demonstrated** adding a complete prevention module by:

- Creating `prevention-management.md` reference
- Updating SKILL.md to reference it
- Adding to workflows
- Updating skill description
- Repackaging

**You can do the same** for any new topic, update, or customization you need!

---

## Need Help?

**Common issues:**

- **"Claude isn't using my new content"** - Check that SKILL.md references it and skill description mentions the capability
- **"My script doesn't work"** - Test it independently before packaging
- **"File too large"** - Split into multiple focused references
- **"Links broken"** - Verify paths are correct relative to SKILL.md location

**For complex modifications**, ask Claude to help you:

- Design new reference document structure
- Write scripts for specific calculations
- Update workflows to incorporate new content
- Test and validate changes

The skill is yours to customize and extend as FIP research and your practice needs evolve!
