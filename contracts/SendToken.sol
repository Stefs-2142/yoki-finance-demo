// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SwapTokenToToken {
    function sendToken(uint256 amount, address _tokenOut, address _safeAddress) external {

        IERC20 tokenOut = IERC20(_tokenOut);
        tokenOut.transfer(_safeAddress, amount);

    }
}