import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants/theme";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as turf from "@turf/turf";
import * as Location from "expo-location";
import * as RoomIndex from "../../GeoResources/index";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { registerRoute } from "../../redux/reducers/routeReducer";
import { setLocation } from "../../redux/reducers/locationReducer";

const ListButton = ({}) => {
  const dispatch = useDispatch();
  const route = useSelector((state) => state.route);
  const [maps, setMaps] = useState([]);
  const [listModal, setListModal] = useState(false);
  const [position, setPosition] = useState(false);
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [insidePolygon, setInsidePolygon] = useState(false);

  const setPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("I'm Sorry :(");
    }
  };

  const getUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(location));
      const locationData = [
        // location.coords.latitude,
        // location.coords.longitude,
        73.86689019916585, 18.531646118128622,
        // timestamp: location.timestamp,
      ];
      setUserLocation(locationData);
      checkInsidePolygons(locationData);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshData = async () => {
    setPosition(true);
    try {
      getUserLocation();
    } catch (error) {
      console.error(error);
    } finally {
      setPosition(false);
    }
  };

  const checkInsidePolygons = async (userLocation) => {
    setPosition(true);
    for (const fileName in RoomIndex) {
      try {
        const geoJSON = await RoomIndex[fileName]();
        const polygonCoordinates = geoJSON.features[0].geometry.coordinates[0];
        const polygon = turf.geometry("Polygon", [polygonCoordinates]);
        const point = turf.geometry("Point", userLocation);
        const isInside = turf.booleanPointInPolygon(point, polygon);
        setInsidePolygon(isInside);
        console.log(`${fileName}: ${isInside}`);
        if (isInside) {
          dispatch(
            registerRoute({
              Room: "Room18",
              Path: "w18",
              Exit: "Exit1",
              WayOut: "w99",
            })
          );
          // setRoute({
          //   Room: "Room18",
          //   Path: "w18",
          //   Exit: "Exit1",
          //   WayOut: "w99",
          // });
          break;
        }
      } catch (error) {
        console.error(`Error processing ${fileName}: ${error.message}`);
      } finally {
        setPosition(false);
      }
    }
  };

  // const splitTimestamp = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const seconds = date.getSeconds().toString().padStart(2, "0");
  //   return { hours, minutes, seconds };
  // };
  // const { hours, minutes, seconds } = splitTimestamp(timestamp);

  useEffect(() => {
    setPermissions();
    getUserLocation();
  }, []);

  return (
    <View>
      <View
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
              borderRadius: SIZES.l,
              padding: SIZES.m,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: SIZES.m,
            },
            SHADOWS.small,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (position) {
                return;
              }
              setListModal(true);
            }}
            style={{ flex: 1 }}
          >
            <Text
              style={{
                fontFamily: "semibold",
                color: COLORS.white,
                textTransform: "capitalize",
                fontSize: SIZES.m,
              }}
            >
              You are inside {route.Room}
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                color: COLORS.white,
                opacity: 0.5,
                fontSize: SIZES.s,
              }}
            >
              temperature 23.4°C
            </Text>
            <Text
              style={{
                fontFamily: "medium",
                color: COLORS.white,
                opacity: 0.5,
                fontSize: SIZES.s,
              }}
            >
              humidity 60%
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              refreshData();
            }}
          >
            {position ? (
              <ActivityIndicator color={"white"} size={"large"} />
            ) : (
              <Ionicons name="refresh" size={30} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <List
        userLocation={userLocation}
        modalVisible={listModal}
        setModalVisible={setListModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListButton;
