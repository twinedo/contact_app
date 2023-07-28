import {StyleSheet, View, ViewProps, ViewStyle, Pressable} from 'react-native';
import React, {ReactNode} from 'react';
import {WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';

interface ICard extends ViewProps {
  children: ReactNode;
  borderRadius?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress: () => void;
}

export default function Card(props: ICard) {
  const {children, borderRadius = 10, containerStyle} = props;
  return (
    <Pressable
      {...props}
      style={[styles.container, containerStyle, {borderRadius: borderRadius}]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    backgroundColor: WHITE,
  },
});
