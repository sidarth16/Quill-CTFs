// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

contract CollatzPuzzleBase {
  function collatzIteration(uint256 n) external pure returns (uint256) {
    if (n % 2 == 0) {
      return n / 2;
    } else {
      return 3 * n + 1;
    }
  }
}


contract CollatzPuzzleFactory {

    function createMyCollatz()
        public
        returns (address myCollatz)
    {
        bytes memory bytecode = type(CollatzPuzzleBase).creationCode;
        bytes32 salt = keccak256(abi.encodePacked("CollatzPuzzle"));
        assembly {
            myCollatz := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        return myCollatz;
    }
}