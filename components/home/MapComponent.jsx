import React, { useEffect } from "react";
import MapView, {
  Geojson,
  PROVIDER_GOOGLE,
  Animated,
  AnimatedRegion,
} from "react-native-maps";
import { COLORS, SIZES } from "../../constants/theme";
import { useSelector } from "react-redux";
import { View ,Text} from "react-native";

const RoomTooltip = ({ roomNumber }) => {
  return (
    <View style={{ position: "absolute", zIndex: 999 }}>
      <View style={{ backgroundColor: "white", padding: 5, borderRadius: 5 }}>
        <Text>{roomNumber}</Text>
      </View>
    </View>
  );
};

const MapComponent = React.forwardRef(
  (
    {
      coordinates,
      destination,
      paths,
      houseOutline,
      wayOut,
      redRooms,
      setRedRoomsOutline,
      redRoomsOutline,
    },
    ref
  ) => {
    const route = useSelector((state) => state.route);
    const { rooms } = useSelector((state) => state.rooms);

    return (
      <Animated
        provider={PROVIDER_GOOGLE} // only works in google maps
        style={{ flex: 1 }}
        ref={ref}
        loadingEnabled={true}
        showsUserLocation
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
            latitudeDelta: 0.0006, // Decreased from 0.0922
            longitudeDelta: 0.0006,
          })
        }
      >
        {paths && (
          <Geojson
            geojson={paths}
            strokeColor={COLORS.primary}
            fillColor={COLORS.secondary}
            strokeWidth={5}
          />
        )}
        {Array.from(redRoomsOutline.entries()).map(([key, item], index) => (
          <React.Fragment key={index}>
            <Geojson
              geojson={item}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
            />
            {/* <RoomTooltip roomNumber={key} /> */}
          </React.Fragment>
        ))}
        {destination && (
          <Geojson
            geojson={destination}
            strokeColor="#0F0"
            fillColor="rgba(0,255,0,0.5)"
            strokeWidth={3}
          />
        )}

        {houseOutline && (
          <Geojson
            geojson={houseOutline}
            strokeColor={COLORS.primary}
            fillColor={COLORS.secondary}
            strokeWidth={3}
          />
        )}
        {wayOut && (
          <Geojson
            geojson={wayOut}
            strokeColor="#0F0"
            fillColor="rgba(0,255,0,0.5)"
            strokeWidth={5}
          />
        )}
      </Animated>
    );
  }
);

export default MapComponent;
