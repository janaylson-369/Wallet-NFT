import  { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

export type FormNftProps = {
  nft?: any;
  onAdd: (id: string | undefined, nomeNft: string, urlImagem: string, precoNft: number, simbolo: string) => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
};

export default function FormNft({ nft, onAdd, onCancel, onDelete }: FormNftProps) {
  const tema = useTheme();
  const [id, setId] = useState('');
  const [nomeNft, setNomeNft] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [precoNft, setPrecoNft] = useState('');
  const [simbolo, setSimbolo] = useState('');

  useEffect(() => {
    if (nft) {
      setId(nft.id || '');
      setNomeNft(nft.title || '');
      setUrlImagem(nft.imageUrl || '');
      setPrecoNft(nft.floorPrice !== undefined ? String(nft.floorPrice) : '');
      setSimbolo(nft.assetSymbol || '');
    } else {
      setId('');
      setNomeNft('');
      setUrlImagem('');
      setPrecoNft('');
      setSimbolo('');
    }
  }, [nft]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {id ? 'Editar NFT' : 'Novo NFT'}
      </Text>
      <TextInput
        mode="outlined"
        label="Nome do NFT"
        value={nomeNft}
        onChangeText={setNomeNft}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        mode="outlined"
        label="URL da Imagem"
        value={urlImagem}
        onChangeText={setUrlImagem}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        mode="outlined"
        label="Preço do NFT"
        value={precoNft}
        onChangeText={setPrecoNft}
        keyboardType="numeric"
        style={{ marginBottom: 12 }}
      />
      <TextInput
        mode="outlined"
        label="Símbolo da Rede"
        value={simbolo}
        onChangeText={setSimbolo}
        style={{ marginBottom: 16 }}
      />
      <View style={styles.botoes}>
        {id && onDelete ? (
          <Button
            mode="contained"
            buttonColor={tema.colors.error}
            onPress={() => onDelete(id)}
          >
            Deletar
          </Button>
        ) : null}
        {onCancel ? (
          <Button mode="text" onPress={onCancel}>
            Cancelar
          </Button>
        ) : null}
        <Button
          mode="contained"
          onPress={() => onAdd(id || undefined, nomeNft, urlImagem, Number(precoNft) || 0, simbolo)}
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