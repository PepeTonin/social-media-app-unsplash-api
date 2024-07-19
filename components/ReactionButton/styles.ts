import {StyleSheet} from "react-native";
import {EnumFontFamily, getFontFamily} from "../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginRight: 30,
    alignItems: "center",
  },
  numberOfReactionsText: {
    fontFamily: getFontFamily("Inter", EnumFontFamily.medium),
    fontSize: 14,
    color: "#79869F",
  },
});
