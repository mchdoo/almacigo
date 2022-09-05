import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export const theme = {
  primary: "#E8A92D",
  onDimmed: "#809401",
  get dimmed() {
    return `${this.primary}25`;
  },
  get dimmer() {
    return `${this.primary}10`;
  },
  background: "#fff" /*FFDB96*/,
  foreground: "#191919",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 30,
    fontFamily: "inter-bold",
  },
  sectionTitle: {
    color: theme.foreground,
    fontSize: 21,
    fontFamily: "inter-bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.primary,
    flexGrow: 1,
    fontSize: 12,
    fontFamily: "inter",
  },
  label: {
    fontFamily: "inter-med",
    fontSize: 14,
  },
});
