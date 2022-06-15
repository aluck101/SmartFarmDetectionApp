import React from 'react';
import {Paragraph, Text} from 'react-native-paper';
import {SafeAreaView, StyleSheet, Image, View} from 'react-native';

const DetectionResultScreen = ({route}) => {
  const {imagePath, res} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTitle}> Detection Result</Text>
      <Paragraph />
      <Image source={{uri: imagePath}} style={styles.image_style} />
      <Paragraph />
      <View>
        <Text> Result: {res.category} </Text>
        <Text> Confidence: {res.probs} </Text>
      </View>
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
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textBody: {
    fontSize: 50,
  },
});
export default DetectionResultScreen;
