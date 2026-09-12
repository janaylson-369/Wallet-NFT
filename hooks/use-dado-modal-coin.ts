import { useState } from 'react';

const DATAs = [
  { id: 'bd7acbea', title: 'Bored Ape do Neymar #01', imageUrl: 'https://picsum.photos/seed/ape/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 4 },
  { id: '3ac68afc', title: 'Pixel Punk #42', imageUrl: 'https://picsum.photos/seed/punk/400', floorPrice: 8, assetSymbol: 'SOL', assetId: 2 },
  { id: '58694a0f', title: 'Samurai Neon', imageUrl: 'https://picsum.photos/seed/samurai/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 1 },
];

export function useDadosModal() {

    const [visible, setVisible] = useState(false);
    const [listaNfts, setListaNfts] = useState(DATAs);
  
    const [nomeNft, setNomeNft] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [precoNft, setPrecoNft] = useState('');
    const [simbolo, setSimbolo] = useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return {
    visible,
    showModal,
    hideModal,
    listaNfts,
    setListaNfts,
    nomeNft,
    setNomeNft,
    urlImagem,
    setUrlImagem,
    precoNft,
    setPrecoNft,
    simbolo,
    setSimbolo
  };
}
