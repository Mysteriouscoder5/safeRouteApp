import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
const COLORS = {
  primary: "#1e295a",
  secondary: "#4c5187",
  black: "#161116",
  white: "white",
  bg: "#f8f8f8",
  mainBg: "#e5e6e8",
  grey1: "rgba(29,29,29,.9)",
  grey2: "rgba(29,29,29,.5)",
  grey3: "rgba(29,29,29,.2)",
  dark: "#4164ac",
  light: "#71a8be",
  aluminium: "#A9AAB0",
  red: "#ff0035",
  green: "#00873E",
};
const SIZES = {
  xs: 10,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  width,
  height,
  bottomNavbarHeight: 80,
  addButtonHeight: 50,
};
const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
};
const STYLES = {
  container: { flex: 1 },
  button: [
    {
      backgroundColor: COLORS.primary,
      height: SIZES.addButtonHeight,
      borderRadius: SIZES.m,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: SIZES.m,
      width: "100%",
    },
    SHADOWS.small,
  ],
  buttonText: {
    fontFamily: "bold",
    color: "white",
    fontSize: SIZES.m,
    textTransform: "uppercase",
  },
  searchBarContainer: {
    padding: SIZES.s,
    backgroundColor: COLORS.white,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bg,
    borderRadius: SIZES.m,
    padding: SIZES.m,
  },
  searchInput: { fontFamily: "medium", flex: 1 },
};
const INSETS = () => {
  const insets = useSafeAreaInsets();
  return insets;
};
const BASE_URL = "http://172.20.10.12:8001";
// const BASE_URL = "https://saferouteapp.onrender.com";

export { COLORS, SIZES, SHADOWS, STYLES, INSETS, BASE_URL };
