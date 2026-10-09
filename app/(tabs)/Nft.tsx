import React from 'react';
import { Appbar, useTheme, Button } from 'react-native-paper';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDadosModal } from '../../hooks/use-dados-modal';
import CardsNft from '@/components/CardsNft';
import { router } from 'expo-router';

export default function NftScreen() {
  const tema = useTheme();
  const { listaNfts, selecionarParaDetalhes } = useDadosModal();

  const irParaCriar = () => {
    selecionarParaDetalhes(undefined);
    router.push('/screens/TelaFormNft' as any);
  };

  const irParaEditar = (item: any) => {
    selecionarParaDetalhes(item);
    router.push({ pathname: '/screens/TelaFormNft', params: { nftId: item.id },} as any);
  };

  const navigateToDetails = (selectedNft: any) => {
    selecionarParaDetalhes(selectedNft);
    router.push({pathname: '/screens/DetalhesNft', params: { nftId: selectedNft.id }, } as any);
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
              onPress={() => irParaEditar(item)}
              onPressDetalhes={() => navigateToDetails(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={estiloNft.row}
          contentContainerStyle={estiloNft.listContainer}
        />
      </View>

      <Button mode="contained" icon="plus" style={{ margin: 16 }} onPress={irParaCriar}>
        Adicionar NFT
      </Button>
    </View>
  );
}

const estiloNft = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 4 },
  row: { gap: 9 },
});