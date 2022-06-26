import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getVouchersByArchive } from "../../services/Vouchers";
import Message from "../../components/shared/Message";
import VoucherArchived from "./Components/VoucherArchived";

export default function VouchersArchived() {
  const {chosenTheme} = useContext(ThemeContext);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState({});
  const [unarchive, setunarchive] = useState({});
  const isFocused = useIsFocused();
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    if (isFocused) showVouchers();
  }, [isFocused,unarchive])
  
  async function showVouchers() {
    const voucherList = await getVouchersByArchive(true);
    setSelectedVoucher({});
    setVouchers(voucherList);
  }
  function renderItem({item}) {
    return <VoucherArchived item={item} setunarchive={setunarchive} />
  }
  return (
    <View style={estilo.container}>
      {!!vouchers.length ? (
      <FlatList style={{flex: 1, marginBottom: 42}}
      data={vouchers}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      ) : <Message message="Nenhum voucher arquivado"/>}
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
  });
};
