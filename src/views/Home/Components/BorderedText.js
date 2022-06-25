import React from 'react';
import {View, Text} from 'react-native';
import Styles from '../../../styles/Styles';

export default function BorderedText({text, color}) {
  const styles = Styles();

  return (
    <View style={[styles.border, {borderColor: color,}]}>
      <Text style={styles.borderedText}>{text}</Text>
    </View>
  );
}
