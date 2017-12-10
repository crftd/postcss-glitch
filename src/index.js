/**
 * Crafted by Crash on 29.11.17.
 */

import { rule } from 'postcss';

export const transform = css => {
  css.walkDecls('glitch', declaration => {
    const { selector } = declaration.parent;
    declaration.parent.after(rule({ selector: `${selector}::after` }));
    declaration.parent.after(rule({ selector: `${selector}::before` }));
  });
};

export default () => { throw new Error('Not implemented'); };
