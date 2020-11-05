import 'dotenv/config';
import {
  EXPO_VERSION,
  ANDROID_VERSION,
  IOS_VERSION,
  APP_ENV,
  ENV_STAGING,
} from './release-constants';

export default ({ config }) => {
  const isStaging = APP_ENV === ENV_STAGING;
  const versionCode = APP_ENV.includes('#') ? 0 : parseInt(ANDROID_VERSION);

  return {
    ...config,
    version: EXPO_VERSION,
    android: {
      ...config.android,
      versionCode,
      ...(isStaging ? { package: `${config.android.package}_beta` } : {}),
    },
    ios: { ...config.ios, buildNumber: IOS_VERSION },
    extra: {
      setupData: process.env.SETUP_DATA,
    },
    ...(isStaging
      ? { name: `${config.name} (beta)`, slug: `${config.slug}_beta` }
      : {}),
  };
};
