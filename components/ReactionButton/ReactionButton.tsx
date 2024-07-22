import {TouchableOpacity, View, Text} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCommentDots} from "@fortawesome/free-regular-svg-icons/faCommentDots";
import {faBookmark} from "@fortawesome/free-regular-svg-icons/faBookmark";
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";

import {styles} from "./styles";

type ReactionButtonProps = {
  numberOfReactions: number;
  type: "like" | "comment" | "save";
  onPress: () => void;
};

export function ReactionButton({
  numberOfReactions = 0,
  type,
  onPress,
}: ReactionButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.container}>
        {type === "like" && (
          <FontAwesomeIcon icon={faHeart} size={24} color="#79869F" />
        )}
        {type === "comment" && (
          <FontAwesomeIcon icon={faCommentDots} size={24} color="#79869F" />
        )}
        {type === "save" && (
          <FontAwesomeIcon icon={faBookmark} size={24} color="#79869F" />
        )}
        <Text style={styles.numberOfReactionsText}>
          {numberOfReactions.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
