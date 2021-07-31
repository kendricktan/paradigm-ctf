pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./DappSolve.sol";
import "./Setup.sol";

contract DappSolveTest is DSTest {
    DappSolve solve;

    Setup setup;

    function setUp() public {
        setup = new Setup{value: 100 ether}();
    }

    function test_solved2() public {
        assertTrue(!setup.isSolved());
    }

    function test_solved() public {
        solve = new DappSolve(setup);
        assertTrue(setup.isSolved());
    }
}
