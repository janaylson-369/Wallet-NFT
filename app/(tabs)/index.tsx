import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Avatar, useTheme, Button, IconButton } from 'react-native-paper';
import { useDadoCoin } from '../../hooks/use-dado-modal-coin';
import Listamoeda from '@/components/ListaMoeda';
import ModalCoin from '@/components/modals/modalCoin';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="wallet" />;

export default function HomeScreen() {
  const tema = useTheme();


  const {
    visible, showModal, hideModal,
    listaCoins, setListaCoins,
    arquivoCoins, coinSelecionado, abrirParaCriar,abrirParaEditar
  } = useDadoCoin();

  const criarOuEditCoin = (id: string | undefined, nome: string, simbolo: string, saldo: number, preco: number ) => {
    let novaLista = [];
    if (!id) {
      const novaMoeda = { 
        id: Math.random().toString(36).slice(2, 9), 
        name: nome,
        symbol: simbolo,
        balance: saldo || 0,
        currentPriceUsd: preco || 0,
      };
      
      novaLista = [...listaCoins, novaMoeda];
      
    }else{
      novaLista = listaCoins.map(item => {
        if (item.id === id) {
          return { ...item, name: nome, symbol: simbolo, balance: saldo, currentPriceUsd: preco };
        }
        return item;
      });

    }

    setListaCoins(novaLista);

    try {
        if (!arquivoCoins.exists) arquivoCoins.create();
        arquivoCoins.write(JSON.stringify(novaLista)); 
      } catch (error) {
          console.error('Ei bixo criou não a moeda kkkk:', error);
      }

    hideModal();
  }


  const deletarCoin = (id: string) => {
    const novaLista = listaCoins.filter(item => item.id !== id);
    setListaCoins(novaLista);
    arquivoCoins.write(JSON.stringify(novaLista));
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
        
        <Listamoeda
          listaCoins={listaCoins}
          onPress={abrirParaEditar}
        />

        
          <IconButton mode="contained"  icon="plus" style={{ margin: 16 }} onPress={abrirParaCriar}/>
        <Button mode="contained" icon="plus" style={{ marginTop: 16, marginBottom: 32 }} onPress={showModal}>
          Adicionar Moeda
        </Button>
      </ScrollView>
      
      <ModalCoin
        visible= {visible}
        coin={coinSelecionado}
        onAdd={criarOuEditCoin}
        onDelete={deletarCoin}
        onCancel={hideModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  card: { marginBottom: 8 },
});