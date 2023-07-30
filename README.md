# astaria-web3-sdk

## How to use

### 1. Wallet

### 2. Transactions

```
const Ethereum = require('chains/ethereum');
const network = Ethereum.get_network_by_name('Mainnet);
const ethereum = Ethereum.create(network);

ethereum.api.get_balance('0x3E4F')
    .then((balance) => {
        console.log(balance);
    })
    .catch((error) => {
        console.log(error);
    });
```
