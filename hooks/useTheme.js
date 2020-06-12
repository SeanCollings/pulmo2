import { useContext } from 'react';

import { THEME, SettingsContext } from '../context/settings-context';
import { DARK_MODE, COLORS_DARK, COLORS } from '../constants/constants';

export const useTheme = () => {
  const { settingsContext } = useContext(SettingsContext);

  return settingsContext[THEME] === DARK_MODE ? COLORS_DARK : COLORS;
};
