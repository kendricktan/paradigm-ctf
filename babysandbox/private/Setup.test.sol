pragma solidity ^0.7.3;

import "ds-test/test.sol";

import "./BabySandbox.sol";
import "./Solution.sol";
import "./Setup.sol";

contract DappSolveTest is DSTest {
    Setup setup;
    Solution solution;

    function setUp() public {
        setup = new Setup();
        solution = new Solution();
    }

    function test_solved() public {
        BabySandbox sandbox = BabySandbox(setup.sandbox());
        sandbox.run(address(solution));

        assertTrue(setup.isSolved());
    }
}
