import {StyleSheet} from "react-native";

import {getFontFamily, EnumFontFamily} from "../../utils/fonts";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: 8,
    color: "#022150",
    fontFamily: getFontFamily("Inter", EnumFontFamily.medium),
    fontSize: 14,
  },
});
