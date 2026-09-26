import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
  { id: 'bd7acbea', title: 'Bored Ape do Neymar #01', imageUrl: 'https://picsum.photos/seed/ape/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 4 },
  { id: '3ac68afc', title: 'Pixel Punk #42', imageUrl: 'https://picsum.photos/seed/punk/400', floorPrice: 8, assetSymbol: 'SOL', assetId: 2 },
  { id: '58694a0f', title: 'Samurai Neon', imageUrl: 'https://picsum.photos/seed/samurai/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 1 },
];


let nftSelecionadoGlobal: any = undefined;

export function useDadosModal() {
  const [visible, setVisible] = useState(false);
  const [listaNfts, setListaNfts] = useState<any[]>(DATA);
  const [nftSelecionado, setNftSelecionadoState] = useState<any>(nftSelecionadoGlobal);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem('@WalletNFT:nfts');
        const nftsData = data != null ? JSON.parse(data) : DATA;
        setListaNfts(nftsData);
      } catch (e) {
        console.error('erro ao ler AsyncStorage:', e);
      }
    }
    getData();
  }, []);

  const hideModal = () => setVisible(false);

  const abrirParaEditar = (nft: any) => {
    nftSelecionadoGlobal = nft;
    setNftSelecionadoState(nft);
    setVisible(true);
  };

  const abrirParaCriar = () => {
    nftSelecionadoGlobal = undefined;
    setNftSelecionadoState(undefined);
    setVisible(true);
  };
  const selecionarParaDetalhes = (nft: any) => {
    nftSelecionadoGlobal = nft;
    setNftSelecionadoState(nft);
  };

  return {
    visible,
    hideModal,
    listaNfts,
    setListaNfts,
    abrirParaEditar,
    abrirParaCriar,
    selecionarParaDetalhes,
    nftSelecionado: nftSelecionadoGlobal || nftSelecionado,
  };
}