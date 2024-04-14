import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, INSETS, SHADOWS, SIZES, STYLES } from "../constants/theme";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import EmergencyModal from "../components/home/EmergencyModal";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../db/firebase";
import MapComponent from "../components/home/MapComponent";
import * as turf from "@turf/turf";
import * as Location from "expo-location";
import * as RoomIndex from "../GeoResources/index.js";
import * as ExitIndex from "../GeoResources/exit/index.js";
import * as PathIndex from "../GeoResources/path/index.js";
import ListButton from "../components/home/ListButton.jsx";
import { useSelector } from "react-redux";

const Home = () => {
  const insets = INSETS();

  const [emergencyModal, setEmergencyModal] = useState(false);

  const [coordinates, setCoordinates] = useState({
    latitude: 18.531662418844746,
    longitude: 73.86693117007346,
  });
  const [destination, setDestination] = useState();
  const [path, setPath] = useState();
  const [houseOutline, setHouseOutline] = useState();
  const [wayOut, setWayOut] = useState();

  const route = useSelector((state) => state.route);

  const selectRoute = async (room) => {
    try {
      const RoomJSON = await RoomIndex[route.Room]();
      setHouseOutline(RoomJSON);
      const DestJSON = await ExitIndex[route.Exit]();
      setDestination(DestJSON);
      const PathJSON = await PathIndex[route.Path]();
      setPath(PathJSON);
      const WayOutJSON = await PathIndex[route.WayOut]();
      setWayOut(WayOutJSON);
    } catch (error) {
      console.log(error);
      // console.error(`Error processing ${room}: ${error.message}`);
    }
  };
  const mapRef = useRef();

  const reCenter = () => {
    const lat = 18.531583;
    const lng = 73.867028;
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      500
    );
  };
  //   useEffect(() => {
  //     addDoc(collection(db, "users"), { username: "prajwal" });
  //   }, []);

  useEffect(() => {
    selectRoute();
  }, [route]);

  return (
    <View style={STYLES.container}>
      <StatusBar style="light" />
      <View
        style={[
          {
            padding: SIZES.m,
            paddingTop: insets.top + SIZES.m,
            backgroundColor: COLORS.primary,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomLeftRadius: SIZES.m,
            borderBottomRightRadius: SIZES.m,
          },
          SHADOWS.small,
        ]}
      >
        <TouchableOpacity onPress={() => setEmergencyModal(true)}>
          <FontAwesome5 name="fire" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: "bolder",
              fontSize: SIZES.l,
              textTransform: "uppercase",
              color: COLORS.white,
            }}
          >
            saferoute
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            reCenter();
          }}
        >
          <MaterialIcons name="gps-fixed" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <MapComponent
        coordinates={coordinates}
        destination={destination}
        houseOutline={houseOutline}
        paths={path}
        wayOut={wayOut}
        ref={mapRef}
      />

      {/* <TouchableOpacity
        style={{
          position: "absolute",
          bottom: SIZES.bottomNavbarHeight,
          left: 0,
          right: 0,
          padding: SIZES.m,
        }}
      >
        <View
          style={[
            {
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.m,
              padding: SIZES.m,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: SIZES.m,
            },
            SHADOWS.small,
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "semibold",
                color: COLORS.white,
                textTransform: "capitalize",
                fontSize: SIZES.m,
              }}
            >
              turn right
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                color: COLORS.white,
                opacity: 0.5,
                fontSize: SIZES.s,
              }}
            >
              towards staircase near room number 508
            </Text>
          </View>
          <View>
            <MaterialIcons name="directions" size={30} color={COLORS.white} />
          </View>
        </View>
      </TouchableOpacity> */}
      <ListButton />
      {emergencyModal && (
        <EmergencyModal
          modalVisible={emergencyModal}
          setModalVisible={setEmergencyModal}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
