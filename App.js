import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from './src/context/appContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
    <Provider>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  )
}