import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts', '*.tsbuildinfo'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
]

export default eslintConfig
