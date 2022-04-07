import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';

const DetectionResultScreen = ({route}) => {
  const {imagePath} = route.params;
  //   console.log('base 64 ', base64);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: imagePath}} style={styles.image_style} />
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
  image_style: {
    width: 300,
    height: 400,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default DetectionResultScreen;
