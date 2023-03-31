import { ethers, Contract } from 'ethers'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import { SafeFactory } from '@safe-global/safe-core-sdk'
import { SafeAccountConfig } from '@safe-global/safe-core-sdk'
import { AutomateSDK, TaskTransaction, CreateTaskOptions, isAutomateSupported } from "@gelatonetwork/automate-sdk";

async function createStrategy() {
    const ChainID = 5
    const RPC_URL="https://eth-goerli.public.blastapi.io"
    const PV = "3488d10166741e0a810542c797e6022e61652ac837df981a00059864c3dfafed"
    const SmartContractAddress: string = "0xaE42D9A021603071a91e09675c782fd0c2CB4E87"
    const justFunctionName = "sendToken"
    const tokenOutAddr = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195"
    const FunctionExecutable: string = "sendToken(uint256 amount, address _tokenOut, address _safeAddress)"
    const Abi = `[
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_tokenOut",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_safeAddress",
                    "type": "address"
                }
            ],
            "name": "sendToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]`
    console.log(new Date().getFullYear());
    if (!isAutomateSupported(ChainID)) {
      console.log(`Automate network not supported (${ChainID})`)
    }
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ChainID)
    const owner1Signer = new ethers.Wallet(PV, provider)
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(),
      ],
      threshold: 1,
    } 
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
    const safeAddress = safeSdkOwner1.getAddress()
    console.log('Your Safe has been deployed:') 
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`) 
    
    const automate = new AutomateSDK(ChainID, owner1Signer);
    const tokenSender = new Contract(SmartContractAddress, Abi, owner1Signer)
    const selector = tokenSender.interface.getSighash(FunctionExecutable)
    console.log("SELECTOR", selector)
    const exchangeTokens = 1
    const execData = tokenSender.interface.encodeFunctionData(
      justFunctionName, [exchangeTokens, tokenOutAddr, safeAddress]
      );
    const params: CreateTaskOptions = {
        name: "1 April TaskName",
        execAddress: SmartContractAddress,
        execSelector: selector,
        execData,
        execAbi: Abi,
        // interval: 3 * 60, // execute every 3 minutes
        dedicatedMsgSender: true,
        singleExec: true,  // task cancels itself after 1 execution if true.
    };
    console.log("Params created!")
    const { taskId, tx }: TaskTransaction = await automate.createTask(params);
    console.log("taskId", taskId)
    console.log("TX", tx)
    await tx.wait(); // Optionally wait for tx confirmation
    console.log(`Task created, taskId: ${taskId} (tx hash: ${tx.hash})`);
    console.log(`> https://app.gelato.network/task/${taskId}?chainId=${chainId}`);
}

// getSafeAddr()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
export {
  createStrategy
}