import { ethers } from 'ethers'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import SafeServiceClient from '@safe-global/safe-service-client'
import { SafeFactory } from '@safe-global/safe-core-sdk'
import { SafeAccountConfig } from '@safe-global/safe-core-sdk'
 
 
async function getSafeAddr() {
    const RPC_URL='https://eth-goerli.public.blastapi.io'
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)
    // const PV = '34ad0e0bcc736f18eb987fc4094ff5ff6744fecda5f3fea51901955547a226a2'
    const PV = "YOU_PV_KEY"
    const owner1Signer = new ethers.Wallet(PV, provider)
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter: ethAdapterOwner1 })
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const safeAccountConfig: SafeAccountConfig = {
      owners: [
        await owner1Signer.getAddress(),
      ],
      threshold: 1,
      // ... (Optional params)
    } 
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })
    const safeAddress = safeSdkOwner1.getAddress()
    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
    return
 
 
}

getSafeAddr()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// export {
//   getSafeAddr
// }