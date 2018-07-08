/**
 * Crafted by Crash on 29.11.17.
 */

import { decl, rule, root } from 'postcss';

jest.mock('../clip-path.builder');

describe('translator', () => {
  const expectedSelector = '.foo';
  const expectedHeight = '48px';
  const expectedShadowOffset = '1px';
  const expectedFirstColor = '#f00';
  const expectedSecondColor = '#00f';

  let expectedRoot;
  let expectedRule;

  let translator;

  beforeEach(() => {
    translator = require('../translator');
    expectedRoot = root();
    expectedRule = rule({ selector: expectedSelector });
  });

  it('translates parsed root', () => {
    // Arrange
    const expectedDeclarationName = translator.DECLARATION_NAME;
    const expectedResult = {};

    const fakeTranslate = () => {};

    expectedRoot.walkDecls = jest.fn();
    translator.utils.translate = fakeTranslate;

    // Act
    translator.default(expectedRoot, expectedResult);

    // Assert
    expect(expectedRoot.walkDecls).toHaveBeenCalledWith(expectedDeclarationName, fakeTranslate);
  });

  it('translate declaration', () => {
    // Arrange
    const expectedDeclaration = decl({ prop: 'glitch', value: `${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}` });

    const mockAddPseudo = jest.fn();
    const mockAddKeyframes = jest.fn();
    const mockRemoveDeclaration = jest.fn();

    translator.utils.addPseudo = mockAddPseudo;
    translator.utils.addKeyframes = mockAddKeyframes;
    translator.utils.removeDeclaration = mockRemoveDeclaration;

    // Act
    translator.translate(expectedDeclaration);

    // Assert
    expect(mockAddPseudo).toHaveBeenCalledWith(expectedDeclaration);
    expect(mockAddKeyframes).toHaveBeenCalledWith(expectedDeclaration);
    expect(mockRemoveDeclaration).toHaveBeenCalledWith(expectedDeclaration);
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
    overflow: hidden;
    clip-path: inset(${expectedHeight} 0 0 0)
}
${expectedSelector}::before {
    text-shadow: -${expectedShadowOffset} 0 ${expectedFirstColor};
    animation: glitch-animation-before 3s infinite linear alternate-reverse;
}
${expectedSelector}::after {
    text-shadow: ${expectedShadowOffset} 0 ${expectedSecondColor};
    animation: glitch-animation-after 2s infinite linear alternate-reverse;
}`;

    // Act
    translator.addPseudo(expectedDeclaration);

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
    translator.addKeyframes(expectedDeclaration);

    // Assert
    expect(mockClipPath.default).toHaveBeenCalledTimes(expectedClipPathNumber);
    expect(expectedRoot.toString()).toEqual(expectedResultCss);
  });

  it('removes glitch declaration', () => {
    // Arrange
    const expectedDeclaration = decl({ prop: 'glitch', value: `${expectedHeight} ${expectedFirstColor} ${expectedSecondColor} ${expectedShadowOffset}` });
    expectedRule.append(expectedDeclaration);
    expectedRoot.append(expectedRule);
    const expectedResultCss = `${expectedSelector} {}`;

    // Act
    translator.removeDeclaration(expectedDeclaration);

    // Assert
    expect(expectedRoot.toString()).toEqual(expectedResultCss);
  });
});
