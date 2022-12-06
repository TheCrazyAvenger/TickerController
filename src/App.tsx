import React, {useEffect, useState} from 'react';
import {Appearance, PermissionsAndroid} from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
// @ts-ignore
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from './navigation';
import {persistor, store} from './store';

export const App = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mode = Appearance.getColorScheme();
    setDark(mode === 'dark' ? true : false);
  }, []);

  const getPermitions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
    } else {
      // Permission denied
    }
  };

  useEffect(() => {
    getPermitions();
  }, []);

  return (
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>
        <PaperProvider theme={dark ? MD3DarkTheme : MD3LightTheme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </PersistGate>
  );
};
