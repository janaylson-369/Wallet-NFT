import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme, Button } from "react-native-paper";

type ItemProps = {
  title: string;
  id: string;
  floorPrice: number;
  imageUrl: string;
  assetId: number;
  assetSymbol: string;
  onPress: () => void;            
  onPressDetalhes: () => void; 
};

const CardsNft = ({
  title,
  id,
  floorPrice,
  imageUrl,
  assetSymbol,
  assetId,
  onPress,
  onPressDetalhes,
}: ItemProps) => {
  const tema = useTheme();

  return (
    <Card onPress={onPress} style={estiloNft.card}>
      <Card.Cover source={{ uri: imageUrl }} style={estiloNft.cover} />
      <Card.Content style={styles.content}>
        <Text variant="labelSmall" style={{ opacity: 0.5 }}>
          ID: {id.substring(0, 9)}.
        </Text>

        <Text variant="titleMedium" numberOfLines={1}>
          {title}
        </Text>

        <Text
          variant="bodyMedium"
          style={{ color: tema.colors.primary, fontWeight: "bold" }}
        >
          Preço: {floorPrice} {assetSymbol}
        </Text>
      </Card.Content>

      <Card.Actions style={estiloNft.actions}>
        <Button mode="contained-tonal"   compact icon="eye" onPress={onPressDetalhes}> Detalhes </Button>
      </Card.Actions>
      
    </Card>
  );
};

export default CardsNft;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, gap: 4 },
  card: { marginBottom: 8 },
});

const estiloNft = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 4 },
  row: {
    gap: 9,
  },
  card: {
    flex: 1,
    marginBottom: 12,
    backgroundColor: "#230f2d",
  },
  cover: { height: 110, borderRadius: 6 },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});