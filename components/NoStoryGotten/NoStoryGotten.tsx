import {Text, View} from "react-native";

import {styles} from "./styles";

export function NoStoryGotten() {
  return (
    <View>
      <Text style={styles.text}>No stories available</Text>
    </View>
  );
}
