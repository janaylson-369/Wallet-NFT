import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Avatar, useTheme, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDadoCoin } from '../../hooks/use-dado-modal-coin';
import Listamoeda from '@/components/ListaMoeda';
import ModalCoin from '@/components/modals/modalCoin';
import { router } from 'expo-router';
import * as Location from 'expo-location';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="wallet" />;

export default function HomeScreen() {
  const tema = useTheme();

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function getPegarLocalizacao() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  // Executa automaticamente ao carregar a tela
  useEffect(() => {
    getPegarLocalizacao();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  const {
    visible,
    hideModal,
    listaCoins,
    setListaCoins,
    coinSelecionado,
    abrirParaCriar,
    abrirParaEditar,
  } = useDadoCoin();


  const criarOuEditCoin = async (id: string | undefined, nome: string, simbolo: string, saldo: number, preco: number) => {
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
    } else {
      novaLista = listaCoins.map((item) => {
        if (item.id === id) {
          return { ...item, name: nome, symbol: simbolo, balance: saldo, currentPriceUsd: preco };
        }
        return item;
      });
    }

    setListaCoins(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:coins', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao guardar moeda no AsyncStorage:', error);
    }
    hideModal();
  };

  const deletarCoin = async (id: string) => {
    const novaLista = listaCoins.filter((item) => item.id !== id);
    setListaCoins(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:coins', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro não eliminou a moeda no AsyncStorage:', error);
    }
    hideModal();
  };



  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="WALLET NFT" />
      </Appbar.Header>

      <View style={styles.gpsContainer}>
        <Button mode="contained-tonal"  icon="crosshairs-gps" onPress={getPegarLocalizacao}>
          Buscar Localização
        </Button>
        <Text variant="bodySmall" style={styles.gpsTexto} numberOfLines={2}> {text} </Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Title title="Carteira principal" subtitle="Rede Simulação" left={LeftContent} />
          <Card.Content>
            <Text variant="labelMedium" style={{ opacity: 0.7 }}>SALDO TOTAL</Text>
            <Text variant="headlineMedium">R$ 10.000,00</Text>
          </Card.Content>
        </Card>

        <Listamoeda listaCoins={listaCoins} onPress={abrirParaEditar} />

        <IconButton mode="contained" icon="plus" style={{ margin: 16 }} onPress={abrirParaCriar} />
        <IconButton mode="contained" icon="plus" style={{ margin: 16 }} onPress={() => router.push('/TelaFormCoin')} />
        <Button mode="contained" icon="plus" style={{ marginTop: 16, marginBottom: 32 }} onPress={abrirParaCriar}>
          Adicionar Moeda
        </Button>
      </ScrollView>

      <ModalCoin
        visible={visible}
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
  gpsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  gpsTexto: {
    flex: 1,
    opacity: 0.8,
  },
});