import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'react-native-axios';
import {RNCamera} from 'react-native-camera';

const CameraScreen = ({navigation}) => {
  const camera = useRef(null);
  const [imagePath, setImagePath] = useState(null);
  const [base64img, setBase64img] = useState(null);
  const [res, setRes] = useState(null);

  const takePicture = async () => {
    try {
      const options = {
        quality: 0.5,
        base64: true,
        exif: true,
        captureAudio: false,
      };
      const data = await camera.current.takePictureAsync(options);
      // const path = data.uri;
      // const path64 = data.base64;
      setImagePath(data.uri);
      setBase64img(data.base64);
      console.log('Image file: ', imagePath);
      // console.log('base64: ', base64img);
      // console.log('Image metadata: ', data.exif);
    } catch (error) {
      console.error('Failed to take photo!', error);
    }
  };

  const postImage = () => {
    const postData = {img: base64img};
    axios
      .post('http://192.168.0.252:3000/test/', postData)
      .then(function (response) {
        // console.log('Result response is: ', response.data);
        setRes(response.data);
      })
      .catch(function (error) {
        console.log('Api Error: ', error);
      });
  };

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
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.cameraview}>
        <TouchableOpacity
          onPress={() => {
            takePicture();
            postImage();
            navigation.navigate('DetectionResultScreen', {imagePath});
          }}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
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
});

export default CameraScreen;
