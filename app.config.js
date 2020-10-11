import 'dotenv/config';
import { BUILD_VERSION, ANDROID_VERSION, IOS_VERSION } from './version';

export default ({ config }) => {
  const development = process.env.ENV === 'development';

  return {
    ...config,
    version: BUILD_VERSION,
    android: { ...config.android, versionCode: ANDROID_VERSION },
    ios: { ...config.ios, buildNumber: IOS_VERSION },
    extra: {
      setupData: process.env.SETUP_DATA,
    },
    splash: development
      ? {
          image: './assets/pulmo2_splash.png',
          resizeMode: 'contain',
          backgroundColor: '#002f56',
        }
      : {},
  };
};
