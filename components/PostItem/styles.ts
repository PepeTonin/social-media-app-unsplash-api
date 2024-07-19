import {StyleSheet, Dimensions} from "react-native";

import {EnumFontFamily, getFontFamily} from "../../utils/fonts";

const {width} = Dimensions.get("window");
const squarishImageDimensions = width - 40;

export const styles = StyleSheet.create({
  container: {
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2F6",
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userInfoContainer: {
    marginLeft: 10,
    gap: 5,
  },
  userNameText: {
    fontFamily: getFontFamily("Inter", EnumFontFamily.medium),
    fontSize: 16,
    color: "#000000",
  },
  userLocationText: {
    fontFamily: getFontFamily("Inter", EnumFontFamily.regular),
    fontSize: 12,
    color: "#79869F",
  },
  image: {
    width: squarishImageDimensions,
    height: squarishImageDimensions,
    borderRadius: 15,
  },
  reactionsButtonsContainer: {
    flexDirection: "row",
  },
});
