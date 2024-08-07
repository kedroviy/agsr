import {FC} from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

export interface PressableButtonProps {
  title: string;
  styleProps: ViewStyle;
  textStyleProps: TextStyle;
  onPress: () => void;
}

export const PressableButton: FC<PressableButtonProps> = ({
  title,
  onPress,
  styleProps,
  textStyleProps,
}) => (
  <TouchableOpacity onPress={onPress} style={styleProps}>
    <Text style={textStyleProps}>{title}</Text>
  </TouchableOpacity>
);
