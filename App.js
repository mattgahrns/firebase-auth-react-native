import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import firebase from 'firebase';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Constants from 'expo-constants';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let count = 0;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
  });
};

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      destination: null,
      marker: null,
      userPOS: null
    }
  }

  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          userPOS: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      }
    });
  }

  handlePress = (event) => {
    console.log(`pressed ${event.coordinate}`);

  }

  handleMarkerPress = (event) => {
    console.log(`pressed ${event}`);
  }

  handlePoiClick = (event) => {
    // console.log(`pressed ${event.nativeEvent.name}`)
    this.setState({
      region: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      },
      destination: event.nativeEvent,
      marker: {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        title: 'Destination',
        subtitle: 'We\'ll alert you when you are within one mile from here!'
      }
    })
  }

  componentDidUpdate(){
    if(this.state.destination)
      console.log(this.state.destination);
  }

  checkUserPOS = () => {
    if(this.state.userPOS && this.state.marker){
      setInterval(() => {
        if((this.state.userPOS.latitude - this.state.marker.latitude  < .02 && this.state.userPOS.latitude - this.state.marker.latitude > 0)
          || (this.state.userPOS.latitude - this.state.marker.latitude  > -.02 && this.state.userPOS.latitude - this.state.marker.latitude < 0)){
            console.log('WITHIN A MILE')
        }
      }, 1000)
    }
    
  }

  render(){
    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text>
        <Text>My Google Maps Demo</Text> */}
        <MapView 
        provider='google'
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        style={styles.mapStyle}
        region={this.state.region}
        onPress={(event) => this.handlePress(event)}
        onMarkerPress={(event) => this.handleMarkerPress(event)}
        onPoiClick={(event) => this.handlePoiClick(event)}
        >
        {this.state.marker ? <MapView.Marker
            coordinate={{
              latitude: this.state.marker.latitude,
              longitude: this.state.marker.longitude
            }} 
            title={this.state.destination.name}
            subtitle="We'll alert you when you are within one mile from here!"
          /> : null }
          {this.checkUserPOS()}
        </MapView>
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
