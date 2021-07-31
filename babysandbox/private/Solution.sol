pragma solidity ^0.7.0;

contract StateChanger {
    uint256 state = 0;
    function changeState() public {
        state = state + 1;
    }
}

contract Solution {
    StateChanger private immutable state = new StateChanger();

    fallback() external payable {
        (bool success,) = address(state).call(
            abi.encodePacked(StateChanger.changeState.selector)
        );

        if (success) {
            selfdestruct(address(this));
        }
    }
} 