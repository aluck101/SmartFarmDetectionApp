import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';

import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import DetectionResultScreen from './components/DetectionResultScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen
            name="DetectionResultScreen"
            component={DetectionResultScreen}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
