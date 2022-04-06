import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {Button} from 'react-native-paper';

function HomeScreen({navigation}) {
  const [hasPermission, sethasPermission] = useState('not-determined');
  useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (hasPermission === 'denied') await Linking.openSettings();
    sethasPermission(permission);
  }, []);
  useEffect(() => {
    if (hasPermission === 'authorized');
  }, [hasPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('Camera2')}>
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
