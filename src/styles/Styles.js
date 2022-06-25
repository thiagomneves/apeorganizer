import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {GlobalContext} from '../contexts/GlobalContext';

export default function Styles() {
  const {theme} = useContext(GlobalContext).Theme;

  const styles = StyleSheet.create({
      drawerIcon: {
        fontSize: 22,
        margin: 0,
      },
      container: {
        backgroundColor: theme.backgroundContainer,
        paddingHorizontal: 10,
        flex: 1,
      },
      panel: {
        backgroundColor: theme.backgroundContent,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginTop: 8,
      },
      panelTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
      },
      panelText: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      panelHeaderTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
      },
      panelHeaderDate: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.text,
      },
      border: {
        borderLeftWidth: 3,
        paddingHorizontal: 16,
      },
      borderedLineText: {
        marginTop: 5
      },
      borderedLineDescription: {
        borderLeftWidth: 3,
        paddingHorizontal: 19,
        color: theme.weakText,
        fontSize: 12,
      },
      borderedText: {
        color: theme.text,
        fontSize: 30,
        fontWeight: 'bold',
      },
    });
  
    return styles;
}
