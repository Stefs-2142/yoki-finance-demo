// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/interfaces/UniswapV2/IUniswapV2Router02.sol";

contract BuyTokenOnUniswap {
    using SafeMath for uint256;

    address public uniswapRouterAddress;
    IUniswapV2Router02 public uniswapRouter;

    constructor() {
        uniswapRouterAddress = address(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
        uniswapRouter = IUniswapV2Router02(uniswapRouterAddress);
    }

    function buyToken(address _tokenAddressOut, uint256 _amountOutMin) external payable {

        // Set up Uniswap path and deadline;
        uint256 amountOutMin = _amountOutMin;
        address[] memory path = new address[](2);
        path[0] =  uniswapRouter.WETH();
        path[1] = _tokenAddressOut;
        uint256 deadline = block.timestamp + 600; // 10 minute deadline

        // Perform the swap
        uniswapRouter.swapETHForExactTokens{value: msg.value}(
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
    }
}