import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDadosModal } from '@/hooks/use-dados-modal';
import FormNft from '@/components/form/formNft';
import { router, useLocalSearchParams } from 'expo-router';

export default function TelaFormNft() {
  const tema = useTheme();
  const { nftId } = useLocalSearchParams<{ nftId?: string }>();
  const { listaNfts, setListaNfts, nftSelecionado } = useDadosModal();

  const nftAtual = nftSelecionado || listaNfts.find((item) => String(item.id) === String(nftId));

  const voltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/Nft' as any);
    }
  };

  const criarOuEditNft = async (
    id: string | undefined,
    nomeNft: string,
    urlImagem: string,
    precoNft: number,
    simbolo: string
  ) => {
    let novaLista = [];
    if (!id) {
      const novonft = {
        id: Math.random().toString(36).slice(2, 9),
        title: nomeNft,
        imageUrl: urlImagem || 'https://picsum.photos/seed/random/400',
        floorPrice: precoNft,
        assetSymbol: simbolo,
        assetId: 1,
      };
      novaLista = [...listaNfts, novonft];
    } else {
      novaLista = listaNfts.map((item) => {
        if (item.id === id) {
          return { ...item, title: nomeNft, imageUrl: urlImagem, floorPrice: precoNft, assetSymbol: simbolo };
        }
        return item;
      });
    }

    setListaNfts(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:nfts', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao guardar NFT no AsyncStorage:', error);
    }
    voltar();
  };

  const deletarNft = async (id: string) => {
    const novaLista = listaNfts.filter((item) => item.id !== id);
    setListaNfts(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:nfts', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao eliminar NFT no AsyncStorage:', error);
    }
    voltar();
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={voltar} />
        <Appbar.Content title={nftAtual ? 'Editar NFT' : 'Novo NFT'} />
      </Appbar.Header>
      <FormNft
        nft={nftAtual}
        onAdd={criarOuEditNft}
        onDelete={deletarNft}
        onCancel={voltar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});