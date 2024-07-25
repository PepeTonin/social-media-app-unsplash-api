import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storiesFlatList: {
    gap: 20,
  },
  storiesFooterFlatList: {
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "center",
  },
  postsContainer: {
    flex: 1,
  },
  postsFlatList: {
    gap: 30,
  },
  postsFooterFlatList: {
    paddingBottom: 40,
    paddingTop: 20,
  },
});
