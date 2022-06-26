import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import CurrencyInput from 'react-native-currency-input';

import { GlobalContext } from "../../contexts/GlobalContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import VoucherTypePicker from "./Components/VoucherTypePicker";
import CheckBox from "../../components/shared/CheckBox";
import { addVoucher, editVoucher, removeVoucher, setArchiveVoucher } from "../../services/Vouchers";

export default function VoucherEditor({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave, destroy, setDestroy, archive, setArchive} = useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('other');
  const [balance, setBalance] = useState(0);
  const [sumTotal, setSumTotal] = useState(true);
  const [color, setColor] = useState('#ffffff');
  const [flag, setFlag] = useState('');
  const route = useRoute();
  const selectedVoucher = route.params.selectedVoucher;
  const voucherToUpdate = Object.keys(selectedVoucher).length > 0;
  const estilo = estilos(chosenTheme);
  const isFocused = useIsFocused();

  useEffect(() => {
    fillEditor();
    if (save) savePressed();
    if (destroy) deletePressed();
    if (archive) archivePressed();
  }, [isFocused, save, destroy, archive])

  function savePressed() {
    voucherToUpdate ? updateVoucher() : saveVoucher()
    setSave(false);
  }

  function deletePressed() {
    deleteConfirm();
    setDestroy(false);
  }

  function archivePressed() {
    archiveConfirm();
    setArchive(false)
  }

  function archiveConfirm() {
    Alert.alert(
      "Arquivar voucher?",
      `Tem certeza que deseja arquivar o voucher ${title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            archiveVoucher();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  function deleteConfirm() {
    Alert.alert(
      "Apagar voucher?",
      `Tem certeza que deseja apagar o voucher ${title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            deleteVoucher();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  async function saveVoucher() {
    const oneVoucher = {
      title,
      color,
      balance,
      sumtotal: sumTotal,
      type,
      flag,
      archive: false,
    }
    await addVoucher(oneVoucher);
    navigation.goBack();
  }

  async function updateVoucher() {
    const oneVoucher = {
      title,
      color,
      balance,
      sumtotal: sumTotal,
      type,
      flag,
      id: selectedVoucher.id,
    }
    await editVoucher(oneVoucher);
    navigation.goBack();
  }

  async function deleteVoucher() {
    const oneVoucher = {
      id: selectedVoucher.id,
    }
    await removeVoucher(oneVoucher);
    navigation.goBack();
  }

  function archiveVoucher() {
    const oneVoucher = {
      id: selectedVoucher.id,
      archive: archive
    }
    setArchiveVoucher(oneVoucher);
    navigation.goBack();
  }
  
  function fillEditor() {
    if (voucherToUpdate) {
      setTitle(selectedVoucher.title);
      setBalance(selectedVoucher.balance);
      setColor(selectedVoucher.color);
      setType(selectedVoucher.type);
      setSumTotal(selectedVoucher.sumtotal);
      setFlag(selectedVoucher.flag);
    }
  }

  return <View style={estilo.container}>
      <View style={estilo.balance}>
        <Text style={estilo.labelBalance}>Saldo do Voucher</Text>
        <CurrencyInput
          style={estilo.inputBalance}
          value={balance}
          onChangeValue={setBalance}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
        />
      </View>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome"
        value={title}
      />
      <View style={estilo.picker}>
        <VoucherTypePicker setType={setType} type={type}/>
      </View>
      <CheckBox label="Somar ao total da tela inicial" check={sumTotal} setCheck={setSumTotal}/>
  </View>
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    balance: {
      backgroundColor: theme.backgroundContent,
      padding: 10,
    },
    labelBalance: {
      fontSize: 16,
      padding: 5,
      color: theme.strong,
      fontSize: 20,
    },
    inputBalance: {
      color: theme.text,
      fontSize: 28,
      fontWeight: '600',
    },
    input: {
      backgroundColor: theme.backgroundContent,
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
      fontSize: 18,
      paddingHorizontal: 10,
    },
    picker: {
      backgroundColor: theme.backgroundContent,
    },
  })
}
