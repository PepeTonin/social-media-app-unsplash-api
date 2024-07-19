import {StyleSheet} from "react-native";

import {getFontFamily, EnumFontFamily} from "../../utils/fonts";

export const styles = StyleSheet.create({
  text: {
    color: "#999999",
    fontFamily: getFontFamily("Inter", EnumFontFamily.semiBold),
    fontSize: 16,
  },
});
