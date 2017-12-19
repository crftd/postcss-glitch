/**
 * Crafted by Crash on 14.12.17.
 */

import { decl } from 'postcss';

export const getOffsetTop = height => Math.floor(Math.random() * height);
export const getOffsetBottom = (height, offsetTop, glitchHeight) => height - offsetTop - glitchHeight;

export default (height, glitchHeight = 5, _getOffsetTop = getOffsetTop, _getOffsetBottom = getOffsetBottom) => {
  const offsetTop = _getOffsetTop(height);
  const offsetBottom = _getOffsetBottom(height, offsetTop, glitchHeight);
  return decl({ prop: 'clip-path', value: `inset(${offsetTop}px 0 ${offsetBottom}px 0)` });
};
