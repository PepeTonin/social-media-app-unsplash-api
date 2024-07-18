import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import {styles} from "./styles";

type ButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  hasBadge?: boolean;
  badgeText?: string;
};

export function Button({
  onPress,
  hasBadge = false,
  badgeText,
  children,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6} {...rest}>
      <View>
        {hasBadge ? (
          <View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeText && badgeText}</Text>
            </View>
            {children}
          </View>
        ) : (
          <View style={styles.container}>{children}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}
