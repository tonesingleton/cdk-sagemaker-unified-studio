# Contributing

## Prerequisites

- Node.js >= 18
- npm

## Setup

```bash
npm install
```

## Development Workflow

This project is managed by [projen](https://projen.io). Do not edit generated files directly.

1. Make changes to `.projenrc.ts` for project configuration, or to files in `src/` for construct code.
2. Run `npx projen` to regenerate project files after changing `.projenrc.ts`.
3. Run `npx projen build` to compile, test, lint, and package.

## Common Tasks

```bash
npx projen build      # Full build (compile + test + lint + package)
npx projen compile    # Compile TypeScript via JSII
npx projen test       # Run tests with coverage
npx projen eslint     # Run ESLint
```

## Project Structure

Tests are colocated with their constructs for easy navigation.

```text
src/
  constructs/
    account-roles/
      account-roles.construct.ts    # Construct implementation
      account-roles.interface.ts    # Props and interfaces
      account-roles.test.ts         # Tests
    blueprint/
      ...
    domain/
      ...
    project/
      ...
    project-profile/
      ...
  index.ts                          # Public API exports
```

## Adding a New Construct

1. Create a new folder under `src/constructs/<name>/`
2. Add `<name>.interface.ts` with props and interfaces
3. Add `<name>.construct.ts` with the implementation
4. Add `<name>.test.ts` in the same folder
5. Export from `src/index.ts`
6. Ensure 100% test coverage

## Code Style

- ESLint and Prettier run automatically on commit via husky.
- Use `Array<T>` / `ReadonlyArray<T>` syntax instead of `T[]`.
- All AWS managed policy usages must have cdk-nag suppressions with documentation links.

## Publishing

Releases are automated via GitHub Actions on merge to `main`. The library is published to:

- npm (`@tonesingleton/cdk-sagemaker-unified-studio`)
- PyPI (`cdk-sagemaker-unified-studio`)
- Maven (`io.github.tonesingleton:cdk-sagemaker-unified-studio`)
- NuGet (`ToneSingleton.CdkSageMakerUnifiedStudio`)
- Go (`github.com/tonesingleton/cdk-sagemaker-unified-studio-go`)
