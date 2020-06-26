import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline, Marker } from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  const finalCoords = track.locations[track.locations.length - 1].coords;

  return (
    <>
      <Text h2 style={styles.title}>
        {track.name}
      </Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
        <Marker
          coordinate={{ ...initialCoords }}
          title="Start"
          pinColor="green"
        />
        <Marker coordinate={{ ...finalCoords }} title="Finish" />
      </MapView>
    </>
  );
};

TrackDetailScreen.navigationOptions = {
  title: "Track Detail",
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    borderBottomWidth: 0.6,
    borderColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 4,
    marginVertical: 20,
    marginHorizontal: 20,
  },

  map: {
    height: 300,
    marginHorizontal: 5,
  },
});

export default TrackDetailScreen;
