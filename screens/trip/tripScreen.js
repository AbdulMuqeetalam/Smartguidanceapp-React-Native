import React from "react";
import {
  Text,
  View,
  StyleSheet,
  style,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import "../../components/googleMapScreeen";
import MapView, { Marker } from "react-native-maps";
import { GOOGLE_API_KEY } from "../../components/enviornemnt";

const TripScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.3753,
          longitude: 69.3451,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: { GOOGLE_API_KEY },
            language: "en",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default TripScreen;
