# FIP Veterinary Advisor - Claude Skill

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.1.0-green.svg)](CHANGELOG.md)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](package.json)
[![Evidence-Based](https://img.shields.io/badge/evidence-ABCD%202024-purple)](docs/reference/)

> Comprehensive, evidence-based diagnostic and treatment guidance for Feline Infectious Peritonitis (FIP). Transform FIP cases from uniformly fatal to >85% curable with systematic, protocol-driven care.

---

## 🎯 Features

- **🔬 Systematic Diagnostics** - ABCD evidence-weighted flowcharts for effusive, dry, neurological, and ocular FIP
- **💊 Complete Treatment Protocols** - UC Davis GS-441524 protocols with dosing by disease form
- **📊 Automated Tools** - Dosage calculators, treatment trackers, cost estimators
- **📈 Monitoring Guidance** - Objective parameters for tracking treatment response
- **💬 Client Communication** - Templates and scripts for difficult conversations
- **📚 Comprehensive References** - 210+ KB of detailed veterinary guidance

### Evidence Base

All protocols derived from:

- **ABCD Guidelines** (European Advisory Board on Cat Diseases, November 2024)
- **UC Davis Research** (Dr. Niels C. Pedersen and team)
- **Published Field Trials** of GS-441524 treatment
- **Peer-Reviewed Literature** from veterinary journals

---

## 🚀 Quick Start

### Installation

1. **Download the latest release:**

   ```bash
   # Download from releases page or build from source
   npm run build && npm run package
   ```

2. **Upload to Claude:**
   - Open your Claude Code project
   - Upload the `.skill` file
   - Skill activates automatically for FIP queries

### Example Usage

```
"I have a 9-month-old cat with ascites and high globulin. What should I do?"
"Calculate GS-441524 dose for a 3.5 kg cat with neurological FIP"
"Walk me through the ABCD diagnostic flowchart for wet FIP"
"Help me explain FIP diagnosis to a worried client"
```

---

## 📁 Repository Structure

```
fip-skill/
├── src/                        # Skill source files
│   ├── SKILL.md               # Core skill with workflows
│   ├── references/            # Detailed reference documents
│   │   ├── diagnostic-flowcharts.md
│   │   ├── treatment-protocols.md
│   │   ├── differential-diagnosis.md
│   │   └── prevention-management.md
│   ├── scripts/               # Utility scripts
│   │   ├── calculate-dose.js
│   │   ├── treatment-tracker.js
│   │   └── cost-estimator.js
│   └── assets/                # Templates and forms
│       ├── templates/
│       └── forms/
│
├── scripts/                    # Build automation
│   ├── build.js
│   ├── package.js
│   ├── validate.js
│   └── utils/
│
├── tests/                      # Test suite
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── docs/                       # Documentation
│   ├── installation.md
│   ├── extending.md
│   ├── summary.md
│   └── reference/
│
├── .github/                    # GitHub Actions workflows
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
│
├── dist/                       # Build output (gitignored)
├── package.json               # Project configuration
├── CHANGELOG.md               # Version history
├── TODO.md                    # Missing files tracking
└── README.md                  # This file
```

---

## 💻 Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone repository
git clone https://github.com/ggwazi/fip-skill.git
cd fip-skill

# Install dependencies
npm install

# Run validation
npm test

# Build the skill
npm run build

# Package the skill
npm run package
```

### Available Scripts

```bash
npm run build                    # Build skill from source
npm run package                  # Create .skill package
npm run validate                 # Validate skill structure
npm run lint                     # Lint markdown files
npm run lint:fix                 # Auto-fix markdown issues
npm test                         # Run all tests
npm run release                  # Full release workflow
npm run find-issues              # Find issues since last merge
npm run find-closeable-branches  # Identify branches that can be closed
```

### Repository Maintenance Tools

The project includes utility scripts to help maintain code quality and manage branches:

#### Find Issues Since Last Merge

```bash
npm run find-issues
```

This script identifies problems that have appeared since the last merge:

- **Validation errors** - Broken links, missing sections, invalid structure
- **Linting issues** - Markdown formatting problems
- **Test failures** - Unit and integration test errors
- **Uncommitted changes** - Files that need to be staged

Use this before creating pull requests to ensure code quality.

#### Find Closeable Branches

```bash
npm run find-closeable-branches
```

This script identifies Git branches that can potentially be closed/deleted:

- **Merged branches** - Branches already merged into main (safe to delete)
- **Stale branches** - Branches with no commits in 90+ days (configurable via `STALE_DAYS` env var)
- **Empty branches** - Branches with no unique commits compared to main
- **Remote-only branches** - Branches that exist remotely but not locally

The script provides git commands to safely delete identified branches.

**Configuration:**

```bash
# Use a custom stale threshold (default is 90 days)
STALE_DAYS=30 npm run find-closeable-branches
```

### Making Changes

1. Edit source files in `src/`
2. Run validation: `npm test`
3. Build and package: `npm run release`
4. Test the generated `.skill` file

See [docs/extending.md](docs/extending.md) for detailed guidance on:

- Adding new reference documents
- Creating utility scripts
- Including client templates
- Updating treatment protocols

---

## 📖 Documentation

### User Documentation

- **[Installation Guide](docs/installation.md)** - Setup and usage
- **[Skill Summary](docs/summary.md)** - Technical overview
- **[Package Guide](docs/package-guide.md)** - Complete file reference

### Developer Documentation

- **[Extension Guide](docs/extending.md)** - How to extend the skill
- **[Extension Demo](docs/extension-demo.md)** - Example walkthrough
- **[Contributing Guide](CONTRIBUTING.md)** - Contribution guidelines
- **[TODO Plan](TODO.md)** - Missing files and implementation roadmap
- **[Changelog](CHANGELOG.md)** - Version history

### Reference Materials

- **[ABCD Guidelines PDF](docs/reference/icatcare_fipupdate_july25.pdf)** - Source guidelines
- **[Evidence Base](src/references/)** - Complete protocol sources

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run with coverage
npm run test:coverage

# Validate skill structure
npm run validate
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Code of conduct
- Contribution process
- Evidence requirements for medical content
- Testing requirements
- PR guidelines

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run `npm test`
6. Submit a pull request

---

## 📊 Skill Versions

### v2.1.0 (Current - In Development)

- Complete project infrastructure
- Build automation and CI/CD
- Utility scripts (dose calculator, treatment tracker)
- Comprehensive testing framework

### v2.0.0

- Prevention and management module
- Multi-cat household guidance
- Cattery breeding considerations
- Shelter management protocols

### v1.0.0

- Initial release
- Core diagnostic flowcharts
- Complete treatment protocols
- Differential diagnosis guide

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

---

## 🎓 Key Features in Detail

### Systematic Diagnostic Approach

Four evidence-weighted diagnostic trees cover all FIP presentations:

- **Tree A:** Effusion present (wet FIP)
- **Tree B:** No effusion + non-specific signs (dry FIP)
- **Tree C:** Neurological findings
- **Tree D:** Ocular findings

Each tree uses quantitative evidence weighting (+/-) to build diagnostic confidence.

### Complete Treatment Protocols

- **Dosing by disease form:** Wet/dry (4-6 mg/kg), Ocular (8 mg/kg), Neurological (10 mg/kg)
- **Weekly monitoring:** Weight, temperature, clinical signs
- **Monthly bloodwork:** CBC, chemistry, A:G ratio tracking
- **Adjustment protocols:** When and how to increase dosage
- **Stopping criteria:** Objective parameters for treatment completion
- **Relapse management:** Recognition and retreatment protocols

### Client Communication Tools

- Informed consent templates
- Treatment explanation scripts
- Cost discussion frameworks
- Prognosis counseling approaches
- Euthanasia discussion guidance

---

## ⚠️ Medical Disclaimer

This skill provides evidence-based veterinary guidance for **educational purposes only**.

**It does NOT:**

- Replace clinical judgment or veterinary expertise
- Guarantee treatment success or specific outcomes
- Provide legal advice on drug procurement
- Diagnose definitively without proper testing
- Replace histopathology for gold standard diagnosis

**Always consult with a licensed veterinarian** for specific medical advice and treatment decisions.

---

## 📜 License

[MIT License](LICENSE) - See LICENSE file for details.

Copyright (c) 2024 FIP Veterinary Skill Team

---

## 🔗 Links

- **Repository:** [github.com/ggwazi/fip-skill](https://github.com/ggwazi/fip-skill)
- **Issues:** [github.com/ggwazi/fip-skill/issues](https://github.com/ggwazi/fip-skill/issues)
- **Releases:** [github.com/ggwazi/fip-skill/releases](https://github.com/ggwazi/fip-skill/releases)

---

## 📞 Support

- **Documentation Issues:** Open an issue with the `documentation` label
- **Medical Content:** Open an issue with the `content` label and provide evidence citations
- **Bug Reports:** Use the bug report template
- **Feature Requests:** Use the feature request template

---

## 🙏 Acknowledgments

This skill is built on the pioneering work of:

- **ABCD** (European Advisory Board on Cat Diseases)
- **Dr. Niels C. Pedersen** and the UC Davis team
- **International Cat Care** for FIP research compilation
- All veterinarians and researchers advancing FIP treatment

---

**Version:** 2.1.0 (In Development)
**Last Updated:** 2024-11-03
**Evidence Base:** ABCD Guidelines 2024, UC Davis Protocols, Published Literature
