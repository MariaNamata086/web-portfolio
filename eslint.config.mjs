import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },

  // next/core-web-vitals already brings a subset of jsx-a11y. The full
  // recommended set is worth it on a site that claims accessibility as a skill.
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'),

  // Must stay last: turns off every rule that would fight Prettier.
  ...compat.extends('prettier'),

  {
    rules: {
      // console.warn and console.error are deliberate in the API routes.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
    },
  },
];

export default eslintConfig;
