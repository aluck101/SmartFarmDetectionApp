import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import RNFS from 'react-native-fs';

const DetectionResultScreen = ({route}) => {
  const {imagePath} = route.params;
  //   console.log('base 64 ', base64);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: imagePath}} style={{width: 300, height: 400}} />
      <Text> Result: {imagePath} </Text>
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
export default DetectionResultScreen;
