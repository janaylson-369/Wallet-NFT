import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Card, Text, List, Avatar, MD3Colors, useTheme } from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="wallet" />;

// id ( string/uuid)
// name (Nome da moeda)
// symbol (Símbolo, ex: "ETH")
// balance (Quantidade em moedas do usuário )
// currentPriceUsd (preço em USD vai ser simulado )


type props = {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  currentPriceUsd: number;
};

export default function HomeScreen() {
  const tema = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="WALLET NFT" />
      </Appbar.Header>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Title 
            title="Carteira Principal"
            subtitle="Rede Simulação"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="labelMedium" style={{ opacity: 0.7 }}>SALDO TOTAL</Text>
            <Text variant="headlineMedium">R$ 10.000,00</Text>
          </Card.Content>
        </Card>

        <List.Section>
          <List.Subheader>Criptoativos</List.Subheader>
          <List.Item
            title="Ethereum (ETH)"
            description="Cotação: $ 3.200,00 | Saldo: 2.5 ETH"
            left={(props) => <List.Icon {...props} icon="currency-eth" />}
          />
          <List.Item
            title="Bitcoin (BTC)"
            description="Cotação: $ 62.000,00 | Saldo: 0.15 BTC"
            left={(props) => <List.Icon {...props} color={MD3Colors.tertiary70} icon="currency-btc" />}
          />
        </List.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 8,
  },
});