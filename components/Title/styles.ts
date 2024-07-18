import {StyleSheet} from "react-native";

import {getFontFamily, EnumFontFamily} from "../../utils/fonts";

export const styles = StyleSheet.create({
  text: {
    fontFamily: getFontFamily("Inter", EnumFontFamily.semiBold),
    color: "#022150",
    fontSize: 24,
  },
});
