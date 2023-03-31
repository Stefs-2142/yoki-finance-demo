import { AutomateSDK, TaskTransaction, CreateTaskOptions, isAutomateSupported } from "@gelatonetwork/automate-sdk";
import { Contract, ethers} from "ethers";
import {
  PrivateKey, 
  ChainId, 
  FunctionExecutable,
  SmartContractAddress,
  Abi,
  RpcUrl
} from './src/configs';

async function main() {
  if (!isAutomateSupported(ChainId)) {
    console.log(`Automate network not supported (${ChainId})`)
  }
  const Provider = new ethers.providers.JsonRpcProvider(RpcUrl, ChainId);
  const signer = new ethers.Wallet(PrivateKey, Provider);
  const automate = new AutomateSDK(ChainId, signer);
  const counter = new Contract(SmartContractAddress, Abi, signer);
  const selector = counter.interface.getSighash(FunctionExecutable);
  console.log("SELECTOR", selector)
  const execData = counter.interface.encodeFunctionData("convertEthToDai", [1, "0xdAC17F958D2ee523a2206206994597C13D831ec7"]);
  const params: CreateTaskOptions = {
      name: "taskName",
      execAddress: SmartContractAddress,
      execSelector: selector,
      execData,
      execAbi: Abi,
      interval: 3 * 60, // execute every 3 minutes
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
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });