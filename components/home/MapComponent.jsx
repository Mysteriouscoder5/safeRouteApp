import React, { useEffect } from "react";
import MapView, {
  Geojson,
  PROVIDER_GOOGLE,
  Animated,
  AnimatedRegion,
} from "react-native-maps";
import { SIZES } from "../../constants/theme";
import { useSelector } from "react-redux";

const MapComponent = React.forwardRef(
  ({ coordinates, destination, paths, houseOutline, wayOut }, ref) => {
    const route = useSelector((state) => state.route);
    return (
      <Animated
        // provider={PROVIDER_GOOGLE} // only works in google maps
        style={{ flex: 1 }}
        ref={ref}
        loadingEnabled={true}
        onMapReady={() => {
          ref?.current?.fitToCoordinates(
            [
              { latitude: 18.532298600896034, longitude: 73.8665227563722 },
              { latitude: 18.532290080059806, longitude: 73.86749088013497 },
              { latitude: 18.53084876037391, longitude: 73.86758452738128 },
              { latitude: 18.530913685442652, longitude: 73.86650520101328 },
            ],
            {
              animated: true,
            }
          );
        }}
        initialRegion={
          new AnimatedRegion({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.001, // Decreased from 0.0922
            longitudeDelta: 0.001,
          })
        }
      >
        {paths && (
          <Geojson
            geojson={paths}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={5}
          />
        )}
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
  }
);

export default MapComponent;
