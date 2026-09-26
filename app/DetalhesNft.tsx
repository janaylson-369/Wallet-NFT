import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Text, Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDadosModal } from '@/hooks/use-dados-modal';
import { router } from 'expo-router';


export default function DetalhesNft() {
  const tema = useTheme();
  const { nftSelecionado, listaNfts, setListaNfts } = useDadosModal();

  const deletarNft = async (id: string) => {
    const novaLista = listaNfts.filter((item) => item.id !== id);
    setListaNfts(novaLista);
    try {
      await AsyncStorage.setItem('@WalletNFT:nfts', JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao excluir NFT no AsyncStorage:', error);
    }
    router.push('/(tabs)/Nft');
  };


  const valorConvertido = (Number(nftSelecionado.floorPrice)) * 2500;

  return (
    <View style={[styles.container, { backgroundColor: tema.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.push('/(tabs)/Nft')} />
        <Appbar.Content title="Detalhes do NFT" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: nftSelecionado.imageUrl }}
            style={styles.coverAmpliada}
          />
          <Card.Content style={styles.cardContent}>
            <Text variant="labelSmall" style={{ opacity: 0.6 }}>
              TOKEN ID: #{nftSelecionado.id}
            </Text>

            <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
              {nftSelecionado.title}
            </Text>

            <Text variant="titleMedium" style={{ color: tema.colors.primary, fontWeight: 'bold' }}>
              {nftSelecionado.floorPrice} {nftSelecionado.assetSymbol}
              <Text variant="bodyMedium" style={{ opacity: 0.7, color: tema.colors.onSurface }}>
                {' '}(≈ $ {valorConvertido})
              </Text>
            </Text>

            <Text variant="bodySmall" style={{ opacity: 0.5 }}>
              Rede: {nftSelecionado.assetSymbol } (Simulada)
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.botoes}>

          <Button mode="contained" icon="tag" > Colocar Pra Vender </Button>

          <Button mode="outlined" textColor={tema.colors.error} 
            style={{ borderColor: tema.colors.error }}
            onPress={() => deletarNft(nftSelecionado.id)}
          > Excluir NFT
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#230f2d',
    borderRadius: 16,
    overflow: 'hidden',
  },
  coverAmpliada: {
    height: 340,
    borderRadius: 0,
  },
  cardContent: {
    padding: 16,
    gap: 6,
  },
  botoes: {
    gap: 10,
    marginTop: 8,
  },
});