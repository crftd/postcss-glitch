/**
 * Crafted by Crash on 14.12.17.
 */

import { decl } from 'postcss';

export const getOffsetTop = (height: number) => Math.floor(Math.random() * height);
export const getOffsetBottom = (height: number, offsetTop: number, glitchHeight: number) => height - offsetTop - glitchHeight;
export const parseHeight = (height: String): number => Number.parseInt(height.substring(0, height.length - 2), 10);

export const utils = { getOffsetTop, getOffsetBottom, parseHeight };

export default (height: String, glitchHeight: number = 5) => {
  const parsedHeight = utils.parseHeight(height);
  const offsetTop = utils.getOffsetTop(parsedHeight);
  const offsetBottom = utils.getOffsetBottom(parsedHeight, offsetTop, glitchHeight);
  return decl({ prop: 'clip-path', value: `inset(${offsetTop}px 0 ${offsetBottom}px 0)` });
};
