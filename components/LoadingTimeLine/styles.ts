import {StyleSheet, Dimensions} from "react-native";

const {width} = Dimensions.get("window");
const squarishImageDimensions = width - 40;

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D9D9D9",
  },
  userInfoContainer: {
    marginLeft: 10,
    gap: 10,
  },
  userInfo: {
    width: 130,
    height: 16,
    backgroundColor: "#D9D9D9",
  },
  postImage: {
    width: squarishImageDimensions,
    height: squarishImageDimensions,
    borderRadius: 15,
    backgroundColor: "#D9D9D9",
  },
  reactionsButtonsContainer: {
    flexDirection: "row",
  },
  reactionButton: {
    width: 300,
    height: 20,
    backgroundColor: "#D9D9D9",
  },
});
