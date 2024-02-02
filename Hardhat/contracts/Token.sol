// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("DeTicketToken", "DTT") {
        _mint(msg.sender, 1 * 10 ** decimals());
    }
}