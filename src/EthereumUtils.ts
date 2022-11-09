import {Provider} from 'zksync-web3';

let provider = null;

export const getProvider = () => {
    if (!provider) {
        provider = new Provider("https://zksync2-testnet.zksync.dev");
    }
    return provider;
}
