import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import RatingDetail from '../RatingDetail';

describe('RatingDetail - unit test', () => {
  let component;

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(<RatingDetail rating={0} />);
    });
    expect(component).toMatchSnapshot();
  });
});
