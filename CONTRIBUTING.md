# Contributing

Thank you for your interest in contributing to this CDK construct library.

## Prerequisites

- Node.js >= 24 (see `.nvmrc`)
- Yarn Berry (installed automatically via corepack)
- For full multi-language packaging: Maven, .NET SDK, Go, Python 3

## Setup

```bash
corepack enable
yarn install
```

## Development Workflow

This project is managed by [projen](https://projen.io). **Do not manually edit generated files** — they are marked with a header comment. To change project configuration, edit `.projenrc.ts` and run `yarn projen` to regenerate.

```bash
yarn projen              # Regenerate project files after .projenrc.ts changes
yarn projen build        # Full build: compile + test + lint + package
yarn projen compile      # Compile TypeScript via jsii
yarn projen test         # Run tests with 100% coverage enforcement
yarn projen eslint       # Run ESLint
yarn projen package:js   # Package for npm only
yarn projen package-all  # Package for all languages (js, python, java, dotnet, go)
```

## Project Structure

Each construct lives in its own directory with colocated tests:

```text
src/constructs/
  <name>/
    <name>.construct.ts      # Implementation
    <name>.interface.ts      # Props, attributes, and I* interfaces
    <name>.test.ts           # Tests (100% branch/line/function coverage)
    constructs/              # Internal sub-constructs (e.g. custom resources)
  index.ts                   # Barrel file — all public exports
```

## Adding a New Construct

1. Create `src/constructs/<name>/` with the three standard files.
2. Define the props interface (`<Name>Props`) and the exposed interface (`I<Name>`).
3. Define the attributes interface (`<Name>Attributes`) for cross-stack imports.
4. Implement the construct class with `implements I<Name>`.
5. Add a `static fromAttributes(scope, id, attrs): I<Name>` factory method.
6. Export all public types from `src/constructs/index.ts`.
7. Achieve 100% test coverage.
8. Run `yarn projen build` — it must pass.

A construct is **not considered complete** without its `fromAttributes` factory method when cross-stack referencing is applicable.

## Design Guidelines

This is an L2 CDK construct library. Follow these conventions:

### Interfaces

- `I<Name>` — read-only contract exposing the construct's attributes.
- `<Name>Props` — input properties for the constructor.
- `<Name>Attributes` — minimal fields needed to import an existing resource from another stack.

### Factory Methods

Every construct that represents a deployable resource must have:

```ts
public static fromAttributes(scope: Construct, id: string, attrs: FooAttributes): IFoo {
  class ImportedFoo extends Construct implements IFoo {
    public readonly fooId = attrs.fooId;
    // ...
  }
  return new ImportedFoo(scope, id);
}
```

### Validation

- Throw eagerly in the constructor for invalid props when values are known at construct time.
- Inline validation at the point the prop is consumed — no standalone helper functions.

### CDK Nag

- All constructs are validated against the AWS Solutions rule pack.
- Use `Validations.of(construct).acknowledge(...)` (variadic form) with a documentation link as the reason.

### Member Ordering

Follow the eslint `@typescript-eslint/member-ordering` rule:

1. Static properties
2. Static methods
3. Instance properties
4. Constructor
5. Instance methods

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). PR titles are linted:

| Prefix      | Use for                                |
| ----------- | -------------------------------------- |
| `feat:`     | New constructs, props, or capabilities |
| `fix:`      | Bug fixes                              |
| `refactor:` | Code changes that don't alter behavior |
| `docs:`     | Documentation only                     |
| `chore:`    | Tooling, dependencies, CI              |
| `test:`     | Test-only changes                      |
| `ci:`       | CI/CD workflow changes                 |

## Code Style

- ESLint and Prettier run automatically on commit via a husky pre-commit hook.
- Use `Array<T>` syntax (not `T[]`) — enforced by eslint.
- Use `import type` for type-only imports — enforced by eslint.
- TSDoc all public APIs with `@default`, `@see`, and `@example` where applicable.

## Publishing

The library is published to five package registries:

| Registry | Package                                                    |
| -------- | ---------------------------------------------------------- |
| npm      | `@tonesingleton/cdk-sagemaker-unified-studio`              |
| PyPI     | `cdk-sagemaker-unified-studio`                             |
| Maven    | `io.github.tonesingleton:cdk-sagemaker-unified-studio`     |
| NuGet    | `ToneSingleton.CdkSageMakerUnifiedStudio`                  |
| Go       | `github.com/tonesingleton/cdk-sagemaker-unified-studio-go` |

Publishing is currently disabled (`releaseToNpm: false`, `release: false` in `.projenrc.ts`). Re-enable when ready.

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.

---

## Contact & Support

This library was designed and built by [Tone Singleton](https://tonesingleton.com).

For questions about the library's design, usage, or to discuss extending it:

- **Website:** [tonesingleton.com/contact](https://tonesingleton.com/contact)
- **Book a meeting:** [tonesingleton.com/meet](https://tonesingleton.com/meet)
