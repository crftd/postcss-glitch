/**
 * Crafted by Crash on 29.11.17.
 */

import { parse } from 'postcss';
import index, { transform } from '../index';

describe('index', () => {
  it('throws unimplemented error', () => {
    // Arrange
    // Act
    // Assert
    expect(index).toThrowError('Not implemented');
  });

  it('adds ::before and ::after pseudo elements to the rule that contains glitch declaration', () => {
    // Arrange
    const expectedHeight = '48px';
    const expectedSelector = '.foo';
    const expectedShadowOffset = '1px';
    const expectedFirstColor = '#f00';
    const expectedSecondColor = '#00f';
    const expectedCss = parse(`${expectedSelector} { background: black; glitch: ${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}; }`);
    const expectedResultCss = `${expectedSelector} { background: black; }
${expectedSelector}::before, ${expectedSelector}::after { content: attr(data-text); position: absolute; top: 0; left: 0; color: #fff; background: #000; overflow: hidden; clip-path: inset(48px 0 0 0); }
${expectedSelector}::before { text-shadow: -${expectedShadowOffset} 0 ${expectedFirstColor}; }
${expectedSelector}::after { text-shadow: ${expectedShadowOffset} 0 ${expectedSecondColor}; }`;

    // Act
    transform(expectedCss);

    // Assert
    expect(expectedCss.toString()).toEqual(expectedResultCss);
  });
});
