/**
 * Crafted by Crash on 29.11.17.
 */

import { rule, decl, list } from 'postcss';

const CONTENT_DECLARATION = decl({ prop: 'content', value: 'attr(data-text)' });
const POSITION_DECLARATION = decl({ prop: 'position', value: 'absolute' });
const TOP_DECLARATION = decl({ prop: 'top', value: '0' });
const LEFT_DECLARATION = decl({ prop: 'left', value: '0' });
const COLOR_DECLARATION = decl({ prop: 'color', value: '#fff' });
const BACKGROUND_DECLARATION = decl({ prop: 'background', value: '#000' });
const OVERFLOW_DECLARATION = decl({ prop: 'overflow', value: 'hidden' });

export const transform = css => {
  css.walkDecls('glitch', declaration => {
    const [height, firstColor, secondColor, shadowOffset] = list.space(declaration.value);
    const { selector } = declaration.parent;
    const beforeRule = rule({ selector: `${selector}::before` });
    beforeRule.append(decl({ prop: 'text-shadow', value: `-${shadowOffset} 0 ${firstColor}` }));
    const afterRule = rule({ selector: `${selector}::after` });
    afterRule.append(decl({ prop: 'text-shadow', value: `${shadowOffset} 0 ${secondColor}` }));
    const beforeAfterRule = rule({ selectors: [`${selector}::before`, `${selector}::after`] });
    beforeAfterRule
      .append(CONTENT_DECLARATION)
      .append(POSITION_DECLARATION)
      .append(TOP_DECLARATION)
      .append(LEFT_DECLARATION)
      .append(COLOR_DECLARATION)
      .append(BACKGROUND_DECLARATION)
      .append(OVERFLOW_DECLARATION)
      .append(decl({ prop: 'clip-path', value: `inset(${height} 0 0 0)` }));
    declaration.parent.after(afterRule);
    declaration.parent.after(beforeRule);
    declaration.parent.after(beforeAfterRule);
    declaration.remove();
  });
};

export default () => { throw new Error('Not implemented'); };
