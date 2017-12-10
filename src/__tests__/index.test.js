/**
 * Crafted by Crash on 29.11.17.
 */

import { parse, rule } from 'postcss';
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
    const expectedCss = parse('.foo { background: black; glitch: 52px, 0, 0, 54px, 3000px, 48px, #f00, #00f, 1px; }');
    const expectedBeforeNode = rule({ selector: '.foo::before' });
    const expectedAfterNode = rule({ selector: '.foo::after' });
    // Act
    transform(expectedCss);
    // Assert
    expect(expectedCss.nodes[1]).toMatchObject(expectedBeforeNode);
    expect(expectedCss.nodes[2]).toMatchObject(expectedAfterNode);
  });
});
