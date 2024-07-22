import {
  View,
} from 'react-native';
import { styles } from './styles';
export function LoadingStories(){
  return (
    <View style={styles.container}>
      <View style={styles.storyImage}></View>
      <View style={styles.userName}></View>
    </View>
  );
}