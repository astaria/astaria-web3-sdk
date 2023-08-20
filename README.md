# astaria-web3-sdk

## How to use

### 1. Wallet

### 2. Transactions

```
const Ethereum = require("astaria-web3-sdk/chains/ethereum");
const network = Ethereum.get_network_by_name("Mainnet");
const ethereum = Ethereum.create(network);

ethereum.api.get_balance("0xa4Dc2Fcb7e6B53cf5e8901FC8513F4d3e11AEb18")
    .then((balance) => {
        console.log(balance);
    })
    .catch((error) => {
        console.log(error);
    });
```
