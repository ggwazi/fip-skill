# FIP Veterinary Advisor Skill - Installation & Usage Guide

## Overview

This Claude Skill provides comprehensive, evidence-based guidance for diagnosing and treating Feline Infectious Peritonitis (FIP). It's designed to assist veterinarians, veterinary students, and veterinary professionals in managing FIP cases effectively.

## What's Included

### Main Components

1. **SKILL.md** - Core workflows and quick reference guides for:
   - Diagnostic approach
   - Treatment planning and monitoring
   - Dosage adjustments
   - Client communication
   - Troubleshooting common issues

2. **Reference Documents** (automatically loaded as needed):
   - **diagnostic-flowcharts.md** - ABCD diagnostic decision trees for all four clinical presentations
   - **treatment-protocols.md** - Complete GS-441524 treatment protocols from UC Davis
   - **differential-diagnosis.md** - Comprehensive guide to ruling out alternative diagnoses

### Evidence Base

All guidance is derived from:

- **ABCD Guidelines** (European Advisory Board on Cat Diseases, November 2024)
- **UC Davis Research** (Dr. Niels C. Pedersen and team)
- **Published field trials** of GS-441524 treatment
- **Peer-reviewed veterinary literature**

## Installation

### Installing in Claude

1. Download the `fip-veterinary-advisor.skill` file
2. In your Claude interface, go to your Project settings
3. Look for "Skills" or "Custom Skills" section
4. Click "Upload Skill" or "Add Skill"
5. Select the downloaded `fip-veterinary-advisor.skill` file
6. The skill will be available in your Project

*Note: Exact installation steps may vary depending on your Claude interface version*

## How to Use This Skill

### The Skill Activates Automatically

Claude will automatically use this skill when you:

- Mention FIP, feline infectious peritonitis, or FCoV
- Describe clinical signs consistent with FIP
- Ask about diagnosing effusions in cats
- Discuss GS-441524 or other FIP treatments
- Request help with feline coronavirus cases
- Ask about treating neurological or ocular disease in young cats

### Example Queries

**Diagnostic Scenarios:**

- "I have a 9-month-old cat with fever, ascites, and high globulin. Could this be FIP?"
- "What tests should I run to confirm FIP in a cat with pleural effusion?"
- "How do I interpret a positive FCoV PCR result?"
- "Walk me through the ABCD diagnostic flowchart for wet FIP"

**Treatment Planning:**

- "What's the starting dose of GS-441524 for a 3 kg cat with wet FIP?"
- "How should I monitor a cat during FIP treatment?"
- "When should I increase the dosage during treatment?"
- "My FIP patient isn't responding to treatment - what should I do?"

**Specific Situations:**

- "Help me explain FIP diagnosis and treatment to a worried client"
- "What are the differential diagnoses for a young cat with ascites?"
- "A cat relapsed 2 weeks after finishing treatment - how do I manage this?"
- "What injection sites should I recommend for daily GS injections?"

**Complex Cases:**

- "I'm treating neurological FIP - what special considerations apply?"
- "How do I manage injection site reactions?"
- "When is it appropriate to stop treatment before 12 weeks?"
- "What do I tell a client who can't afford treatment?"

## Key Features

### 1. Systematic Diagnostic Approach

The skill guides you through:

- Evidence-based signalment and history assessment
- Four diagnostic decision trees (effusive, non-effusive, neurological, ocular)
- Confirmatory testing interpretation
- Differential diagnosis evaluation

### 2. Evidence-Based Treatment Protocols

Complete guidance on:

- Initial dosing by disease form
- Monitoring parameters and frequency
- Dosage adjustment criteria
- Relapse management
- Drug resistance handling

### 3. Practical Clinical Support

Real-world assistance with:

- Injection technique and site management
- Client communication strategies
- Financial constraint discussions
- Quality of life assessments
- Euthanasia conversations

### 4. Comprehensive Reference Materials

Detailed information on:

- All ABCD diagnostic criteria with evidence weighting
- Complete UC Davis treatment protocols
- 20+ differential diagnoses with key differentiators
- Expected timelines and response patterns
- Troubleshooting guides

## Best Practices for Using This Skill

### 1. Provide Context

Give Claude relevant clinical information:

```
"I have a 7-month-old male DSH from a shelter. He's had fever (39.8°C) 
for 2 weeks not responding to antibiotics. On exam I found moderate 
ascites. CBC shows mild non-regenerative anemia and lymphopenia. 
Chemistry shows total protein 95 g/L, albumin 18 g/L, globulin 77 g/L. 
What should I do next?"
```

### 2. Ask Specific Questions

The skill works best with clear queries:

- ✅ "What are the stopping criteria for FIP treatment?"
- ✅ "How do I differentiate FIP from lymphocytic cholangitis?"
- ❌ "Tell me everything about FIP" (too broad)

### 3. Follow Diagnostic Trees

Reference specific decision trees:

- "I have effusion - walk me through diagnostic tree A"
- "Neurological signs are present - what does tree C recommend?"

### 4. Request Detailed Protocols

Ask for specific reference documents when needed:

- "Show me the complete GS-441524 dosing protocol"
- "What are all the differential diagnoses for effusive disease?"

### 5. Get Client Communication Help

Request assistance with difficult conversations:

- "Help me explain the diagnosis to the owner"
- "What should I say about treatment costs?"
- "How do I discuss euthanasia if treatment fails?"

## Understanding the Evidence Weighting System

The diagnostic flowcharts use a clear weighting system:

- `++++` = extremely likely FIP
- `+++` = far more likely FIP
- `++` = moderately more likely FIP
- `+` = slightly more likely FIP
- `-` = slightly less likely FIP
- `--` = moderately less likely FIP
- `---` = far less likely FIP
- `----` = extremely unlikely FIP

Claude will help you weight the evidence from multiple findings to reach a diagnosis.

## What This Skill Does NOT Do

**Limitations:**

- Does not replace your clinical judgment
- Cannot guarantee treatment success (resistance and misdiagnosis possible)
- Does not provide legal advice on drug procurement
- Cannot diagnose definitively without proper testing
- Does not replace histopathology for gold standard diagnosis

**When to Seek Additional Expertise:**

- Complex cases requiring advanced imaging (MRI, CT)
- Specialized procedures (aqueous humour sampling, CSF collection)
- Surgical interventions
- Treatment-refractory cases with suspected resistance
- Concurrent complex diseases

## Skill Structure

```
fip-veterinary-advisor/
├── SKILL.md (Core workflows and quick reference)
└── references/
    ├── diagnostic-flowcharts.md (ABCD decision trees)
    ├── treatment-protocols.md (GS-441524 protocols)
    └── differential-diagnosis.md (Alternative diagnoses)
```

Claude automatically loads reference documents as needed based on your queries.

## Updates and Maintenance

This skill is based on guidelines and research current as of November 2024. Key sources:

- ABCD FIP Guidelines (November 2024)
- UC Davis GS-441524 Treatment Summary (Pedersen)
- Published field trial data

**Note:** FIP research is rapidly evolving. Verify current best practices for:

- Drug availability and legal status in your region
- Newest treatment protocols
- Emerging resistance patterns
- Alternative antiviral options

## Support and Feedback

### Getting the Most from This Skill

1. **Be specific** - Provide clinical details for tailored advice
2. **Use diagnostic trees** - Follow the systematic approach
3. **Reference protocols** - Ask for specific sections when needed
4. **Iterate** - Ask follow-up questions to refine guidance

### Common Issues

**"Claude isn't using the skill"**

- Make sure your query mentions FIP, FCoV, or related terms
- Try explicitly mentioning "feline infectious peritonitis"
- Ensure the skill is properly installed in your Project

**"I need more detail on a specific topic"**

- Ask Claude to reference the specific document (e.g., "Show me the complete treatment protocol")
- Request examples: "Give me an example dosing calculation"
- Ask for step-by-step guidance: "Walk me through this decision tree"

**"The guidance seems outdated"**

- Note: This skill is current as of November 2024
- For cutting-edge research, supplement with current literature searches
- Drug availability and legal status vary by region - verify locally

## Example Workflow: Complete Case

Here's how to use the skill for a complete FIP case:

### 1. Initial Presentation

```
"I have a 10-month-old male DSH with 3 weeks of intermittent fever 
and progressive abdominal distension. He's from a 5-cat household. 
What should be my diagnostic approach?"
```

### 2. Test Interpretation

```
"I tapped the abdomen and got yellow fluid with protein 48 g/L, 
cell count 3.2×10⁹/L, mainly neutrophils and macrophages. 
Rivalta test positive. FCoV PCR came back with high viral load. 
What does this mean?"
```

### 3. Treatment Planning

```
"The owner wants to proceed with treatment. The cat weighs 3.2 kg 
and has no neurological or ocular signs. What's the treatment plan?"
```

### 4. Monitoring

```
"We're 4 weeks into treatment. The cat has gained 600g, appetite is 
excellent, but globulin is still 62 g/L (down from 77). Continue 
current dose or increase?"
```

### 5. Client Communication

```
"The owner is concerned about the cost of continuing treatment. 
How should I discuss this sensitively while prioritizing the cat's welfare?"
```

## Quick Reference Card

### Diagnostic Quick Check

- Young cat + multi-cat household = higher suspicion
- Fever + effusion + high globulin = very suspicious
- Yellow effusion + high protein + low cells = highly suspicious
- High FCoV PCR loads in effusion = FIP very likely

### Treatment Quick Start

- Wet/dry FIP: 4-6 mg/kg SC daily × 12 weeks
- Ocular FIP: 8 mg/kg SC daily × 12 weeks
- Neurological FIP: 10 mg/kg SC daily × 12 weeks
- Monitor: Weekly weights, monthly blood work
- Success: >85% cure rate with proper protocol

### Red Flags During Treatment

- No improvement in 1 week = reassess
- New neurological signs = increase dose
- Weight not increasing = bad sign
- Persistent fever = inadequate dose or wrong diagnosis

## Conclusion

This FIP Veterinary Advisor Skill provides comprehensive, evidence-based guidance for one of the most challenging feline diseases. By combining ABCD diagnostic criteria with UC Davis treatment protocols, it helps veterinarians navigate complex FIP cases with confidence.

Remember: This skill is a tool to support your clinical judgment, not replace it. Always consider the individual patient, client circumstances, and your professional expertise when making decisions.

---

**Questions or Issues?**

- Ensure the skill is properly installed in your Claude Project
- Provide specific clinical details for best results
- Reference the included documentation for comprehensive guidance
- Verify current drug availability and legal status in your region

**Version:** November 2024
**Evidence Base:** ABCD Guidelines 2024, UC Davis Protocols, Published Literature
