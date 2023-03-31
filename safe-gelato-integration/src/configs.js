"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionExecutable = exports.SmartContractAddress = exports.Interval = exports.ChainId = exports.RpcUrl = exports.PrivateKey = exports.Abi = void 0;
// goerli
var SmartContractAddress = "0xF449f3A8b0c358D362B89668956E5Cd3955c879F";
exports.SmartContractAddress = SmartContractAddress;
var PrivateKey = "2dc63b3ab270c6c15050e2d7c1c35b922ca270eaa0f34caf847852326db3307d";
exports.PrivateKey = PrivateKey;
var RpcUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
exports.RpcUrl = RpcUrl;
var ChainId = 5;
exports.ChainId = ChainId;
// Common Parametrs
var Interval = 3 * 60;
exports.Interval = Interval;
var FunctionExecutable = "sendEth(uint256 amount)";
exports.FunctionExecutable = FunctionExecutable;
var Abi = "[\n    {\n        \"inputs\": [\n            {\n                \"internalType\": \"uint256\",\n                \"name\": \"amount\",\n                \"type\": \"uint256\"\n            }\n        ],\n        \"name\": \"sendEth\",\n        \"outputs\": [],\n        \"stateMutability\": \"nonpayable\",\n        \"type\": \"function\"\n    },\n    {\n        \"stateMutability\": \"payable\",\n        \"type\": \"receive\"\n    }\n]";
exports.Abi = Abi;
