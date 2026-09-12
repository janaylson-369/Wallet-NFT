import React from 'react';
import { Appbar, Card, Text, useTheme, Portal, Modal, Button, TextInput, IconButton} from 'react-native-paper';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDadosModal } from '../../hooks/use-dados-modal';


type ItemProps = { title: string, id: string, floorPrice: number, imageUrl: string, assetId: number, assetSymbol: string };


const CardsNft = ({ title, id, floorPrice, imageUrl, assetSymbol, assetId }: ItemProps) => {
  const tema = useTheme();

  return (
    <Card style={estiloNft.card}>
      <Card.Cover source={{ uri: imageUrl }} style={estiloNft.cover} />
      <Card.Content style={styles.content}>

        <Text variant="labelSmall" style={{ opacity: 0.5 }}>ID: {id.substring(0,9)}.</Text>

        <Text variant="titleMedium" numberOfLines={1}>{title}</Text>

        <Text variant="bodyMedium" style={{ color: tema.colors.primary, fontWeight: 'bold' }}>
          Preço: {floorPrice} REDE: {assetSymbol} Idcoin: {assetId}
        </Text>
      </Card.Content>
    </Card>
  );
}

export default function NftScreen() {

  const tema = useTheme(); 

  const {
    visible, showModal, hideModal,
    listaNfts, setListaNfts,
    nomeNft, setNomeNft,
    urlImagem, setUrlImagem,
    precoNft, setPrecoNft,
    simbolo, setSimbolo,
    arquivo
  } = useDadosModal();

  const containerStyle = { backgroundColor: tema.colors.elevation.level3, padding: 20, margin: 20, borderRadius: 8 };

  


  const salvarnovonft = () => {
    
    const novonft = [...listaNfts, { 
      id: Math.random().toString(36).slice(2, 9), 
      title: nomeNft,
      imageUrl: urlImagem || 'https://picsum.photos/seed/random/400',
      floorPrice: parseFloat(precoNft),
      assetSymbol: simbolo,
      assetId: 1 
    }];
    
    setListaNfts(novonft);


        try {
            if (!arquivo.exists) {
                arquivo.create();
            }
            arquivo.write(JSON.stringify(novonft)); 
        } catch (error) {
            console.error('Erro ao salvar o NFT:', error);
        }
        

        setNomeNft('');
        setUrlImagem('');
        setPrecoNft('');
        setSimbolo('');
        hideModal();
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
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
            />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={estiloNft.row} 
            contentContainerStyle={estiloNft.listContainer}
        />
      </View>

      <IconButton mode="contained"  icon="plus" style={{ margin: 16 }} onPress={showModal}/>
      <Button mode="contained" icon="image" style={{ margin: 16 }} onPress={showModal}>Adicionar NFT</Button>

      <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text variant="titleLarge" style={{ marginBottom: 16 }}>Novo NFT</Text>
              
              <TextInput 
                mode="outlined" 
                label="Nome do NFT" 
                value={nomeNft} 
                onChangeText={setNomeNft} 
                style={{ marginBottom: 12 }} 
                autoFocus
              />
              <TextInput 
                mode="outlined" 
                label="URL da Imagem" 
                value={urlImagem} 
                onChangeText={setUrlImagem} 
                style={{ marginBottom: 24 }} 
                autoFocus
              />
              <TextInput 
                mode="outlined" 
                label="Preço do NFT" 
                value={precoNft} 
                onChangeText={setPrecoNft} 
                keyboardType="numeric"
                style={{ marginBottom: 24 }} 
              />
              <TextInput 
                mode="outlined" 
                label="Símbolo da Rede" 
                value={simbolo} 
                onChangeText={setSimbolo} 
                style={{ marginBottom: 24 }} 
              />


              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                <Button mode="text" onPress={hideModal}>Cancelar</Button>
                <Button mode="contained" onPress={salvarnovonft}>Salvar</Button>
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