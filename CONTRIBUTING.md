# Contributing

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
npm install
```

## Development Workflow

This project is managed by [projen](https://projen.io). Do not edit generated files directly (e.g. `package.json`, `tsconfig.json`, `.eslintrc.json`).

1. Make changes to `.projenrc.ts` for project configuration, or to files in `src/` for construct code.
2. Run `npx projen` to regenerate project files after changing `.projenrc.ts`.
3. Run `npx projen build` to compile, test, lint, and package.

## Common Tasks

```bash
npx projen build          # Full build (compile + test + lint + package)
npx projen compile        # Compile TypeScript via jsii
npx projen test           # Run tests with coverage
npx projen eslint         # Run ESLint
npx projen package:python # Build Python wheel
npx projen package-all    # Package for all languages
```

## Project Structure

Each construct lives in its own directory with colocated tests:

```text
src/
  constructs/
    account-roles/
      account-roles.construct.ts    # Implementation
      account-roles.interface.ts    # Props and interfaces
      account-roles.test.ts         # Tests (100% coverage)
    blueprint/
    connection/
    data-catalog-table/
    data-source/
    domain/
    dqdl-ruleset/
    environment/
    git-connection/
    project/
    project-database/
    project-profile/
    s3-connection/
  index.ts                          # Public API exports
```

## Adding a New Construct

1. Create a new folder under `src/constructs/<name>/`
2. Add `<name>.interface.ts` with props and interfaces
3. Add `<name>.construct.ts` with the implementation
4. Add `<name>.test.ts` in the same folder
5. Export from `src/constructs/index.ts` and `src/index.ts`
6. Ensure 100% test coverage

## Code Style

- ESLint 9 and Prettier run automatically on commit via husky.
- All AWS managed policy usages must have cdk-nag suppressions with documentation links.
- Return type interfaces use `I<Name>` prefix (e.g. `IDomain`, `IProject`). Props use `<Name>Props`.

## Publishing

Releases are automated via GitHub Actions on merge to `main`. The library is published to:

- npm: `@tonesingleton/cdk-sagemaker-unified-studio`
- PyPI: `cdk-sagemaker-unified-studio`
- Maven: `io.github.tonesingleton:cdk-sagemaker-unified-studio`
- NuGet: `ToneSingleton.CdkSageMakerUnifiedStudio`
- Go: `github.com/tonesingleton/cdk-sagemaker-unified-studio-go`
