import React from 'react';
import { Appbar, useTheme, Button, IconButton} from 'react-native-paper';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDadosModal } from '../../hooks/use-dados-modal';
import ModalNft from '@/components/modals/modalNft';
import CardsNft from '@/components/CardsNft';



export default function NftScreen() {

  const tema = useTheme(); 

  const {
    visible, hideModal,
    listaNfts, setListaNfts,
    arquivo, abrirParaEditar,
    nftSelecionado, abrirParaCriar
  } = useDadosModal();


  const salvarnovonft = (id: string | undefined, nomeNft: string, urlImagem: string, precoNft: number, simbolo: string) => {
    let novaLista = [];

    if (!id) {
      const novonft = { 
        id: Math.random().toString(36).slice(2, 9), 
        title: nomeNft,
        imageUrl: urlImagem || 'https://picsum.photos/seed/random/400',
        floorPrice: precoNft,
        assetSymbol: simbolo,
        assetId: 1 
      };
      novaLista = [...listaNfts, novonft];
    } 
    else {
      novaLista = listaNfts.map(item => {
        if (item.id === id) {
          return { ...item, title: nomeNft, imageUrl: urlImagem, floorPrice: precoNft, assetSymbol: simbolo };
        }
        return item;
      });
    }
    
    setListaNfts(novaLista);

    try {
        if (!arquivo.exists) {
            arquivo.create();
        }
        arquivo.write(JSON.stringify(novaLista)); 
    } catch (error) {
        console.error('Erro ao salvar o NFT:', error);
    }
    
    hideModal();
  }

  const deletarNft = (id: string) => {
    const novaLista = listaNfts.filter(item => item.id !== id);
    setListaNfts(novaLista);
    arquivo.write(JSON.stringify(novaLista));
    hideModal();
  }

  return (
    <View style={[estiloNft.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.Content title="NFTS" />
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
            />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={estiloNft.row} 
            contentContainerStyle={estiloNft.listContainer}
        />
      </View>

      <IconButton mode="contained"  icon="plus" style={{ margin: 16 }} onPress={() => abrirParaCriar()}/>
      <Button mode="contained" icon="image" style={{ margin: 16 }} onPress={() => abrirParaCriar()}>Adicionar NFT</Button>

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
  listContainer: { padding:4 },
  row: { 
    gap: 9,
  },
  card: { 
    flex: 1, 
    marginBottom: 12, 
    backgroundColor: '#230f2d' 
  },
  cover: { height: 110, borderRadius: 6 },
  content: { paddingTop: 4, gap: 4 }
});