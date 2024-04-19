import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import reduxStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import BottomNavigation from "./navigation/BottomNavigation";
import Login from "./screens/Login";
import Otp from "./screens/Otp";
import { useFonts } from "expo-font";
import { loadUser } from "./redux/reducers/userReducer";
import EmergencyContactList from "./screens/EmergencyContactList";
import EditProfile from "./screens/EditProfile";
import { getAllRooms } from "./redux/reducers/roomsReducer";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { updateProfile } from "./redux/reducers/profileReducer";
import { setLocation } from "./redux/reducers/locationReducer";
import { disabled, enabled } from "./redux/reducers/locationPermissionReducer";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmergencyContactList"
        component={EmergencyContactList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const { user, token, loading } = useSelector((state) => state.user);
  const { error, rooms } = useSelector((state) => state.rooms); //to get the rooms data from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const getRooms = async () => {
      dispatch(getAllRooms());
    };
    getRooms();
    // const interval = setInterval(getRooms, 3000);
    // return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <NavigationContainer
      linking={{
        prefixes: [`${Constants.expoConfig?.scheme}://`],
        config: {
          screens: {
            BottomNavigation: {
              screens: {
                Home: "",
                Profile: "profile",
              },
            },
          },
        },

        async getInitialURL() {
          // First, you may want to do the default deep link handling
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();

          if (url != null) {
            return url;
          }

          // Handle URL from expo push notifications
          const response =
            await Notifications.getLastNotificationResponseAsync();

          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }) => listener(url);
          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener(
            "url",
            onReceiveURL
          );

          // Listen to expo push notifications
          const subscription =
            Notifications.addNotificationResponseReceivedListener(
              (response) => {
                const url = response.notification.request.content.data.url;
                // Any custom logic to see whether the URL needs to be handled
                //...

                // Let React Navigation handle the URL
                listener(url);
              }
            );

          return () => {
            // Clean up the event listeners
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}
    >
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmergencyContactList"
              component={EmergencyContactList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const { store, persistor } = reduxStore();
  const [isFontLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    bolder: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    boldest: require("./assets/fonts/Poppins-Black.ttf"),
  });

  const getUserLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      let coordinates = {
        longitude: coords?.longitude,
        latitude: coords?.latitude,
      };
      store.dispatch(setLocation(coordinates));
    } catch (error) {
      console.log(error);
    }
  };

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        store.dispatch(enabled());
        getUserLocation();
      } else {
        console.log("Permission to access location was denied");
        store.dispatch(disabled());
        const location = await AsyncStorage.getItem("location");
        if (location) {
          const parsedLocation = JSON.parse(location);
          let coordinates = {
            longitude: parsedLocation?.coords?.lng,
            latitude: parsedLocation?.coords?.lat,
          };
          store.dispatch(setLocation(coordinates));
        }
      }
    } catch (error) {
      console.log("Error saving location:", error);
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, [store.getState().locationPermission.locationPermission]);

  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("fire-alert", {
        name: "fire-alert",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "fire-alarm-notification-sound.wav",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "You've got mail! 📬",
    //     sound: "fire-alarm-notification-sound.wav",
    //   },
    //   trigger: {
    //     seconds: 2,
    //     channelId: "fire-alert",
    //   },
    // });

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) store.dispatch(updateProfile({ expoPushToken: token }));
    });
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isFontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isFontLoaded]);
  if (!isFontLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
