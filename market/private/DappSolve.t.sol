pragma solidity ^0.7.0;

import "ds-test/test.sol";

import "./DappSolve.sol";
import "./Setup.sol";

contract DappSolveTest is DSTest {
    DappSolve solve;

    Setup setup;

    function setUp() public {
        setup = new Setup{value: 50 ether}();
    }

    function test_solved2() public {
        assertTrue(!setup.isSolved());
    }

    function test_solved() public {
        solve = new DappSolve{value: 100 ether}(setup);
        assertTrue(setup.isSolved());
    }
}
