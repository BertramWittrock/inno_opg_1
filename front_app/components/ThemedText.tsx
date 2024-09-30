import { Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText(props: ThemedTextProps & Text['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor('text');

  return <Text style={[{ color }, style]} {...otherProps} />;
}
