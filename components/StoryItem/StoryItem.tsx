import {Image, Text, TouchableOpacity, View} from "react-native";

import {UserImage} from "../UserImage/UserImage";

import {styles} from "./styles";

type StoryItemProps = {
  onPress: (name: string) => void;
  name: string;
  image: string;
};

export function StoryItem({name, image, onPress}: StoryItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(name)}>
      <View style={styles.container}>
        <UserImage size="large" imageUri={image} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
