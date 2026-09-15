import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, List, Avatar, useTheme, Portal, Modal, Button, TextInput, IconButton } from 'react-native-paper';
import { useDadoCoin } from '../../hooks/use-dado-modal-coin';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="wallet" />;

export default function HomeScreen() {
  const tema = useTheme();


  const {
    visible, showModal, hideModal,
    listaCoins, setListaCoins,
    nome, setNome,
    simbolo, setSimbolo,
    saldo, setSaldo,
    preco, setPreco,
    arquivoCoins
  } = useDadoCoin();

  const containerStyle = { backgroundColor: tema.colors.elevation.level3, padding: 20, margin: 20, borderRadius: 8 };

  const salvarNovaMoeda = () => {
    const novaMoeda = { 
      id: Math.random().toString(36).slice(2, 9), 
      name: nome,
      symbol: simbolo,
      balance: parseFloat(saldo) || 0,
      currentPriceUsd: parseFloat(preco) || 0,
    };
    
    const novaLista = [...listaCoins, novaMoeda];
    setListaCoins(novaLista);

    try {
        if (!arquivoCoins.exists) arquivoCoins.create();
        arquivoCoins.write(JSON.stringify(novaLista)); 
    } catch (error) {
        console.error('Ei bixo criou não a moeda kkkk:', error);
    }
    
    setNome(''); 
    setSimbolo(''); 
    setSaldo(''); 
    setPreco('');
    hideModal();
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="WALLET NFT" />
      </Appbar.Header>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title 
            title="Carteira principal" 
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
          
          {listaCoins.map((coin: any) => (
            <List.Item
              key={coin.id} 
              title={`${coin.name}`}
              description={`cotação da moeda: $ ${coin.currentPriceUsd}  saldo: ${coin.balance} ${coin.symbol}`}
              left={(props) => <List.Icon {...props} icon="" color={tema.colors.primary} />}
            />
          ))}

        </List.Section>
          <IconButton mode="contained"  icon="plus" style={{ margin: 16 }} onPress={showModal}/>
        <Button mode="contained" icon="plus" style={{ marginTop: 16, marginBottom: 32 }} onPress={showModal}>
          Adicionar Moeda
        </Button>
      </ScrollView>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text variant="titleLarge" style={{ marginBottom: 16 }}>Nova Moeda</Text>
          
          <TextInput 
            mode="outlined" 
            label="Nome (EX: Solana)" 
            value={nome} 
            onChangeText={setNome} 
            style={{ marginBottom: 12 }} 
            autoFocus
          />
          <TextInput 
            mode="outlined" 
            label="Símbolo da moeda" 
            value={simbolo} 
            onChangeText={setSimbolo} 
            style={{ marginBottom: 12 }} 
          />
          <TextInput 
            mode="outlined" 
            label="saldo" 
            value={saldo} 
            onChangeText={setSaldo} 
            keyboardType="numeric" 
            style={{ marginBottom: 12 }} 
          />
          <TextInput 
            mode="outlined" 
            label="Preço do Dolar" 
            value={preco} 
            onChangeText={setPreco} 
            keyboardType="numeric" 
            style={{ marginBottom: 24 }} 
          />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button mode="text" onPress={hideModal}>Cancelar</Button>
            <Button mode="contained" onPress={salvarNovaMoeda}>Salvar</Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  card: { marginBottom: 8 },
});