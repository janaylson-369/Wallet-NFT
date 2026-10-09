import  { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Card, Text, Avatar, useTheme, Button } from 'react-native-paper';
import { useDadoCoin } from '../../hooks/use-dado-modal-coin';
import Listamoeda from '@/components/ListaMoeda';
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

  useEffect(() => {
    getPegarLocalizacao();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location?.coords) {
    text = `Lat: ${location.coords.latitude.toFixed(4)} | Long: ${location.coords.longitude.toFixed(4)}`;
  }

  const { listaCoins, setCoinSelecionado } = useDadoCoin();

  const irParaCriar = () => {
    setCoinSelecionado(undefined);
    router.push('/screens/TelaFormCoin' as any);
  };

  const irParaEditar = (coin: any) => {
    setCoinSelecionado(coin);
    router.push({
      pathname: '/screens/TelaFormCoin',
      params: { coinId: coin.id },
    } as any);
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

        <Listamoeda listaCoins={listaCoins} onPress={irParaEditar} />

        <Button mode="contained" icon="plus" style={{ marginTop: 16, marginBottom: 32 }} onPress={irParaCriar}>
          Adicionar Moeda
        </Button>
      </ScrollView>
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