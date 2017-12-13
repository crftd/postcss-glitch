/**
 * Crafted by Crash on 29.11.17.
 */

import { atRule, rule, decl, list } from 'postcss';
import clipPath from './clip-path.builder';

const CONTENT_DECLARATION = decl({ prop: 'content', value: 'attr(data-text)' });
const POSITION_DECLARATION = decl({ prop: 'position', value: 'absolute' });
const TOP_DECLARATION = decl({ prop: 'top', value: '0' });
const LEFT_DECLARATION = decl({ prop: 'left', value: '0' });
const COLOR_DECLARATION = decl({ prop: 'color', value: '#fff' });
const BACKGROUND_DECLARATION = decl({ prop: 'background', value: '#000' });
const OVERFLOW_DECLARATION = decl({ prop: 'overflow', value: 'hidden' });

export const addPseudo = declaration => {
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
};

export const addKeyframes = declaration => {
  const [height] = list.space(declaration.value);
  const root = declaration.root();
  const keyframeBefore = atRule({ name: 'keyframes', params: 'glitch-animation-before' });
  const keyframeAfter = atRule({ name: 'keyframes', params: 'glitch-animation-after' });
  for (let progress = 0; progress <= 100; progress += 5) {
    const progressRuleBefore = rule({ selector: `${progress}%` });
    const progressRuleAfter = rule({ selector: `${progress}%` });
    progressRuleBefore.append(clipPath(height));
    progressRuleAfter.append(clipPath(height));
    keyframeBefore.append(progressRuleBefore);
    keyframeAfter.append(progressRuleAfter);
  }
  root.prepend(keyframeAfter);
  root.prepend(keyframeBefore);
};

export default () => { throw new Error('Not implemented'); };
