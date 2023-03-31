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
var ethers_1 = require("ethers");
var safe_ethers_lib_1 = require("@safe-global/safe-ethers-lib");
var safe_service_client_1 = require("@safe-global/safe-service-client");
var safe_core_sdk_1 = require("@safe-global/safe-core-sdk");
var RPC_URL = 'https://eth-goerli.public.blastapi.io';
var provider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_URL);
var PV = '34ad0e0bcc736f18eb987fc4094ff5ff6744fecda5f3fea51901955547a226a2';
// Initialize signers
var owner1Signer = new ethers_1.ethers.Wallet(PV, provider);
var ethAdapterOwner1 = new safe_ethers_lib_1.default({
    ethers: ethers_1.ethers,
    signerOrProvider: owner1Signer
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var txServiceUrl, safeService, safeFactory, safeAccountConfig, safeSdkOwner1, safeAddress;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    txServiceUrl = 'https://safe-transaction-goerli.safe.global';
                    safeService = new safe_service_client_1.default({ txServiceUrl: txServiceUrl, ethAdapter: ethAdapterOwner1 });
                    return [4 /*yield*/, safe_core_sdk_1.SafeFactory.create({ ethAdapter: ethAdapterOwner1 })];
                case 1:
                    safeFactory = _b.sent();
                    _a = {};
                    return [4 /*yield*/, owner1Signer.getAddress()];
                case 2:
                    safeAccountConfig = (_a.owners = [
                        _b.sent()
                    ],
                        _a.threshold = 1,
                        _a);
                    return [4 /*yield*/, safeFactory.deploySafe({ safeAccountConfig: safeAccountConfig })];
                case 3:
                    safeSdkOwner1 = _b.sent();
                    safeAddress = safeSdkOwner1.getAddress();
                    console.log('Your Safe has been deployed:');
                    console.log("https://goerli.etherscan.io/address/".concat(safeAddress));
                    console.log("https://app.safe.global/gor:".concat(safeAddress));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
