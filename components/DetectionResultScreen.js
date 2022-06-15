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
        <Text style={styles.textBody}> Result: {res.category} </Text>
        <Text style={styles.textBody}> Confidence: {res.probs} </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mintcream',
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
    fontWeight: 'bold',
    color: 'green',
    fontSize: 20,
  },
});
export default DetectionResultScreen;
