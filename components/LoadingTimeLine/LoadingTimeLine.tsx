import {View, ViewProps} from "react-native";

import {styles} from "./styles";

export function LoadingTimeLine({style}: ViewProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        <View style={styles.userAvatar}></View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}></View>
          <View style={styles.userInfo}></View>
        </View>
      </View>

      <View style={styles.postImage}></View>

      <View style={styles.reactionsButtonsContainer}>
        <View style={styles.reactionButton}></View>
      </View>
    </View>
  );
}
