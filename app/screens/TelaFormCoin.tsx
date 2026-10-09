import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDadoCoin } from '@/hooks/use-dado-modal-coin';
import FormCoin from '@/components/form/formCoin';
import { router, useLocalSearchParams } from 'expo-router';

export default function TelaFormCoin() {
  const tema = useTheme();
  const { coinId } = useLocalSearchParams<{ coinId?: string }>();
  const { listaCoins, setListaCoins, coinSelecionado } = useDadoCoin();

  const moedaAtual = coinSelecionado || listaCoins.find((c) => String(c.id) === String(coinId));

  const voltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)' as any);
    }
  };

  const criarOuEditCoin = async (
    id: string | undefined,
    nome: string,
    simbolo: string,
    saldo: number,
    preco: number
  ) => {
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
    voltar();
  };

  const deletarCoin = async (id: string) => {
    const novaLista = listaCoins.filter((item) => item.id !== id);
    setListaCoins(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:coins', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao eliminar moeda no AsyncStorage:', error);
    }
    voltar();
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={voltar} />
        <Appbar.Content title={moedaAtual ? 'Editar Moeda' : 'Nova Moeda'} />
      </Appbar.Header>
      <FormCoin
        coin={moedaAtual}
        onAdd={criarOuEditCoin}
        onDelete={deletarCoin}
        onCancel={voltar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});