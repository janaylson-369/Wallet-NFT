import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Portal, Modal, Text, TextInput, Button, useTheme } from 'react-native-paper';

export type ModalCoinProps = {
  visible: boolean;
  coin?: any; 
  onAdd: (id: string | undefined, nome: string, simbolo: string, saldo: number, preco: number) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
};

export default function ModalCoin({ visible, coin, onAdd, onCancel, onDelete,}: ModalCoinProps) {
  const tema = useTheme();
  const containerStyle = { backgroundColor: tema.colors.elevation.level3, padding: 20, margin: 20, borderRadius: 8 };

  const [id, setId] = useState<string>('');
  const [nome, setNome] = useState('');
  const [simbolo, setSimbolo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (coin) {
      setId(coin.id);
      setNome(coin.name);
      setSimbolo(coin.symbol);
      setSaldo(coin.balance);
      setPreco(coin.currentPriceUsd);
    } else {
      setId('');
      setNome('');
      setSimbolo('');
      setSaldo('');
      setPreco('');
    }
  }, [coin]);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onCancel} contentContainerStyle={containerStyle}>
        <Text variant="titleLarge" style={{ marginBottom: 16 }}>
          {id ? 'Editar Criptoativo' : 'Nova Moeda'}
        </Text>
        
        <TextInput 
            mode="outlined" 
            label="Nome (Ex: Solana)" 
            value={nome} 
            onChangeText={setNome} 
            style={{ marginBottom: 12 }} 
            autoFocus />
        <TextInput 
            mode="outlined" 
            label="Símbolo (Ex: SOL)" 
            value={simbolo} 
            onChangeText={setSimbolo} 
            style={{ marginBottom: 12 }} />
        <TextInput 
            mode="outlined" 
            label="Seu Saldo" 
            value={saldo} 
            onChangeText={setSaldo} 
            keyboardType="numeric" 
            style={{ marginBottom: 12 }} />
        <TextInput 
            mode="outlined" 
            label="Preço USD Atual" 
            value={preco} 
            onChangeText={setPreco} 
            keyboardType="numeric" 
            style={{ marginBottom: 24 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
          {id && (
            <Button mode="contained" buttonColor={tema.colors.error} onPress={() => onDelete(id)}>
              Deletar
            </Button>
          )}
          <Button mode="text" onPress={onCancel}>Cancelar</Button>
          <Button mode="contained" onPress={() => onAdd(id, nome, simbolo, Number(saldo), Number(preco))}>Salvar</Button>
        </View>
      </Modal>
    </Portal>
  );
}