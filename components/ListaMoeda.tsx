import React from 'react';
import { List } from 'react-native-paper';

type ListaMoedaProps = {
  listaCoins: any[];
  onPress: (coin: any) => void;
};

const ListaMoeda = ({ listaCoins, onPress }: ListaMoedaProps) => {
  return (
    <List.Section>
      <List.Subheader>Criptoativos</List.Subheader>
      
      {listaCoins.map((coin: any) => (
        <List.Item
          key={coin.id}
          title={`${coin.name}`}
          description={`cotação da moeda: $ ${coin.currentPriceUsd}  saldo: ${coin.balance} ${coin.symbol}`}
          onPress={() => onPress(coin)}
        />
      ))}
    </List.Section>
  );
};

export default ListaMoeda;