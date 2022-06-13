import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Asset from "./Asset";
import Card from "./Card";

export default function Assets() {
  return <ScrollView style={estilo.container}>
    <Card>
      <Asset title="Poupança" balance="20" />
    </Card>

    <Card title="Renda Fixa">
      <Asset title="CDBs" balance="1000" color="#0b0"/>
      <Asset title="LCIs" balance="100" color="#0d0"/>
      <Asset title="LCIs" balance="100" color="#0f0"/>
      <Asset title="Tesouro" balance="100" color="#090"/>
      <Asset title="Fundos de RF" balance="100" color="#070"/>
    </Card>

    <Card title="Renda Variável">
      <Asset title="Ações" balance="1000" color="#00b"/>
      <Asset title="Fundos de Ações" balance="1000" color="#00d"/>
      <Asset title="Fundos Imobiliários" balance="1000" color="#00f"/>
    </Card>

    <Card title="Derivativos">
      <Asset title="Opções" balance="1000" color="#b00"/>
      <Asset title="Futuros" balance="1000" color="#d00"/>
      <Asset title="Termos" balance="1000" color="#f00"/>
    </Card>

    <Card title="Criptomoedas">
      <Asset title="Bitcoin" unity="0.00025" color="#f70" type="BTC"/>
    </Card>
  </ScrollView>
}

const estilo = StyleSheet.create({
  container: {
    padding: 10,
  }
})
