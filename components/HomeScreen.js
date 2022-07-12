import React from 'react';
import {SafeAreaView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Title, Paragraph} from 'react-native-paper';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.header}>Camera Based Detection</Title>
      <Image
        source={require('../assets/img/pl.jpg')}
        style={{width: 400, height: 400}}
      />
      <Paragraph>Test Environment for Camera Based Object Detection</Paragraph>
      <TouchableOpacity>
        <Button
          icon="camera"
          mode="outlined"
          onPress={() => navigation.navigate('CameraScreen')}>
          Detect Object
        </Button>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mintcream',
  },
});
export default HomeScreen;
