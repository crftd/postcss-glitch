import plugin, { DECLARATION_NAME, PLUGIN_NAME, postcss } from '../index';
import { createMock } from 'ts-auto-mock';
import Root from 'postcss/lib/root';
import mock_utils from '../translator';
import { Helpers } from 'postcss';

jest.mock('../translator');

describe('index', () => {
  it('should export postcss = true', () => {
    // Arrange
    // Act
    // Assert
    expect(postcss).toEqual(true);
  });

  describe('Plugin', () => {
    it('should have PLUGIN_NAME', () => {
      // Arrange
      // Act
      const actualPlugin = plugin();
      // Assert
      expect(actualPlugin.postcssPlugin).toEqual(PLUGIN_NAME);
    });

    describe('Once', () => {
      it('should add glitch declaration', () => {
        // Arrange
        const expected_root: Root = new Root();
        const expected_helpers: Helpers = createMock<Helpers>();
        const actualPlugin = plugin();
        const mock_walkDecls = jest.fn();

        expected_root.walkDecls = mock_walkDecls;

        // Act
        if (actualPlugin.Once) {
          actualPlugin.Once(expected_root, expected_helpers);
        }

        // Assert
        expect(mock_walkDecls).toBeCalledWith(DECLARATION_NAME, mock_utils.translate);
      });
    });
  });
});
