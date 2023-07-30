# astaria-web3-sdk

## How to use

### 1. Wallet

### 2. Transactions

const ethereum = require('chains/ethereum');
const network = ethereum.get_network_by_name('Mainnet);
const instance = ethereum.create(network);

instance.api.get_balance('0x3E4F')
    .then((balance) => {
        console.log(balance);
    })
    .catch((error) => {
        console.log(error);
    });