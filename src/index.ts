/**
 * Crafted by Crash on 20.12.17.
 */

import { plugin, Root, Transformer } from 'postcss';
import utils from './translator';

const DECLARATION_NAME = 'glitch';
const PLUGIN_NAME = 'postcss-glitch';

const transformer: Transformer = (root: Root) => {
  root.walkDecls(DECLARATION_NAME, utils.translate);
};

export default plugin(PLUGIN_NAME, (): Transformer => transformer);
