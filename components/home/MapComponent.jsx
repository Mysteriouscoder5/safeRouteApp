import React from "react";
import MapView, {
  Geojson,
  PROVIDER_GOOGLE,
  Animated,
  AnimatedRegion,
} from "react-native-maps";

const MapComponent = ({
  coordinates,
  destination,
  paths,
  houseOutline,
  wayOut,
}) => {
  return (
    <Animated
      // provider={PROVIDER_GOOGLE} // only works in google maps
      style={{ flex: 1 }}
      loadingEnabled={true}
      initialRegion={
        new AnimatedRegion({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.001, // Decreased from 0.0922
          longitudeDelta: 0.001,
        })
      }
    >
      {destination && (
        <Geojson
          geojson={destination}
          strokeColor="#0F0"
          fillColor="rgba(0,255,0,0.5)"
          strokeWidth={2}
        />
      )}
      {houseOutline && (
        <Geojson
          geojson={houseOutline}
          strokeColor="#F00"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={2}
        />
      )}
      {paths && (
        <Geojson
          geojson={paths}
          strokeColor="#F00"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={2}
        />
      )}
      {wayOut && (
        <Geojson
          geojson={wayOut}
          strokeColor="#0F0"
          fillColor="rgba(0,255,0,0.5)"
          strokeWidth={2}
        />
      )}
    </Animated>
  );
};

export default MapComponent;
