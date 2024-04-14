import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
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
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
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
