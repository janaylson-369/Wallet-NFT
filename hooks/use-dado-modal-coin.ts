import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const coinsd = [
  { id: 'c1', name: 'Ethereum', symbol: 'ETH', balance: 2.5, currentPriceUsd: 3200 },
  { id: 'c2', name: 'Bitcoin', symbol: 'BTC', balance: 0.15, currentPriceUsd: 62000 },
];

export function useDadoCoin() {
  const [visible, setVisible] = useState(false);
  const [listaCoins, setListaCoins] = useState<any[]>(coinsd);
  const [coinSelecionado, setCoinSelecionado] = useState<any>(undefined);

  
  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@WalletNFT:coins');
        const coinsData = data != null ? JSON.parse(data) : coinsd;
        setListaCoins(coinsData);
      } catch (e) {
        console.error('Erro ao ler AsyncStorage de Moedas:', e);
      }
    }
    getData();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const abrirParaCriar = () => {
    setCoinSelecionado(undefined);
    setVisible(true);
  };

  const abrirParaEditar = (coin: any) => {
    setCoinSelecionado(coin);
    setVisible(true);
  };

  return {
    visible,
    showModal,
    hideModal,
    listaCoins,
    setListaCoins,
    coinSelecionado,
    setCoinSelecionado,
    abrirParaCriar,
    abrirParaEditar,
  };
}