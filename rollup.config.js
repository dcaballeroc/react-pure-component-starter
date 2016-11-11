import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'source/index.js',
  dest: 'build/app.js',
  format: 'iife',
  sourceMap: 'inline',
};

const plugins = [
  sass({
    output: 'build/app.css',
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  commonjs({
    exclude: 'node_modules/process-es6/**',
    include: [
      'node_modules/fbjs/**',
      'node_modules/object-assign/**',
      'node_modules/react/**',
      'node_modules/react-dom/**',
    ],
    namedExports: {
      'node_modules/react-dom/index.js': ['render'],
    },
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['es2015', { modules: false } ], 'stage-0', 'react'],
    plugins: ['external-helpers'],
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
];

if (process.env.NODE_ENV == 'production') {
  config.sourceMap = true;
  plugins.push(uglify());
}

config.plugins = plugins;

export default config;
