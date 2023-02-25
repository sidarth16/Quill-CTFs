pragma solidity ^0.8.17;
import "hardhat/console.sol";

interface IGuardian {
    function f00000000_bvvvdlt() external view returns (address);

    function f00000001_grffjzz() external view returns (address);
}


contract Gate {
    bool public opened;

    function open(address guardian) external {
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(guardian)
        }
        console.log("codeSize : " , codeSize);
        // require(codeSize < 33, "bad code size");

        require(
            IGuardian(guardian).f00000000_bvvvdlt() == address(this),
            "invalid pass"
        );
        console.log("2");

        require(
            IGuardian(guardian).f00000001_grffjzz() == tx.origin,
            "invalid pass"
        );
        console.log("3");

        (bool success, ) = guardian.call(abi.encodeWithSignature("fail()"));
        console.log("4");
        require(!success , "fail() is giving success");

        opened = true;
    }
}