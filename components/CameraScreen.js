import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import axios from 'react-native-axios';
import {RNCamera} from 'react-native-camera';
import {IconButton} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';

const CameraScreen = ({navigation}) => {
  const camera = useRef({});
  const [imagePath, setImagePath] = useState(null);
  const [base64img, setBase64img] = useState('');
  const [res, setRes] = useState({});

  const CameraLoadingView = () => (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  );

  const takePicture = async () => {
    try {
      const options = {
        quality: 0.3,
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
        'http://localhost:3000/prediction/',
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
  }, []);

  useEffect(() => {
    takePicture();
  }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({status}) => {
          if (status !== 'READY' || camera === null) {
            return <CameraLoadingView />;
          }
          return (
            <View style={styles.cameraview}>
              <TouchableOpacity
                onPress={() => {
                  takePicture();
                  postImg();
                }}
                style={styles.capture}>
                <IconButton icon="camera" size={50} />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
      <Image source={{uri: imagePath}} style={styles.image_style} />
      <Text style={styles.textBody}> Result: {res.category} </Text>
      <Text style={styles.textBody}> Confidence: {res.probs} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'mint',
  },
  preview: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraview: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image_style: {
    flex: 3,
    width: 400,
    height: 200,
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    margin: 20,
  },
  textBody: {
    flex: 1,
    fontWeight: 'bold',
    color: 'green',
    fontSize: 15,
  },
  loading: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
