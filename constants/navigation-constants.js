import { Platform } from 'react-native';

export const defaultNavOptions = (theme) => ({
  headerStyle: {
    backgroundColor: theme.PRIMARY,
    borderBottomWidth: 1,
    borderBottomColor: theme.DARK ? theme.DARK_GRAY : theme.BORDER,
    shadowColor: 'transparent',
    shadowOffset: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontFamily: 'tit-regular',
    opacity: theme.DARK ? 0.87 : 1,
    backgroundColor:
      Platform.OS === 'android' ? theme.PRIMARY : theme.SECONDARY_TEXT,
  },
  headerTintColor:
    Platform.OS === 'android' ? theme.SECONDARY_TEXT : theme.PRIMARY,
});
