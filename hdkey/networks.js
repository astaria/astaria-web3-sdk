var module = (function() {
    return {
        Mainnet: {
            private: {
                version: 0x0488ADE4,
                prefix: "xprv"
            },

            public: {
                version: 0x0488B21E,
                prefix: "xpub"
            }
        },

        Testnet: { 
            private: {
                version: 0x04358394,
                prefix: "tprv"
            },
            
            public: {
                version: 0x043587CF,
                prefix: "tpub"
            }
        }
    };
})();

__MODULE__ = module;
