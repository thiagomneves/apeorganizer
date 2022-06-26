import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from "../../contexts/ThemeContext";
import { getVouchers, getVouchersByArchive } from "../../services/Vouchers";
import Message from '../../components/shared/Message';
import Voucher from "./Components/Voucher";

export default function Vouchers({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const isFocused = useIsFocused();
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    if (isFocused) showVouchers();
  }, [isFocused])

  async function showVouchers() {
    const voucherList = await getVouchersByArchive(false);
    setSelectedVoucher({});
    setVouchers(voucherList);
  }

  const editorNavigate = () => {
    if (!!Object.keys(selectedVoucher).length) {
      navigation.navigate('Editar Voucher', {selectedVoucher});
    } else {
      navigation.navigate('Novo Voucher', {selectedVoucher});
    }
  }
  function renderItem({item}) {
    return <Voucher item={item}
      selectedVoucher={selectedVoucher}
      setSelectedVoucher={setSelectedVoucher}
      editorNavigate={editorNavigate}
      />
  }
  return (
    <View style={estilo.container}>
      {!!vouchers.length ? (
      <FlatList style={{flex: 1, marginBottom: 42}}
      data={vouchers}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      ) : <Message message="Nenhum voucher disponível"/>}
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => editorNavigate()}>
        <MaterialCommunityIcons style={estilo.addBtnText} name="card-plus-outline"/>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    addBtn: {
      position: 'absolute',
      bottom: 10,
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
      fontSize: 22,
    },
  });
};
