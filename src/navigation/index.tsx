import {Screens} from '@/constants';
import {HomeScreen} from '@/screens';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import merge from 'deepmerge';
import React, {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  light: NavigationDefaultTheme,
  dark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3DarkTheme, LightTheme);
const CombinedDarkTheme = merge(MD3LightTheme, DarkTheme);

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mode = Appearance.getColorScheme();
    setDark(mode === 'dark' ? true : false);
  }, []);

  return (
    <NavigationContainer
      theme={dark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{title: 'Контроллер бегущей строки'}}
          name={Screens.home}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
