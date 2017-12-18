/**
 * Crafted by Crash on 14.12.17.
 */

import { decl } from 'postcss';
import * as builder from '../clip-path.builder';

describe('clip-path builder', () => {
  it('returns clip-path declaration', () => {
    // Arrange
    const expectedHeight = 51;
    const expectedOffsetTop = 25;
    const expectedGlitchHeight = 5;
    const expectedOffsetBottom = 21;
    const expectedClipPath = decl({ prop: 'clip-path', value: `inset(${expectedOffsetTop}px 0 ${expectedOffsetBottom}px 0)` });

    const mockGetOffsetTop = () => expectedOffsetTop;
    const mockGetOffsetBottom = () => expectedOffsetBottom;

    // Act
    const actualClipPath = builder.default(expectedHeight, expectedGlitchHeight, mockGetOffsetTop, mockGetOffsetBottom);

    // Assert
    expect(actualClipPath).toEqual(expectedClipPath);
  });

  it('returns top offset', () => {
    // Arrange
    const expectedHeight = 51;
    const expectedOffsetTop = 25;
    const expectedRandomNumber = 0.5;

    const mockMath = Object.create(global.Math);
    const mockRandom = jest.fn(() => expectedRandomNumber);
    mockMath.random = mockRandom;
    global.Math = mockMath;

    // Act
    const actualOffsetTop = builder.getOffsetTop(expectedHeight);

    // Assert
    expect(mockRandom).toHaveBeenCalled();
    expect(actualOffsetTop).toEqual(expectedOffsetTop);
  });

  it('returns bottom offset', () => {
    // Arrange
    const expectedHeight = 51;
    const expectedOffsetTop = 25;
    const expectedGlitchHeight = 5;
    const expectedOffsetBottom = 21;

    // Act
    const actualOffsetBottom = builder.getOffsetBottom(expectedHeight, expectedOffsetTop, expectedGlitchHeight);

    // Assert
    expect(actualOffsetBottom).toEqual(expectedOffsetBottom);
  });
});
