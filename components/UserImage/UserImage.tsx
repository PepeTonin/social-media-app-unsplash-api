import {Image, View} from "react-native";

import {styles} from "./styles";

type UserImageProps = {
  imageUri: string;
  size: "small" | "large";
};

export function UserImage({imageUri, size}: UserImageProps) {
  return (
    <View
      style={
        size === "small"
          ? styles.imageContainerSmall
          : styles.imageContainerLarge
      }>
      <Image
        source={{uri: imageUri}}
        style={size === "small" ? styles.imageSmall : styles.imageLarge}
      />
    </View>
  );
}
