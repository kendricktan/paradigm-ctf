pragma solidity ^0.8.0;

import "ds-test/test.sol";

import "./DappSolve.sol";

contract DappSolveTest is DSTest {
    DappSolve solve;
    Setup setup;

    function setUp() public {
        setup = new Setup{value: 50 ether}();
    }

    function test_basic_sanity() public {
        solve = new DappSolve{value: 500 ether}(setup);
        assertTrue(setup.isSolved());
    }
}
