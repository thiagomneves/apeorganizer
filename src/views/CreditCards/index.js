import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { getCards } from '../../services/Cards';
import Account from '../Accounts/Account';
import CardEditor from './CardEditor';
import CreditCard from './CreditCard';

const contas = [
  {
    id: 1,
    bank: 'Nubank',
    color: '#90f',
    limit: 5100,
    spent: 50,
    flag: 'as',
  },
  {
    id: 2,
    bank: 'Inter',
    color: '#f90',
    limit: 500,
    spent: 0,
    flag: 'MasterCard',
  },
  {
    id: 3,
    bank: 'BTG',
    color: '#00c',
    limit: 2500,
    spent: 2450,
    flag: 'Visa',
  },
  {
    id: 4,
    bank: 'Neon',
    color: '#0df',
    limit: 1550,
    spent: 0,
    flag: 'Visa',
  },
  {
    id: 5,
    bank: 'PicPay',
    color: '#555',
    limit: 900,
    spent: 200,
    flag: 'MasterCard',
  },
  {
    id: 6,
    bank: 'Next',
    color: '#0f9',
    limit: 650,
    spent: 0,
    flag: 'Elo'
  },
  {
    id: 7,
    bank: 'Amex',
    color: '#08f',
    limit: 650,
    spent: 0,
    flag: 'AmericanExpress'
  }
]

async function showCards() {
  const allCards = await getCards()
}

export default function CreditCards() {

  const renderItem = ({ item }) => (
    <CreditCard flag={item.flag} bank={item.bank} color={item.color} limit={item.limit} spent={item.spent}/>
  );

  return (
    <View>
      <CardEditor/>
      <FlatList 
        data={contas}
        renderItem={ renderItem }
        keyExtractor={item => item.id} />
    </View>
  );
}
