import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import axios from "axios";
export const saveToStorage = async ({ key, value }) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = async ({ key }) => {
  await AsyncStorage.removeItem(key);
};

export const getNetworkInfo = async () => {
  const { isConnected, isInternetReachable, type } =
    await Network.getNetworkStateAsync();

  return { isConnected, isInternetReachable, type };
};

export const getDistanceAndTime = async (origin, destination) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.latitude},${destination.longitude}&origins=${origin.latitude},${origin.longitude}&key=${process.env.EXPO_PUBLIC_GMAPS_API_KEY}`
    );
    const distance =
      response?.data?.rows[0]?.elements[0]?.distance?.value / 1000;
    const duration = response?.data?.rows[0]?.elements[0]?.duration.value / 60;
    const result = { distance, duration };
    return result;
  } catch (error) {
    return error;
  }
};
