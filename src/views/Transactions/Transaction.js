import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import I18n from "i18n-js";

import { ThemeContext } from "../../contexts/ThemeContext";
import { formatCurrency } from "../../util/functions";

I18n.defaultLocale = "pt-BR";
I18n.locale = "pt-BR";

export default function Transaction({item, selectedTransaction, setSelectedTransaction, editorTransferNavigate}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme});

  useEffect(() => {
    if (Object.keys(selectedTransaction).length > 0) {
      editorTransferNavigate();
    }
  }, [selectedTransaction])

  function Transfer() {
    return (
      <View style={estilo.transactionContent}>
        <View>
          <Text style={estilo.paymentMean}>{!!item.titlefrom ? item.titlefrom : item.transaction_from}</Text>
          <Text style={estilo.paymentMean}>{!!item.titleto ? item.titleto : item.transaction_to}</Text>
        </View>
        <View>
          <Text style={[estilo.value, {color: chosenTheme.red}]}>{formatCurrency(item.transaction_value)}</Text>
          <Text style={[estilo.value, {color: chosenTheme.green}]}>{formatCurrency(item.transaction_value)}</Text>
        </View>
      </View>
    )
  }
  function Revenue() {
    return (
      <View style={estilo.transactionContent}>
        <View>
          <Text style={estilo.paymentMean}>{!!item.titleto ? item.titleto : item.transaction_to}</Text>
          <Text style={[estilo.category, {color: item.categorycolor}]}>{item.categorytitle}</Text>
        </View>
        <View>
          <Text style={[estilo.value, {color: chosenTheme.green}]}>{formatCurrency(item.transaction_value)}</Text>
        </View>
      </View>
    )
  }
  function Expense() {
    return (
      <View style={estilo.transactionContent}>
        <View>
          <Text style={estilo.paymentMean}>{!!item.titlefrom ? item.titlefrom : item.transaction_from}</Text>
          <Text style={[estilo.category, {color: item.categorycolor}]}>{item.categorytitle}</Text>
        </View>
        <View>
          <Text style={[estilo.value, {color: chosenTheme.red}]}>{formatCurrency(item.transaction_value)}</Text>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity onLongPress={() => console.log('longpress')} style={estilo.transactionContainer}>
      <View style={[estilo.dot, estilo[`${item.transaction_type}Dot`]]}></View>
      {item.transaction_type == 'transfer' &&
        <Transfer/>
      }
      {item.transaction_type == 'revenue' &&
        <Revenue/>
      }
      {(item.transaction_type == 'expense' || item.transaction_type == 'cardexpense' || item.transaction_type == 'voucherexpense' ) &&
        <Expense/>
      }
    </TouchableOpacity>
  )
}

const estilos = ({theme}) => {

  return StyleSheet.create({
    transactionContainer: {
      marginHorizontal: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: {
      width: 14,
      height: 14,
      borderRadius: 10,
    },
    transferDot: {
      backgroundColor: theme.purple,
      // borderRadius: 10,
    },
    revenueDot: {
      backgroundColor: theme.green,
      borderRadius: 10,
    },
    expenseDot: {
      backgroundColor: theme.red,
      borderRadius: 10,
    },
    cardexpenseDot: {
      backgroundColor: theme.orange,
      borderRadius: 10,
    },
    voucherexpenseDot: {
      backgroundColor: theme.teal,
      borderRadius: 10,
    },
    transactionContent: {
      backgroundColor: theme.backgroundContent,
      padding: 8,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: "space-between",
      flex: 1,
      marginLeft: 8
    },
    paymentMean: {
      // fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    category: {
      // fontSize: 16,
      fontWeight: 'bold',
    },
    value: {
      // fontSize: 16,
      fontWeight: 'bold',
    },
  })
}
