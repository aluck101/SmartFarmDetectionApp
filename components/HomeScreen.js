import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Linking} from 'react-native';
import {Button, Title} from 'react-native-paper';

function HomeScreen({navigation}) {
  // const [hasPermission, sethasPermission] = useState('not-determined');
  // useCallback(async () => {
  //   console.log('Requesting camera permission...');
  //   const permission = await Camera.requestCameraPermission();
  //   console.log(`Camera permission status: ${permission}`);

  //   if (hasPermission === 'denied') await Linking.openSettings();
  //   sethasPermission(permission);
  // }, []);
  // useEffect(() => {
  //   if (hasPermission === 'authorized');
  // }, [hasPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <Title> Test Environment for Camera Based Object Detection </Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CameraScreen')}>
        Detect Object
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
