interface CreateTaskOptions {
    name: string;             // your task name
  
    // Function to execute
    execAddress: string;      // address of your target smart contract
    execSelector: string;     // function selector to execute on your target smart contract
    execAbi?: string;         // ABI of your target smart contract
    
    // Proxy caller
    dedicatedMsgSender: boolean;     // task will be called via a dedicated msg.sender which you can whitelist (recommended: true)
  
    // Optional: Pre-defined / static target smart contract inputs
    execData?: string;        // exec call data 
    
    // Optional: Dynamic target smart contract inputs (using a resolver)
    resolverAddress?: string; // resolver contract address
    resolverData?: string;    // resolver call data (encoded data with function selector)
    resolverAbi?: string;     // your resolver smart contract ABI
  
    // Optional: Time based task params
    interval?: number;        // execution interval in seconds
    startTime?: number;       // start timestamp in seconds or 0 to start immediately (default: 0)
  
    // Optional: Single execution task
    singleExec?: boolean;     // task cancels itself after 1 execution if true.
  
    // Optional: Payment params
    useTreasury?: boolean;    // use false if your task is self-paying (default: true)
}


export {
    CreateTaskOptions
}

