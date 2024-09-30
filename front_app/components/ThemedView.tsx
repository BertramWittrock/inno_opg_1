import { View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView(props: ThemedViewProps & View['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor('background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
