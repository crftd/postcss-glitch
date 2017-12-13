/**
 * Crafted by Crash on 29.11.17.
 */

import { decl, rule, root } from 'postcss';
import * as plugin from '../index';

jest.mock('../clip-path.builder');

describe('index', () => {
  const expectedSelector = '.foo';
  const expectedHeight = '48px';
  const expectedShadowOffset = '1px';
  const expectedFirstColor = '#f00';
  const expectedSecondColor = '#00f';

  let expectedRoot;
  let expectedRule;

  beforeEach(() => {
    expectedRoot = root();
    expectedRule = rule({ selector: expectedSelector });
  });

  it('throws unimplemented error', () => {
    // Arrange
    // Act
    // Assert
    expect(plugin.default).toThrowError('Not implemented');
  });

  it('adds ::before and ::after pseudo elements to the rule that contains glitch declaration', () => {
    // Arrange
    const expectedDeclaration = decl({ prop: 'glitch', value: `${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}` });
    expectedRule.append(expectedDeclaration);
    expectedRoot.append(expectedRule);
    const expectedResultCss = `${expectedSelector} {
    glitch: ${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}
}
${expectedSelector}::before, ${expectedSelector}::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background: #000;
    overflow: hidden;
    clip-path: inset(${expectedHeight} 0 0 0)
}
${expectedSelector}::before {
    text-shadow: -${expectedShadowOffset} 0 ${expectedFirstColor}
}
${expectedSelector}::after {
    text-shadow: ${expectedShadowOffset} 0 ${expectedSecondColor}
}`;

    // Act
    plugin.addPseudo(expectedDeclaration);

    // Assert
    expect(expectedRoot.toString()).toEqual(expectedResultCss);
  });

  it('adds 2 @keyframes animation with 21 steps at root and glitch height 5px', () => {
    // Arrange
    const expectedClipPathNumber = 42;
    const expectedOffsetTop = '24px';
    const expectedOffsetBottom = '19px';
    const expectedClipPath = decl({ prop: 'clip-path', value: `inset(${expectedOffsetTop} 0 ${expectedOffsetBottom} 0)` });
    const expectedDeclaration = decl({ prop: 'glitch', value: `${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}` });
    expectedRule.append(expectedDeclaration);
    expectedRoot.append(expectedRule);
    const expectedResultCss = `@keyframes glitch-animation-before {
    0% {
        ${expectedClipPath.toString()}
    }
    5% {
        ${expectedClipPath.toString()}
    }
    10% {
        ${expectedClipPath.toString()}
    }
    15% {
        ${expectedClipPath.toString()}
    }
    20% {
        ${expectedClipPath.toString()}
    }
    25% {
        ${expectedClipPath.toString()}
    }
    30% {
        ${expectedClipPath.toString()}
    }
    35% {
        ${expectedClipPath.toString()}
    }
    40% {
        ${expectedClipPath.toString()}
    }
    45% {
        ${expectedClipPath.toString()}
    }
    50% {
        ${expectedClipPath.toString()}
    }
    55% {
        ${expectedClipPath.toString()}
    }
    60% {
        ${expectedClipPath.toString()}
    }
    65% {
        ${expectedClipPath.toString()}
    }
    70% {
        ${expectedClipPath.toString()}
    }
    75% {
        ${expectedClipPath.toString()}
    }
    80% {
        ${expectedClipPath.toString()}
    }
    85% {
        ${expectedClipPath.toString()}
    }
    90% {
        ${expectedClipPath.toString()}
    }
    95% {
        ${expectedClipPath.toString()}
    }
    100% {
        ${expectedClipPath.toString()}
    }
}
@keyframes glitch-animation-after {
    0% {
        ${expectedClipPath.toString()}
    }
    5% {
        ${expectedClipPath.toString()}
    }
    10% {
        ${expectedClipPath.toString()}
    }
    15% {
        ${expectedClipPath.toString()}
    }
    20% {
        ${expectedClipPath.toString()}
    }
    25% {
        ${expectedClipPath.toString()}
    }
    30% {
        ${expectedClipPath.toString()}
    }
    35% {
        ${expectedClipPath.toString()}
    }
    40% {
        ${expectedClipPath.toString()}
    }
    45% {
        ${expectedClipPath.toString()}
    }
    50% {
        ${expectedClipPath.toString()}
    }
    55% {
        ${expectedClipPath.toString()}
    }
    60% {
        ${expectedClipPath.toString()}
    }
    65% {
        ${expectedClipPath.toString()}
    }
    70% {
        ${expectedClipPath.toString()}
    }
    75% {
        ${expectedClipPath.toString()}
    }
    80% {
        ${expectedClipPath.toString()}
    }
    85% {
        ${expectedClipPath.toString()}
    }
    90% {
        ${expectedClipPath.toString()}
    }
    95% {
        ${expectedClipPath.toString()}
    }
    100% {
        ${expectedClipPath.toString()}
    }
}
${expectedSelector} {
    glitch: ${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}
}`;
    const mockClipPath = require.requireMock('../clip-path.builder');
    mockClipPath.default = jest.fn(() => expectedClipPath.clone());

    // Act
    plugin.addKeyframes(expectedDeclaration);

    // Assert
    expect(mockClipPath.default).toHaveBeenCalledTimes(expectedClipPathNumber);
    expect(expectedRoot.toString()).toEqual(expectedResultCss);
  });
});
