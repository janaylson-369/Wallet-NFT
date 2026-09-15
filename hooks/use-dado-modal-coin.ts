import { useState, useEffect } from 'react';
import { File, Paths } from 'expo-file-system';

const coinsd = [
  { id: 'c1', name: 'Ethereum', symbol: 'ETH', balance: 2.5, currentPriceUsd: 3200 },
  { id: 'c2', name: 'Bitcoin', symbol: 'BTC', balance: 0.15, currentPriceUsd: 62000 },
];


const arquivoCoins = new File(Paths.document, 'coins.txt');

export function useDadoCoin() {
  const [visible, setVisible] = useState(false);
  const [listaCoins, setListaCoins] = useState(coinsd);
  const [nome, setNome] = useState('');
  const [simbolo, setSimbolo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [preco, setPreco] = useState('');

  
  useEffect(() => {
    try {
      if (arquivoCoins.exists) { 
        const conteudo = arquivoCoins.textSync();
        if(conteudo) {
          setListaCoins(JSON.parse(conteudo));
        }
      }
    } catch (error) {
      console.error("teu arquivo due merda:", error);
    }
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return {
    visible, 
    showModal,
    hideModal,
    listaCoins,
    setListaCoins,
    nome,
    setNome,
    simbolo, 
    setSimbolo,
    saldo, 
    setSaldo,
    preco, 
    setPreco,
    arquivoCoins
  };
}