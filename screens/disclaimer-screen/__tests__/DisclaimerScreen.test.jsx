import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import DisclaimerScreen, {
  disclaimerScreenOptions,
  disclaimerScreenOptionsEntry,
} from '../DisclaimerScreen';
import ProfileContextProvider from '../../../context/profile-context';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('DisclaimerScreen - unit test', () => {
  let tree;
  const routeTrue = { params: { readOnly: true } };
  const routeFalse = { params: { readOnly: false } };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render readOnly true', async () => {
    await act(async () => {
      tree = create(
        <ProfileContextProvider>
          <DisclaimerScreen route={routeTrue} />
        </ProfileContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render readOnly false', async () => {
    await act(async () => {
      tree = create(
        <ProfileContextProvider>
          <DisclaimerScreen route={routeFalse} />
        </ProfileContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  describe('disclaimerScreenOptions', () => {
    test('options', () => {
      const options = disclaimerScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = disclaimerScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });

  describe('disclaimerScreenOptionsEntry', () => {
    test('optionsEntry', () => {
      const optionsEntry = disclaimerScreenOptionsEntry();
      expect(optionsEntry).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = disclaimerScreenOptionsEntry().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
