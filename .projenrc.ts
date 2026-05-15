import { AiInstructions, awscdk, javascript, TextFile } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Tone Singleton',
  authorAddress: 'https://github.com/tonesingleton',
  authorOrganization: true,
  cdkVersion: '2.254.0',
  defaultReleaseBranch: 'main',
  description: 'L2 CDK constructs for AWS SageMaker Unified Studio',
  jsiiVersion: '~5.9.40',
  license: 'Apache-2.0',
  name: '@tonesingleton/cdk-sagemaker-unified-studio',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/tonesingleton/cdk-sagemaker-unified-studio',
  stability: 'experimental',

  keywords: [
    'aws',
    'cdk',
    'aws-cdk',
    'constructs',
    'sagemaker',
    'sagemaker-unified-studio',
    'datazone',
    'data-mesh',
    'data-lake',
    'data-catalog',
    'lakehouse',
    'redshift',
    'bedrock',
    'mlflow',
    'glue',
    'athena',
    'lake-formation',
    'analytics',
    'machine-learning',
    'infrastructure-as-code',
  ],

  // Disable sample code generation
  sampleCode: false,

  // TypeScript: enforce type-only imports at the compiler level
  tsconfigDev: {
    compilerOptions: {
      importsNotUsedAsValues: javascript.TypeScriptImportsNotUsedAsValues.ERROR,
    },
  },

  // Prettier
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: javascript.TrailingComma.ALL,
      printWidth: 120,
    },
  },

  // Dependencies
  deps: ['cdk-nag'],
  bundledDeps: ['cdk-nag'],
  devDeps: ['husky', 'npm-check-updates'],

  // GitHub
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'docs', 'ci', 'refactor', 'test'],
      },
    },
  },

  // Publishing targets
  publishToPypi: {
    distName: 'cdk-sagemaker-unified-studio',
    module: 'cdk_sagemaker_unified_studio',
  },

  publishToMaven: {
    javaPackage: 'io.github.tonesingleton.cdksagemakerunifiedstudio',
    mavenGroupId: 'io.github.tonesingleton',
    mavenArtifactId: 'cdk-sagemaker-unified-studio',
  },

  publishToNuget: {
    dotNetNamespace: 'ToneSingleton.CdkSageMakerUnifiedStudio',
    packageId: 'ToneSingleton.CdkSageMakerUnifiedStudio',
  },

  publishToGo: {
    moduleName: 'github.com/tonesingleton/cdk-sagemaker-unified-studio-go',
  },
});

// AI instructions for coding assistants
new AiInstructions(project);

// ESLint: require Array<T> syntax instead of T[]
project.eslint!.addRules({
  '@typescript-eslint/array-type': ['error', { default: 'generic' }],
});

// ESLint: force `import type` for type-only imports
project.eslint!.addRules({
  '@typescript-eslint/consistent-type-imports': [
    'error',
    { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
  ],
});

// Jest: enforce 100% coverage
project.jest!.config.coverageThreshold = {
  global: {
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100,
  },
};
project.jest!.config.coveragePathIgnorePatterns = ['/node_modules/', '\\.interface\\.ts$'];

// Patch JSII-generated tsconfig.json with jest types for IDE support
project.tasks
  .tryFind('compile')!
  .exec(
    "node -e \"const f='tsconfig.json';const c=JSON.parse(require('fs').readFileSync(f));c.compilerOptions.types=['jest','node'];require('fs').writeFileSync(f,JSON.stringify(c,null,2))\"",
  );

// Exclude test files from JSII published package
project.addPackageIgnore('src/**/*.test.ts');

// Husky pre-commit hook for linting and formatting
project.addTask('prepare', {
  description: 'Install husky git hooks',
  exec: 'husky',
});

new TextFile(project, '.husky/pre-commit', {
  lines: ['npx prettier --write src/ .projenrc.ts', 'npx projen eslint', 'git add -A'],
});

project.addTask('upgrade:interactive', {
  description: 'Interactively upgrade dependencies',
  exec: 'ncu -i',
});

project.synth();
