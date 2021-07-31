pragma solidity ^0.8.0;

import "ds-test/test.sol";

import "./DappSolve.sol";
import "./Setup.sol";

abstract contract Hevm {
    // sets the block timestamp to x
    function warp(uint x) public virtual;
}


contract DappSolveTest is DSTest {
    Hevm hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    DappSolve solve;
    Setup setup;

    address constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    function setUp() public {
        setup = new Setup{value: 100 ether}();
    }

    function test_basic_sanity() public {
        solve = new DappSolve{value: 200 ether}(setup);
        hevm.warp(block.timestamp + 1);
        solve.exploit();
        assertTrue(setup.isSolved());
    }
}
