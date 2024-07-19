import {Text, View} from "react-native";

import {styles} from "./styles";

export function NoItemsMessage({message}: {message: string}) {
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
