// goerli
const SmartContractAddress: string = "0xF449f3A8b0c358D362B89668956E5Cd3955c879F"
const PrivateKey = "2dc63b3ab270c6c15050e2d7c1c35b922ca270eaa0f34caf847852326db3307d";
const RpcUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
const ChainId = 5;

// Common Parametrs
const Interval = 3 * 60;
const FunctionExecutable: string = "sendEth(uint256 amount)"
const Abi = `[
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "sendEth",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]`

export { 
    Abi,
    PrivateKey,
    RpcUrl,
    ChainId,
    Interval,
    SmartContractAddress,
    FunctionExecutable,
}