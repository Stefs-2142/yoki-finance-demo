import { AutomateSDK, TaskTransaction, isAutomateSupported } from "@gelatonetwork/automate-sdk";
import { Contract, ethers } from "ethers";
import { FunctionExecutable } from './configs';
import { CreateTaskOptions } from './interfaces'

class GelatoSmartContract {
    private abi: string;
    private address: string;
    private interval: number;
    private chainId: number;
    private provider: ethers.providers.JsonRpcProvider;
    private signer: ethers.Wallet;
    private counter: Contract;
    private selector: string

    constructor(
        abi: string,
        address: string,
        chainId: number,
        interval: number,
        privateKey: string,
        rpcUrl: string,
    ) {
        this.address = address;
        this.abi = abi;
        this.interval = interval;
        this.chainId = chainId;
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
        this.signer = new ethers.Wallet(privateKey, this.provider);
        this.counter = new Contract(this.address, this.abi, this.signer);
        this.selector = this.counter.interface.getSighash(FunctionExecutable);
    }

    async healthCheck() {
        if (!isAutomateSupported(this.chainId)) {
            console.log(`Automate network not supported (${this.chainId})`)
            // raise exception    
        }
    }

    async getTaskParams(interval: number) {
        let execData = this.counter.interface.encodeFunctionData("sendEth", [1]);
        let params: CreateTaskOptions = {
            name: new Date().toUTCString(),
            execAddress: this.address,
            execSelector: this.selector,
            execData,
            execAbi: this.abi,
            interval: interval, // 3 * 60, // execute every 3 minutes
            dedicatedMsgSender: true,
            singleExec: true,
            useTreasury: true
        };
        return params
    }

    async automate(): Promise<void> {
        const SmartContractAddress: string = ""
        const PrivateKey: string = "";
        const rpcUrl = ""
        const chainId = 5;
        const FunctionName: string = "sendEth(uint256 amount)"

        
        const Abi: string = ""
        const Provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
        const taskName: string = new Date().toUTCString()

        const signer = new ethers.Wallet(PrivateKey, Provider);
        const automate = new AutomateSDK(chainId, signer);
        const counter = new Contract(SmartContractAddress, Abi, signer);
        const selector = counter.interface.getSighash(FunctionName);
        console.log("SELECTOR", selector)
        const execData = counter.interface.encodeFunctionData("", [1]);
        const params: CreateTaskOptions = {
            name: taskName,
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
}

export {
    GelatoSmartContract
}