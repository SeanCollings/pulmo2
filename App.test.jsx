import React from 'react';
import { act, create } from 'react-test-renderer';

import App from './App';

jest.useFakeTimers();

describe('App', () => {
  let tree;

  test('should hasve 1 child', async () => {
    await act(async () => {
      tree = create(<App />);
    });
    expect(tree.toJSON().children.length).toBe(1);
  });
});
