HDKeyNetworks = (function() {
    return {
        MainNet:{
            private:{
                version:0x0488ADE4,
                prefix:"xprv"
            },
            public:{
                version:0x0488B21E,
                prefix:"xpub"
            }
        },
        TestNet:{ 
            private:{
                version:0x04358394,
                prefix:"tprv"
            },
            public:{
                version:0x043587CF,
                prefix:"tpub"
            }
        }
    };
})();

__MODULE__ = HDKeyNetworks;
