/**
 * Crafted by Crash on 20.12.17.
 */

import { plugin } from 'postcss';

import translator from './translator';

const PLUGIN_NAME = 'postcss-glitch';

export const initialize = (): Function => translator;

// @ts-ignore
export default plugin(PLUGIN_NAME, initialize);
