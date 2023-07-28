/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {test, expect} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import {Detail} from 'pages';

test('renders correctly', () => {
  const {getByText} = render(<Detail />);
  const textElement = getByText('Hello, World!');
  expect(textElement).toBeDefined();
});
