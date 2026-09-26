import React from 'react';
import { Appbar, useTheme, Button, IconButton } from 'react-native-paper';
import { View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDadosModal } from '../../hooks/use-dados-modal';
import ModalNft from '@/components/modals/modalNft';
import CardsNft from '@/components/CardsNft';
import { router } from 'expo-router';

export default function NftScreen() {
  const tema = useTheme();

  const {
    visible,
    hideModal,
    listaNfts,
    setListaNfts,
    abrirParaEditar,
    abrirParaCriar,
    selecionarParaDetalhes,
    nftSelecionado,
  } = useDadosModal();

  const salvarnovonft = async (id: string | undefined, nomeNft: string, urlImagem: string, precoNft: number, simbolo: string) => {
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
      console.error('Erro ao salvar no AsyncStorage:', error);
    }

    hideModal();
  };

  const deletarNft = async (id: string) => {
    const novaLista = listaNfts.filter((item) => item.id !== id);
    setListaNfts(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:nfts', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao deletar no AsyncStorage:', error);
    }
    hideModal();
  };

  return (
    <View style={[estiloNft.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="Meus NFTS" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          data={listaNfts}
          renderItem={({ item }) => (
            <CardsNft
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              floorPrice={item.floorPrice}
              assetSymbol={item.assetSymbol}
              assetId={item.assetId}
              onPress={() => abrirParaEditar(item)}
              // 2. CLIQUE NO BOTÃO DO CARD: Vai para a tela de DETALHES
              onPressDetalhes={() => {
                selecionarParaDetalhes(item);
                router.push('/DetalhesNft');
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={estiloNft.row}
          contentContainerStyle={estiloNft.listContainer}
        />
      </View>

      <IconButton mode="contained" icon="plus" style={{ margin: 16 }} onPress={() => abrirParaCriar()} />
      <Button mode="contained" icon="plus" style={{ margin: 16 }} onPress={() => abrirParaCriar()}>
        Adicionar NFT
      </Button>

      <ModalNft
        visible={visible}
        nft={nftSelecionado}
        onAdd={salvarnovonft}
        onDelete={deletarNft}
        onCancel={hideModal}
      />
    </View>
  );
}

const estiloNft = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 4 },
  row: { gap: 9 },
  card: { flex: 1, marginBottom: 12, backgroundColor: '#230f2d' },
  cover: { height: 110, borderRadius: 6 },
  content: { paddingTop: 4, gap: 4 },
});