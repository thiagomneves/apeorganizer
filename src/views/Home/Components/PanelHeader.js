import React from 'react';
import {Text, View} from 'react-native';
import Styles from '../../../styles/Styles';

export default function PanelHeader({title, date}) {
  const styles = Styles();
  return (
    <View style={styles.row}>
      <Text style={styles.panelHeaderTitle}>{title}</Text>
      <Text style={styles.panelHeaderDate}>{date}</Text>
    </View>
  );
}
