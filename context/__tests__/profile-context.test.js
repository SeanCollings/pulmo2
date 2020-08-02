import React, { useContext } from 'react';
import { create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import ProfileContextProvider, { ProfileContext } from '../profile-context';

const MockComponent = () => {
  const context = useContext(ProfileContext);
  expect(context).toMatchSnapshot();
  return null;
};

describe('profile-context', () => {
  afterEach(cleanup);

  test('unit test', () => {
    let context = create(
      <ProfileContextProvider>
        <MockComponent />
      </ProfileContextProvider>
    );

    expect(context).toMatchSnapshot();
  });
});
