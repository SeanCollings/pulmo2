import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import Slides from '../Slides';
import { Text } from 'react-native';

describe('Slides - unit test', () => {
  let component;

  const children = [
    <Text key={0}>one</Text>,
    <Text key={1}>two</Text>,
    <Text key={2}>three</Text>,
  ];

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(
        <Slides children={children} totalSlides={children.length} />
      );
    });
    expect(component).toMatchSnapshot();
  });
});
