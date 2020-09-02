import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import Setup from './';
import loadTestData from '../helpers/load-test-data';

jest.useFakeTimers();
jest.mock('Dimensions');
jest.mock('../helpers/load-test-data');

describe('setup', () => {
  let tree;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    loadTestData.mockReturnValue('done');

    await act(async () => {
      tree = create(<Setup />);
    });
    expect(tree).toMatchSnapshot();
  });

  test('should render error correctly', async () => {
    loadTestData.mockReturnValue(Promise.reject('New error caught'));

    await act(async () => {
      tree = create(<Setup />);
    });
    expect(tree).toMatchSnapshot();
  });
});
