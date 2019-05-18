/**
 * Crafted by Crash on 20.12.17.
 */

import * as plugin from '..';
import mockTranslator from '../translator';

jest.mock('../translator');

describe('index', (): void => {
  it('initializes plugin', (): void => {
    // Arrange

    // Act
    const actualPluginFunction = plugin.initialize();

    // Assert
    expect(actualPluginFunction).toEqual(mockTranslator);
  });
});
