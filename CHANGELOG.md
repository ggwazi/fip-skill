# Changelog

All notable changes to the FIP Veterinary Advisor skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- home-care-guide.md - Step-by-step injection instructions for clients
- fip-explained.md - FIP basics in compassionate, client-friendly language
- refractory-cases.md - Evidence-based guidance for managing treatment failures
- ROADMAP.md - Prioritized development roadmap for v2.2.0 - v2.3.0
- docs/archive/ directory for historical planning documents

### Changed

- Archived IMPROVEMENT_PLAN.md to docs/archive/ (infrastructure complete)

### Removed

- Build artifact .skill files from root directory (properly gitignored)

## [2.1.0] - 2024-11-04

### Added

- Complete project infrastructure with package.json
- Build automation scripts (build.js, package.js, validate.js)
- Validation and testing framework
- GitHub Actions CI/CD workflows (ci.yml, pr-check.yml, release.yml)
- Three utility scripts:
  - calculate-dose.js - GS-441524 dosage calculator
  - treatment-tracker.js - Patient progress monitoring
  - cost-estimator.js - Treatment cost estimation
- Two client templates:
  - treatment-consent.md
  - monitoring-schedule.md
- Unit tests for utility scripts
- Comprehensive documentation structure
- Markdown linting configuration (.markdownlint.json)
- Development tooling and scripts
- Maintenance utilities (find-issues.js, find-closeable-branches.js)
- Copilot instructions for contributors

### Changed

- Reorganized repository structure into professional layout
- Moved SKILL.md and references to src/ directory
- Consolidated documentation into docs/ directory
- Updated file paths and cross-references
- Enhanced README.md with complete feature documentation
- Improved CONTRIBUTING.md with detailed guidelines

## [2.0.0] - 2024-12-01

### Added

- Prevention and management reference document
- Multi-cat household guidance
- Cattery breeding considerations
- Shelter management protocols
- FCoV testing interpretation

### Changed

- Expanded skill description to include prevention capabilities
- Enhanced workflow sections with prevention guidance
- Updated package to include new reference document

## [1.0.0] - 2024-11-01

### Added

- Initial release of FIP Veterinary Advisor skill
- Core SKILL.md with diagnostic and treatment workflows
- Four comprehensive reference documents:
  - Diagnostic flowcharts (ABCD Guidelines 2024)
  - Treatment protocols (UC Davis protocols)
  - Differential diagnosis guide
  - Prevention and management
- Quick reference guides
- Client communication templates
- Troubleshooting section

### Evidence Base

- ABCD (European Advisory Board on Cat Diseases) Guidelines - November 2024
- UC Davis Veterinary School research (Dr. Niels C. Pedersen)
- Published field trials and clinical studies
- Peer-reviewed veterinary literature

[Unreleased]: https://github.com/ggwazi/fip-skill/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/ggwazi/fip-skill/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/ggwazi/fip-skill/releases/tag/v1.0.0
