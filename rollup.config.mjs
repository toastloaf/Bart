import resolve from '@rollup/plugin-node-resolve';

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
   resolve(),
  ]
 },
];