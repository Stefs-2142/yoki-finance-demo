"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStrategy = void 0;
var ethers_1 = require("ethers");
var safe_ethers_lib_1 = require("@safe-global/safe-ethers-lib");
var safe_core_sdk_1 = require("@safe-global/safe-core-sdk");
var automate_sdk_1 = require("@gelatonetwork/automate-sdk");
function createStrategy() {
    return __awaiter(this, void 0, void 0, function () {
        var ChainID, RPC_URL, PV, SmartContractAddress, justFunctionName, tokenOutAddr, FunctionExecutable, Abi, provider, owner1Signer, ethAdapterOwner1, safeFactory, safeAccountConfig, safeSdkOwner1, safeAddress, automate, tokenSender, selector, exchangeTokens, execData, params, _a, taskId, tx;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ChainID = 5;
                    RPC_URL = "https://eth-goerli.public.blastapi.io";
                    PV = "3488d10166741e0a810542c797e6022e61652ac837df981a00059864c3dfafed";
                    SmartContractAddress = "0xaE42D9A021603071a91e09675c782fd0c2CB4E87";
                    justFunctionName = "sendToken";
                    tokenOutAddr = "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195";
                    FunctionExecutable = "sendToken(uint256 amount, address _tokenOut, address _safeAddress)";
                    Abi = "[\n        {\n            \"inputs\": [\n                {\n                    \"internalType\": \"uint256\",\n                    \"name\": \"amount\",\n                    \"type\": \"uint256\"\n                },\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"_tokenOut\",\n                    \"type\": \"address\"\n                },\n                {\n                    \"internalType\": \"address\",\n                    \"name\": \"_safeAddress\",\n                    \"type\": \"address\"\n                }\n            ],\n            \"name\": \"sendToken\",\n            \"outputs\": [],\n            \"stateMutability\": \"nonpayable\",\n            \"type\": \"function\"\n        }\n    ]";
                    console.log(new Date().getFullYear());
                    if (!(0, automate_sdk_1.isAutomateSupported)(ChainID)) {
                        console.log("Automate network not supported (".concat(ChainID, ")"));
                    }
                    provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_URL, ChainID);
                    owner1Signer = new ethers_1.ethers.Wallet(PV, provider);
                    ethAdapterOwner1 = new safe_ethers_lib_1.default({
                        ethers: ethers_1.ethers,
                        signerOrProvider: owner1Signer
                    });
                    return [4 /*yield*/, safe_core_sdk_1.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })];
                case 1:
                    safeFactory = _c.sent();
                    _b = {};
                    return [4 /*yield*/, owner1Signer.getAddress()];
                case 2:
                    safeAccountConfig = (_b.owners = [
                        _c.sent()
                    ],
                        _b.threshold = 1,
                        _b);
                    return [4 /*yield*/, safeFactory.deploySafe({ safeAccountConfig: safeAccountConfig })];
                case 3:
                    safeSdkOwner1 = _c.sent();
                    safeAddress = safeSdkOwner1.getAddress();
                    console.log('Your Safe has been deployed:');
                    console.log("https://goerli.etherscan.io/address/".concat(safeAddress));
                    console.log("https://app.safe.global/gor:".concat(safeAddress));
                    automate = new automate_sdk_1.AutomateSDK(ChainID, owner1Signer);
                    tokenSender = new ethers_1.Contract(SmartContractAddress, Abi, owner1Signer);
                    selector = tokenSender.interface.getSighash(FunctionExecutable);
                    console.log("SELECTOR", selector);
                    exchangeTokens = 1;
                    execData = tokenSender.interface.encodeFunctionData(justFunctionName, [exchangeTokens, tokenOutAddr, safeAddress]);
                    params = {
                        name: "1 April TaskName",
                        execAddress: SmartContractAddress,
                        execSelector: selector,
                        execData: execData,
                        execAbi: Abi,
                        // interval: 3 * 60, // execute every 3 minutes
                        dedicatedMsgSender: true,
                        singleExec: true, // task cancels itself after 1 execution if true.
                    };
                    console.log("Params created!");
                    return [4 /*yield*/, automate.createTask(params)];
                case 4:
                    _a = _c.sent(), taskId = _a.taskId, tx = _a.tx;
                    console.log("taskId", taskId);
                    console.log("TX", tx);
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _c.sent(); // Optionally wait for tx confirmation
                    console.log("Task created, taskId: ".concat(taskId, " (tx hash: ").concat(tx.hash, ")"));
                    console.log("> https://app.gelato.network/task/".concat(taskId, "?chainId=").concat(chainId));
                    return [2 /*return*/];
            }
        });
    });
}
exports.createStrategy = createStrategy;
