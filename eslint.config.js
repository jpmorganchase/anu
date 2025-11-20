import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ['src/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': 'off'
    }
  },
  {
    ignores: [
      'dist/**',
      'lib/**',
      'node_modules/**',
      'docs/**',
      'anu-examples/**',
      '**/*.js',
      '**/*.cjs',
      '**/*.mjs',
      'test-results/**',
      'playwright-report/**'
    ]
  }
);
