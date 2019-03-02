/**
 * Crafted by Crash on 20.12.17.
 */

import * as plugin from '..';

jest.mock('../translator');

describe('index', () => {
  it('initializes plugin', () => {
    // Arrange
    const mockTranslator = require.requireMock('../translator');
    // Act
    const actualPluginFunction = plugin.initialize();
    // Assert
    expect(actualPluginFunction).toEqual(mockTranslator.default);
  });
});
