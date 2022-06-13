import React from 'react';
import {StyleSheet, View} from 'react-native';

import MasterCard from '../../assets/images/mastercard.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/amex.svg';
import Elo from '../../assets/images/elo.svg';

export default function CardFlag({flag}) {

  function FlagComponent({flag, width, height}) {
    const newWidth = !!width ? width : 60
    const newHeight = !!height ? height : 40

    switch (flag) {
      case 'MasterCard':
        return <MasterCard width={newWidth} height={newHeight} />;
      case 'Visa':
        return <Visa width={newWidth} height={newHeight} />;
      case 'AmericanExpress':
        return <AmericanExpress width={newWidth} height={newHeight} />;
      case 'Elo':
        return <Elo width={newWidth} height={newHeight} />;
      default:
        return <></>;
    }
  }

  return (
    <View style={estilo.flag}>
      <FlagComponent  flag={flag}/>
    </View>
  );
}

const estilo = StyleSheet.create({
  flag: {
    // width: '90%',
    // height: '80%',
    backgroundColor: '#eee',
    borderRadius: 5,
  }
});
