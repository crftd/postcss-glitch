/**
 * Crafted by Crash on 29.11.17.
 */

import { atRule, decl, Declaration, list, Root, rule, Rule } from 'postcss';
import clipPath from './clip-path.builder';

export const DECLARATION_NAME = 'glitch';

const CONTENT_DECLARATION = decl({ prop: 'content', value: 'attr(data-text)' });
const POSITION_DECLARATION = decl({ prop: 'position', value: 'absolute' });
const TOP_DECLARATION = decl({ prop: 'top', value: '0' });
const LEFT_DECLARATION = decl({ prop: 'left', value: '0' });
const OVERFLOW_DECLARATION = decl({ prop: 'overflow', value: 'hidden' });

export const addPseudo = (declaration: Declaration): void => {
  const [height, firstColor, secondColor, shadowOffset] = list.space(declaration.value);
  const parent: Rule = declaration.parent as Rule;
  const selector: string = parent.selector;
  const beforeRule = rule({ selector: `${selector}::before` });
  beforeRule
    .append(decl({ prop: 'text-shadow', value: `-${shadowOffset} 0 ${firstColor}` }))
    .append(decl({ prop: 'animation', value: 'glitch-animation-before alternate-reverse 3s infinite linear;' }));
  const afterRule = rule({ selector: `${selector}::after` });
  afterRule
    .append(decl({ prop: 'text-shadow', value: `${shadowOffset} 0 ${secondColor}` }))
    .append(decl({ prop: 'animation', value: 'glitch-animation-after alternate-reverse 2s infinite linear;' }));
  const beforeAfterRule = rule({ selectors: [`${selector}::before`, `${selector}::after`] });
  beforeAfterRule
    .append(CONTENT_DECLARATION)
    .append(POSITION_DECLARATION)
    .append(TOP_DECLARATION)
    .append(LEFT_DECLARATION)
    .append(OVERFLOW_DECLARATION)
    .append(decl({ prop: 'clip-path', value: `inset(${height} 0 0 0)` }));
  declaration.parent.after(afterRule);
  declaration.parent.after(beforeRule);
  declaration.parent.after(beforeAfterRule);
};

export const addKeyframes = (declaration: Declaration): void => {
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

export const removeDeclaration = (declaration: Declaration): void => {
  declaration.remove();
};

export const utils = {
  addPseudo,
  addKeyframes,
  removeDeclaration,
  translate: (/* eslint-disable @typescript-eslint/no-unused-vars */ _: Declaration): void => {},
};

export const translate = (declaration: Declaration): void => {
  utils.addPseudo(declaration);
  utils.addKeyframes(declaration);
  utils.removeDeclaration(declaration);
};

utils.translate = translate;

export default (root: Root): void => {
  root.walkDecls(DECLARATION_NAME, utils.translate);
};
