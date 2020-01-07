import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import firebase from 'firebase';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

export default class App extends React.Component {


  render(){
    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text>
        <Text>My Google Maps Demo</Text> */}
        <MapView provider='google' style={styles.mapStyle} />
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
