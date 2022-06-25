import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {GlobalContext} from '../contexts/GlobalContext';

export default function Styles() {
  const {chosenTheme} = useContext(GlobalContext);

  const styles = StyleSheet.create({
      drawerIcon: {
        fontSize: 22,
        margin: 0,
      },
    });
  
    return styles;
}
