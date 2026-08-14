import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },

  // next/core-web-vitals already brings a subset of jsx-a11y. The full
  // recommended set is worth it on a site that claims accessibility as a skill.
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Next's config already registers the jsx-a11y plugin, so only merge in
  // the extra rules/language options from the full recommended set.
  {
    languageOptions: jsxA11y.flatConfigs.recommended.languageOptions,
    rules: jsxA11y.flatConfigs.recommended.rules,
  },

  // Must stay last: turns off every rule that would fight Prettier.
  prettierConfig,

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
