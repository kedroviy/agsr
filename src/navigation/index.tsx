import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {AppNavigation} from './Navigation';
import {Color} from '../styles/colors';

export default function AppContainer() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Color.WHITE : Color.EXTRA_LIGHT_GRAY,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AppNavigation />
      </SafeAreaView>
    </NavigationContainer>
  );
}
