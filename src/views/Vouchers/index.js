import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from "../../contexts/ThemeContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { getVouchersByArchive, getVoucherTotalBalance } from "../../services/Vouchers";
import Message from '../../components/shared/Message';
import Voucher from "./Components/Voucher";
import { formatCurrency } from "../../util/functions";

export default function Vouchers({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {eye} = useContext(GlobalContext);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [total, setTotal] = useState(0);
  const isFocused = useIsFocused();
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    if (isFocused) {
      showVouchers();
      getTotal();
    }
  }, [isFocused])

  async function showVouchers() {
    const voucherList = await getVouchersByArchive(false);
    setSelectedVoucher({});
    setVouchers(voucherList);
  }

  async function getTotal() {
    const newTotal = await getVoucherTotalBalance();
    if (newTotal[0].balance) setTotal(newTotal[0].balance);
    else setTotal(0)
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

  function FooterBar() {
    return (
      <View style={estilo.footerContainer}>
        <Text style={estilo.footerText}>Saldo total</Text>
        {eye ?
        <Text style={[estilo.footerText, {color: total >= 0 ? chosenTheme.green : chosenTheme.red}]}>
          {formatCurrency(total)}
        </Text>
        :
        <View>
          <Text style={estilo.footerText}>*****</Text>
        </View>
        }
      </View>
    )
  }

  return (
    <View style={estilo.container}>
      {!!vouchers.length ? (
      <FlatList style={{flex: 1, marginBottom: 42}}
      data={vouchers}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      ) : <Message message="Nenhum voucher disponível"/>}
      <FooterBar />
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
      fontSize: 22,
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
    }
  });
};
