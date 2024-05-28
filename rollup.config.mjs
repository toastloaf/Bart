import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
 {
  input: "./main.js",
  output: [
   {
    format: 'cjs',
    file: "./bundles/main-bundle.js"
   },
  ],
  plugins: [
   resolve({ browser: true }),
   commonjs()
  ]
 },
];