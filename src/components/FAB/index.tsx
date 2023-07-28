import {StyleSheet, Text, View, Pressable, ViewProps} from 'react-native';
import React from 'react';
import globalStyles from 'styles/globalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY, WHITE} from 'styles/colors';
type IFAB = {
  onPress: () => void;
} & ViewProps;

const FAB = (props: IFAB) => {
  return (
    <Pressable
      {...props}
      style={[
        globalStyles.displayFlex,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        styles.container,
      ]}>
      <Ionicons name="add" color={WHITE} size={30} />
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    elevation: 10,
    borderRadius: 40,
    width: 60,
    height: 60,
    backgroundColor: PRIMARY,
  },
});
