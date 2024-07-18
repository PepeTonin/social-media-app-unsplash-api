import {StyleSheet} from "react-native";

import { EnumFontFamily, getFontFamily } from "../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#F35BAC",
    width: 20,
    height: 20,
    position: "absolute",
    right: -5,
    top: -5,
    borderRadius: 10,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: getFontFamily("Inter", EnumFontFamily.semiBold),
    color: "white",
  },
});
