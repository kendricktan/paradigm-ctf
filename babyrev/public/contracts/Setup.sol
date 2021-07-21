pragma solidity 0.4.24;

import "private/Challenge.sol";

interface ChallengeInterface {
    function solved() public view returns (bool);
}

contract Setup {
    ChallengeInterface public challenge;
    
    constructor() public payable {
        require(msg.value == 50 ether);
        
        challenge = ChallengeInterface(address(new Challenge()));
    }
    
    function isSolved() public view returns (bool) {
        return challenge.solved();
    }
}

// 1. No msg.value

/*

var1 = 0x019c;
var2 = storage[0x00] & 0xff;

var temp18 = memory[0x40:0x60];
memory[temp18:temp18 + 0x20] = !!var2;

var temp19 = memory[0x40:0x60];

return memory[temp19:temp19 + (temp18 + 0x20) - temp19];

*/