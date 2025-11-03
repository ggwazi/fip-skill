# FIP Veterinary Advisor Skill

Evidence-based diagnostic and treatment guidance for Feline Infectious Peritonitis (FIP), designed as a Claude Code skill.

## About This Skill

This skill provides comprehensive, evidence-based guidance for diagnosing and treating FIP based on:
- **ABCD Guidelines** (European Advisory Board on Cat Diseases, November 2024)
- **UC Davis Research** (Dr. Niels C. Pedersen and team)
- **Published field trials** of GS-441524 treatment
- **Peer-reviewed veterinary literature**

## Repository Structure

```
fip-skill/
├── SKILL.md                    # Core skill file with workflows and quick reference
├── references/                 # Reference documents (auto-loaded by Claude)
│   ├── diagnostic-flowcharts.md       # ABCD diagnostic decision trees
│   ├── differential-diagnosis.md      # Alternative diagnoses guide
│   ├── prevention-management.md       # Prevention strategies
│   └── treatment-protocols.md         # Complete GS-441524 protocols
├── scripts/                    # Executable scripts (optional)
├── assets/                     # Output assets like templates (optional)
├── docs/                       # Additional documentation
│   └── icatcare_fipupdate_july25.pdf
├── fip-veterinary-advisor.skill       # Packaged v1 (26 KB)
├── fip-veterinary-advisor-v2.skill    # Packaged v2 with prevention (31 KB) ⭐
└── Documentation files:
    ├── FIP-Skill-Installation-Guide.md
    ├── FIP-Skill-Summary.md
    ├── How-to-Extend-FIP-Skill.md
    ├── Extension-Demonstration-Summary.md
    └── COMPLETE-PACKAGE-GUIDE.md
```

## Quick Start

### Install the Skill

1. Download `fip-veterinary-advisor-v2.skill` (recommended)
2. In Claude Code, upload the skill to your project
3. The skill will automatically activate for FIP-related queries

### Example Queries

```
"I have a 9-month-old cat with ascites and high globulin. What should I do?"
"Calculate GS-441524 dose for a 3.5 kg cat with neurological FIP"
"Walk me through the ABCD diagnostic flowchart for wet FIP"
"Help me explain FIP diagnosis to a worried client"
```

## Development

### Skill Structure Requirements

Every Claude Code skill must have:
- **SKILL.md** (required) - Contains YAML frontmatter and skill instructions
- **references/** (optional) - Documentation loaded as needed
- **scripts/** (optional) - Executable code for deterministic tasks
- **assets/** (optional) - Files used in output (templates, images, etc.)

### Making Changes

1. Edit the source files in this repository
2. Test your changes
3. Repackage the skill:
   ```bash
   cd /home/user/fip-skill
   zip -r fip-veterinary-advisor-v2.skill SKILL.md references/ scripts/ assets/
   ```
4. Verify package contents:
   ```bash
   unzip -l fip-veterinary-advisor-v2.skill
   ```

### Extending the Skill

See [How-to-Extend-FIP-Skill.md](How-to-Extend-FIP-Skill.md) for comprehensive guidance on:
- Adding new reference documents
- Creating scripts for calculations
- Including assets like templates
- Updating existing content
- Versioning and testing

## Documentation

- **[FIP-Skill-Installation-Guide.md](FIP-Skill-Installation-Guide.md)** - How to install and use the skill
- **[FIP-Skill-Summary.md](FIP-Skill-Summary.md)** - Technical overview and design philosophy
- **[How-to-Extend-FIP-Skill.md](How-to-Extend-FIP-Skill.md)** - Complete extension guide
- **[Extension-Demonstration-Summary.md](Extension-Demonstration-Summary.md)** - Example of adding prevention module
- **[COMPLETE-PACKAGE-GUIDE.md](COMPLETE-PACKAGE-GUIDE.md)** - Overview of all files

## Skill Versions

### Version 2 (Recommended) - 31 KB
**fip-veterinary-advisor-v2.skill**

Includes everything from v1 plus:
- Prevention strategies
- Multi-cat household management
- Cattery breeding guidance
- Shelter management protocols
- FCoV testing interpretation

### Version 1 - 26 KB
**fip-veterinary-advisor.skill**

Core functionality:
- ABCD diagnostic flowcharts
- Complete GS-441524 treatment protocols
- Differential diagnosis guide
- Client communication guidance
- Monitoring protocols

## Key Features

### Automatic Activation
Claude automatically uses this skill when queries involve:
- FIP diagnosis or treatment
- Feline coronavirus (FCoV)
- Effusions in young cats
- GS-441524 or other antivirals
- Neurological or ocular disease in cats

### Evidence-Based Protocols
- >85% cure rate with proper treatment
- Systematic diagnostic approach using ABCD criteria
- Complete monitoring and dosing guidelines
- Practical client communication support

### Progressive Loading
- Skill metadata: Always in context (~200 words)
- SKILL.md: Loaded when skill triggers
- References: Loaded only when Claude determines they're needed
- Keeps context efficient while ensuring comprehensive coverage

## Contributing

To contribute improvements:
1. Make changes to the source files
2. Test with various queries
3. Update version information
4. Repackage the skill
5. Document your changes

## License & Disclaimers

This skill:
- Does not replace clinical judgment
- Cannot guarantee treatment success
- Does not provide legal advice on drug procurement
- Cannot diagnose definitively without proper testing
- Does not replace histopathology for gold standard diagnosis

## Questions or Issues?

- Check the [Installation Guide](FIP-Skill-Installation-Guide.md) for troubleshooting
- Review the [Extension Guide](How-to-Extend-FIP-Skill.md) for customization help
- Verify current drug availability and legal status in your region

---

**Version:** 2.0 (November 2024)
**Evidence Base:** ABCD Guidelines 2024, UC Davis Protocols, Published Literature
