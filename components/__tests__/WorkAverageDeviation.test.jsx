import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import WorkAverageDeviation from '../WorkAverageDeviation';
import ProfileContextProvider, {
  WORK_AVE_DEV_CURRENT,
  WORK_AVE_DEV_TOTAL_ACTIVITIES,
  WORK_AVE_DEV_IMPROVEMENT,
  WORK_AVE_DEV_UP,
  WORK_AVE_DEV_DOWN,
  WORK_AVE_DEV_SAME,
  WORK_AVERAGE_DEVIATION,
} from '../../context/profile-context';

describe('WorkAverageDeviation - unit test', () => {
  let component;

  afterEach(cleanup);

  test('should render with improvement up', async () => {
    const profile = {
      [WORK_AVERAGE_DEVIATION]: {
        [WORK_AVE_DEV_CURRENT]: 17.64,
        [WORK_AVE_DEV_TOTAL_ACTIVITIES]: 5,
        [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_UP,
      },
    };

    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <WorkAverageDeviation />
        </ProfileContextProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with improvement down', async () => {
    const profile = {
      [WORK_AVERAGE_DEVIATION]: {
        [WORK_AVE_DEV_CURRENT]: 17.64,
        [WORK_AVE_DEV_TOTAL_ACTIVITIES]: 5,
        [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_DOWN,
      },
    };
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <WorkAverageDeviation />
        </ProfileContextProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with improvement same', async () => {
    const profile = {
      [WORK_AVERAGE_DEVIATION]: {
        [WORK_AVE_DEV_CURRENT]: 17.64,
        [WORK_AVE_DEV_TOTAL_ACTIVITIES]: 5,
        [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_SAME,
      },
    };
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <WorkAverageDeviation />
        </ProfileContextProvider>
      );
    });
    expect(component).toMatchSnapshot();
  });
});
