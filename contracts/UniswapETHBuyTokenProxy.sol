// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SwapEthToToken {
    using SafeERC20 for IERC20;
    address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    IUniswapV2Router02 public uniswapRouter;

    constructor() {
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    }

    function convertEthToDai(uint minDaiAmount, address tokenAddress) public payable {
        uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
        uniswapRouter.swapExactETHForTokens{ value: msg.value }(minDaiAmount, getPathForETHtoToken(tokenAddress), address(this), deadline);
        
        IERC20 token = IERC20(tokenAddress);
        uint256 tokenBalance = token.balanceOf(address(this));
        token.safeTransfer(msg.sender, tokenBalance);

    }

    function getPathForETHtoToken(address tokenAddress) private view returns (address[] memory) {
      address[] memory path = new address[](2);
      path[0] = uniswapRouter.WETH();
      path[1] = tokenAddress;
      
      return path;
    }
  }