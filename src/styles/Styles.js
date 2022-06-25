import {useContext} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {GlobalContext} from '../contexts/GlobalContext';

export default function Styles() {
  const {theme} = useContext(GlobalContext).Theme;
  const windowWidth = Dimensions.get('window').width;
  const btnSize = 50;
  const accountIconSize = 36;
  const accountContainerPadding = 8;
  
  const styles = StyleSheet.create({
    drawerIcon: {
        fontSize: 22,
        margin: 0,
      },
      container: {
        backgroundColor: theme.backgroundContainer,
        flex: 1,
      },
      colorRed: {
        color: theme.red,
      },
      colorGreen: {
        color: theme.green,
      },
      // Home
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
      // Account
      addBtn: {
        position: 'absolute',
        bottom: 50,
        right: 10,
        backgroundColor: theme.green,
        width: btnSize,
        height: btnSize,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addBtnText: {
        color: theme.white,
        fontSize: 30,
      },
      footerContainer: {
        backgroundColor: theme.backgroundContent,
        height: 42,
        borderTopWidth: 2,
        borderColor: theme.border,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      footerText: {
        color: theme.text,
        fontWeight: 'bold',
      },
      empty: {
        backgroundColor: theme.backgroundContent,
        flex: 1,
        padding: 20,
      },
      emptyText: {
        fontSize: 20,
        color: theme.text,
        textAlign: 'center',
      },
      input: {
        backgroundColor: theme.backgroundContent,
        borderWidth: 1,
        borderColor: theme.border,
        color: theme.text,
      },
      label: {
        fontSize: 16,
        padding: 5,
        color: theme.text,
      },
      btnSalvar: {
        backgroundColor: theme.green,
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 26,
        color: theme.btnText,
        textAlign: 'center',
        marginTop: 30,
      },
      btnApagar: {
        marginTop: 10,
        backgroundColor: theme.red,
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 26,
        color: theme.btnText,
        textAlign: 'center',
      },
      colorContainer: {
        height: 250,
      },
      checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      checkBoxIcon: {
        fontSize: 26,
        marginRight: 5,
        color: theme.blue,
      },
      checkBoxLabel: {
        fontSize: 16,
        color: theme.text,
      },
      accountContainer: {
        backgroundColor: theme.backgroundContent,
        padding: accountContainerPadding,
        borderBottomWidth: 1,
        borderColor: theme.border,
        flexDirection: 'row',
      },
      accountIcon: {
        width: accountIconSize,
        height: accountIconSize,
        borderRadius: 50,
      },
      accountContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: windowWidth  -accountIconSize -accountContainerPadding,
      },
      accountTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.text
      },
      accountBalance: {
        fontSize: 16,
        fontWeight: '500',
      },
    });
  
    return styles;
}
