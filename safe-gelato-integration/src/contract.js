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
exports.GelatoSmartContract = void 0;
var automate_sdk_1 = require("@gelatonetwork/automate-sdk");
var ethers_1 = require("ethers");
var configs_1 = require("./configs");
var GelatoSmartContract = /** @class */ (function () {
    function GelatoSmartContract(abi, address, chainId, interval, privateKey, rpcUrl) {
        this.address = address;
        this.abi = abi;
        this.interval = interval;
        this.chainId = chainId;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl, chainId);
        this.signer = new ethers_1.ethers.Wallet(privateKey, this.provider);
        this.counter = new ethers_1.Contract(this.address, this.abi, this.signer);
        this.selector = this.counter.interface.getSighash(configs_1.FunctionExecutable);
    }
    GelatoSmartContract.prototype.healthCheck = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!(0, automate_sdk_1.isAutomateSupported)(this.chainId)) {
                    console.log("Automate network not supported (".concat(this.chainId, ")"));
                    // raise exception    
                }
                return [2 /*return*/];
            });
        });
    };
    GelatoSmartContract.prototype.getTaskParams = function (interval) {
        return __awaiter(this, void 0, void 0, function () {
            var execData, params;
            return __generator(this, function (_a) {
                execData = this.counter.interface.encodeFunctionData("sendEth", [1]);
                params = {
                    name: new Date().toUTCString(),
                    execAddress: this.address,
                    execSelector: this.selector,
                    execData: execData,
                    execAbi: this.abi,
                    interval: interval,
                    dedicatedMsgSender: true,
                    singleExec: true,
                    useTreasury: true
                };
                return [2 /*return*/, params];
            });
        });
    };
    GelatoSmartContract.prototype.automate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var taskParams, automate, _a, taskId, tx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTaskParams(this.interval)];
                    case 1:
                        taskParams = _b.sent();
                        automate = new automate_sdk_1.AutomateSDK(this.chainId, this.signer);
                        return [4 /*yield*/, automate.createTask(taskParams)];
                    case 2:
                        _a = _b.sent(), taskId = _a.taskId, tx = _a.tx;
                        return [4 /*yield*/, tx.wait()];
                    case 3:
                        _b.sent();
                        console.log("Task created, taskId: ".concat(taskId, " (tx hash: ").concat(tx.hash, ")"));
                        console.log("> https://app.gelato.network/task/".concat(taskId, "?chainId=").concat(this.chainId));
                        return [2 /*return*/];
                }
            });
        });
    };
    return GelatoSmartContract;
}());
exports.GelatoSmartContract = GelatoSmartContract;
