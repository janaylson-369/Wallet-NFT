import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

export type FormCoinProps = {
  coin?: any;
  onAdd: (id: string | undefined, nome: string, simbolo: string, saldo: number, preco: number) => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
};

export default function FormCoin({ coin, onAdd, onCancel, onDelete }: FormCoinProps) {
  const tema = useTheme();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [simbolo, setSimbolo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    if (coin) {
      setId(coin.id );
      setNome(coin.name );
      setSimbolo(coin.symbol );
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
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {id ? 'Editar Criptoativo' : 'Nova Moeda'}
      </Text>

      <TextInput
        mode="outlined"
        label="Nome (Ex: Solana)"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        mode="outlined"
        label="Símbolo (Ex: SOL)"
        value={simbolo}
        onChangeText={setSimbolo}
      />

      <TextInput
        mode="outlined"
        label="Seu Saldo"
        value={saldo}
        onChangeText={setSaldo}
        keyboardType="numeric"
      />

      <TextInput
        mode="outlined"
        label="Preço USD Atual"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />

      <View style={styles.botoes}>
        {id && onDelete && (
          <Button
            mode="contained"
            buttonColor={tema.colors.error}
            onPress={() => onDelete(id)}
          >
            Deletar
          </Button>
        )}
        {onCancel && (
          <Button mode="text" onPress={onCancel}>
            Cancelar
          </Button>
        )}
        <Button
          mode="contained"
          onPress={() => onAdd(id || undefined, nome, simbolo, Number(saldo) || 0, Number(preco) || 0)}
        >
          Salvar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    marginBottom: 4,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
});