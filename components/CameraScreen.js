import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'react-native-axios';
import {RNCamera} from 'react-native-camera';
import {IconButton} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  const [imagePath, setImagePath] = useState(null);
  const [base64img, setBase64img] = useState(null);
  const [res, setRes] = useState(null);

  const CameraLoadingView = () => (
    <View style={styles}>
      <Text>Loading</Text>
    </View>
  );

  const takePicture = async () => {
    try {
      const options = {
        quality: 0.5,
        base64: true,
        exif: true,
        captureAudio: false,
      };
      const data = await camera.current.takePictureAsync(options);
      setImagePath(data.uri);
      setBase64img(data.base64);
    } catch (error) {
      console.error('Failed to take photo!', error);
    }
  };

  const postImg = async () => {
    try {
      const postData = {img: base64img};
      const response = await axios.post(
        'http://127.0.0.1:3000/test/',
        postData,
      );
      setRes(response.data);
      console.log('Server Response: ', res);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    postImg();
    takePicture();
  }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY' || camera == null)
            return <CameraLoadingView />;
          return (
            <View style={styles.cameraview}>
              <TouchableOpacity
                onPress={() => {
                  takePicture();
                  postImg();
                  navigation.navigate('DetectionResultScreen', {
                    res,
                    imagePath,
                  });
                }}
                style={styles.capture}>
                <IconButton icon="camera" size={25} />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraview: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  loading: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
