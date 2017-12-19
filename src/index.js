/**
 * Crafted by Crash on 20.12.17.
 */

import { plugin } from 'postcss';

import translator from './translator';

const PLUGIN_NAME = 'postcss-glitch';

export const initialize = () => translator;

const glitchPlugin = plugin(PLUGIN_NAME, initialize);

export default glitchPlugin;
module.exports = glitchPlugin;
