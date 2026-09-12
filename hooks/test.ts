// ESTUDO: Este arquivo é um exemplo de como criar um contrato de NFT e Coin em TypeScript.
//  Ele define as interfaces Nft e Coin, bem como a função NftContrato que recebe os dados 
// dessas interfaces e os inicializa com valores padrão caso não sejam fornecidos.
// variavel com ? não é obrigatória, caso não seja passada, com operadoe OU || será inicializada com valor padrão

interface Nft {
    idNft?: string;
    title?: string;
    imageUrl?: string;
    floorPrice?: number;
    assetSymbol?: string;
    assetId?: number;
};

interface Coin{
    idCoin?: string;
    name?: string;
    symbol?: string;
    price?: number;
    marketCap?: number;
    volume24h?: number;
    circulatingSupply?: number;
};

type NftContratoProps = {
    nft: Nft;
    coin: Coin;
};

const NftContrato = (props: NftContratoProps) => {
    const { nft, coin } = props;
    nft.idNft = '13334'
    coin.idCoin = coin.idCoin || '1'
    nft.title = nft.title || 'NFT Padrão'
    nft.imageUrl = nft.imageUrl || 'https://picsum.photos/seed/padrao/400'
    nft.floorPrice = nft.floorPrice || 0
    nft.assetSymbol = nft.assetSymbol || 'ETH'
    nft.assetId = nft.assetId || 1

    coin.name = coin.name || 'Ethereum'
    coin.symbol = coin.symbol || 'ETH'
    coin.price = coin.price || 3000
    coin.marketCap = coin.marketCap || 500000000
    coin.volume24h = coin.volume24h || 20000000
    

    return  console.log('NFT:', nft.idNft, nft.title, nft.imageUrl, nft.floorPrice,coin.name, coin.symbol);
    


}


NftContrato({ 
    nft: {
        idNft: 'rx3334vvhf', 
        title: 'NFT Teste', 
        imageUrl: 'https://picsum.photos/seed/teste/400', 
        floorPrice: 50 }, 

    coin: {
        name: 'Ethereum', 
        symbol: 'ETH', 
        } 
});


console.log('Contrato NFT e Coin criado com sucesso!');

