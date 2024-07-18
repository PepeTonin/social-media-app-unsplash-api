import {Text, View, ViewProps} from "react-native";

import {styles} from "./styles";

type TitleProps = ViewProps & {
  text: string;
};

export function Title({text, style, ...rest}: TitleProps) {
  return (
    <View {...rest} style={style}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
