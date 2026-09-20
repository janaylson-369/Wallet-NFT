import {useState, useEffect} from 'react';
import { Text, useTheme, Portal, Modal, Button, TextInput} from 'react-native-paper';
import { View } from 'react-native';


export type nftProps = {
    visible: boolean;
    onAdd: (id: string ,nomeNft: string, urlImagem: string, precoNft: number, simbolo: string)=> void;
    onCancel: ()=> void;
    nft?: any;
    onDelete: (id: string) => void;
}

export default function modalNft({visible, onAdd, onCancel, onDelete, nft} : nftProps){
    const tema = useTheme();
    const containerStyle = { backgroundColor: tema.colors.elevation.level3, padding: 20, margin: 20, borderRadius: 8 };
    
    const [id, setId] = useState<string>('');
    const [nomeNft, setNomeNft] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [precoNft, setPrecoNft] = useState('');
    const [simbolo, setSimbolo] = useState('');

    useEffect(() => {
    if (nft) {
      setId(nft.id);
      setNomeNft(nft.title);
      setUrlImagem(nft.imageUrl);
      setPrecoNft(nft.floorPrice);
      setSimbolo(nft.assetSymbol);
    } else {
      setId('');
      setNomeNft('');
      setUrlImagem('');
      setPrecoNft('');
      setSimbolo('');
    }
    }, [nft]);
    
    return(
        <Portal>
            <Modal visible={visible} onDismiss={onCancel} contentContainerStyle={containerStyle}>
                <Text variant="titleLarge" style={{ marginBottom: 16 }}>
                {id ? 'Editar NFT' : 'Novo NFT'}
                </Text>
                
                <TextInput 
                    mode="outlined" 
                    label="Nome do NFT" 
                    value={nomeNft} 
                    onChangeText={setNomeNft} 
                    style={{ marginBottom: 12 }} 
                    autoFocus />
                <TextInput 
                    mode="outlined" 
                    label="URL da Imagem" 
                    value={urlImagem} 
                    onChangeText={setUrlImagem} 
                    style={{ marginBottom: 12 }} />
                <TextInput mode="outlined" 
                    label="Preço do NFT" 
                    value={precoNft} 
                    onChangeText={setPrecoNft} 
                    keyboardType="numeric" 
                    style={{ marginBottom: 12 }} />
                <TextInput mode="outlined" 
                    label="Símbolo da Rede" 
                    value={simbolo} 
                    onChangeText={setSimbolo} 
                    style={{ marginBottom: 24 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                {id && (
                    <Button mode="contained" buttonColor={tema.colors.error} onPress={() => onDelete(id)}>
                    Deletar
                    </Button>
                )}
                <Button mode="text" onPress={onCancel}>Cancelar</Button>
                <Button mode="contained" onPress={() => onAdd(id, nomeNft, urlImagem, Number(precoNft), simbolo)}>Salvar</Button>
                </View>
            </Modal>
        </Portal>

    );

}


