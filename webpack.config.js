import { resolve as _resolve } from 'path';
import webpackNodeExternals from 'webpack-node-externals';

export const entry = './src/index.tsx';
export const output = {
  filename: 'bundle.js',
  path: _resolve(__dirname, 'dist'),
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
export const externals = [webpackNodeExternals()];
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
