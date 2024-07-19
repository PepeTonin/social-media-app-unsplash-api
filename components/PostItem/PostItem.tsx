import {Image, Text, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons/faEllipsis";

import {Post} from "../../utils/posts";

import {UserImage} from "../UserImage/UserImage";
import {Button} from "../Button/Button";

import {styles} from "./styles";
import {ReactionButton} from "../ReactionButton/ReactionButton";

type PostItemProps = {
  post: Post;
};

export function PostItem({post}: PostItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <Button onPress={() => console.log("pressed: ", post.user.name)}>
            <UserImage imageUri={post.user.image} size="small" />
          </Button>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userNameText}>{post.user.name}</Text>
            <Text style={styles.userLocationText}>
              {post.user.country + ", " + post.user.city}
            </Text>
          </View>
        </View>
        <Button
          onPress={() => {
            console.log("pressed");
          }}>
          <FontAwesomeIcon icon={faEllipsis} size={32} color="#79869F" />
        </Button>
      </View>

      <Image source={{uri: post.postImage}} style={styles.image} />

      <View style={styles.reactionsButtonsContainer}>
        <ReactionButton
          onPress={() => console.log("pressed like: ", post.likes)}
          type="like"
          numberOfReactions={post.likes}
        />
        <ReactionButton
          onPress={() => console.log("pressed comment: ", post.comments)}
          type="comment"
          numberOfReactions={post.comments}
        />
        <ReactionButton
          onPress={() => console.log("pressed save: ", post.saves)}
          type="save"
          numberOfReactions={post.saves}
        />
      </View>
    </View>
  );
}
