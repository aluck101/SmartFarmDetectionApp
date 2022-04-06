import React, {useState, useRef, useMemo, useCallback} from 'react';
import {Button, TouchableOpacity} from 'react-native-paper';
import {SafeAreaView, View, StyleSheet, ImageBackground} from 'react-native';
import {Linking} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraCaptureError,
} from 'react-native-vision-camera';

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  // const source = useMemo(() => ({uri: `file://${path}`}), []);
  const [photoSource, setPhotoSource] = useState(null);

  // const [{cameraRef}, {takePhoto}] = useCameraDevices(null);

  const devices = useCameraDevices('triple-camera');
  const device = devices.back;

  const takePhotoOptions = useMemo(
    () => ({
      photoCodec: 'jpeg',
      quality: 90,
      skipMetadata: false,
    }),
    [],
  );
  const capture = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Taking photo...');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      const path = photo.path;
      setPhotoSource(`file://${path}`);
      console.log('photo Path...: ', path);
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        switch (e.code) {
          case 'capture/file-io-error':
            console.error('Failed to write photo to disk!');
            break;
          default:
            console.error('Failed to take photo!', e);
            break;
        }
      }
    }
  }, [takePhotoOptions]);

  console.log('Photo source: ', photoSource);

  if (photoSource) {
    return <ImageBackground source={photoSource} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {device != null && (
        <Camera
          ref={camera}
          photo={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
      <Button
        mode="contained"
        onPress={() => {
          capture();
          // navigation.navigate('HomeScreen');
        }}>
        Snap
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default CameraScreen;
