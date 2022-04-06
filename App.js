import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';
import Camera2 from './components/Camera2';
import DetectionResultScreen from './components/DetectionResultScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera2"
          component={Camera2}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetectionResultScreen"
          component={DetectionResultScreen}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
