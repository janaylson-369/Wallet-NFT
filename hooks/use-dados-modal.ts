import { useState } from 'react';
import { useEffect } from 'react';
import { File, Paths } from 'expo-file-system';

const DATA = [
  { id: 'bd7acbea', title: 'Bored Ape do Neymar #01', imageUrl: 'https://picsum.photos/seed/ape/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 4 },
  { id: '3ac68afc', title: 'Pixel Punk #42', imageUrl: 'https://picsum.photos/seed/punk/400', floorPrice: 8, assetSymbol: 'SOL', assetId: 2 },
  { id: '58694a0f', title: 'Samurai Neon', imageUrl: 'https://picsum.photos/seed/samurai/400', floorPrice: 1, assetSymbol: 'ETH', assetId: 1 },
];
const arquivo = new File(Paths.document, 'nfts.txt');


export function useDadosModal() {

    const [visible, setVisible] = useState(false);
    const [listaNfts, setListaNfts] = useState(DATA);

  //expo-file-system
  useEffect(() => {
    try {
      if (arquivo.exists) { 
        const conteudo = arquivo.textSync();
        setListaNfts(JSON.parse(conteudo));
      }
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error);
    }
  }, []);
  
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
    setSimbolo,
    arquivo
  };
}
