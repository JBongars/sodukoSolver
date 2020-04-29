import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {
  uglify
} from 'rollup-plugin-uglify';

export default [{
    input: './index.js',
    output: {
      file: 'dist/index.js',
      format: 'iife',
    }
  },
  {
    input: './index.js',
    output: {
      file: 'dist/index.min.js',
      format: 'iife',
    },
    plugins: [
      babel({
        exclude: 'node_modules/** '
      }),
      commonjs(),
      uglify()
    ]
  },
]
