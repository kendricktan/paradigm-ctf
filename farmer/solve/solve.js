const { ethers } = require("ethers");

const setupAbi = `[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"CDAI","outputs":[{"internalType":"contract CERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMP","outputs":[{"internalType":"contract ERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"contract ERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROUTER","outputs":[{"internalType":"contract UniRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract WETH9","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"farmer","outputs":[{"internalType":"contract CompDaiFarmer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"faucet","outputs":[{"internalType":"contract CompFaucet","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSolved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]`;
const wethAbi = `[{"inputs":[{"internalType":"address","name":"guy","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"qty","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"qty","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]`;
const compDaiFarmerAbi = `[{"inputs":[],"name":"CDAI","outputs":[{"internalType":"contract CERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"COMP","outputs":[{"internalType":"contract ERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"contract WETH9","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newHarvester","type":"address"}],"name":"changeHarvester","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimAndRecycle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"comptroller","outputs":[{"internalType":"contract IComptroller","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dai","outputs":[{"internalType":"contract ERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvester","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"peekYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recycle","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"redeemUnderlying","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract UniRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_comptroller","type":"address"}],"name":"setComp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]`;
const compFaucetAbi = `[{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address[]","name":"","type":"address[]"}],"name":"claimComp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimableComp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"comp","outputs":[{"internalType":"contract ERC20Like","name":"","type":"address"}],"stateMutability":"view","type":"function"}]`;

const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545/d98d8379-8265-4001-9862-ee1a0fb7f1c2"
);
const wallet = new ethers.Wallet(
  "0xe5217fc3189c961223fcaac8bcf2cc2fbbdf89aec86e67ee85f23d0ea8a452f5",
  provider
);

const SETUP_CONTRACT_ADDRESS = `0x226F777e240B085b3dBe9A47B3Ce6237ce3d2541`;
const setupContract = new ethers.Contract(
  SETUP_CONTRACT_ADDRESS,
  setupAbi,
  wallet
);

const main = async () => {
  const COMP_DAI_FARMER_ADDRESS = await setupContract.farmer();
  const COMP_FAUCET = await setupContract.faucet();

  const compDaiFarmerContract = new ethers.Contract(
    COMP_DAI_FARMER_ADDRESS,
    compDaiFarmerAbi,
    wallet
  );
  const compFaucetContract = new ethers.Contract(
    COMP_FAUCET,
    compFaucetAbi,
    wallet
  );

  await compDaiFarmerContract.claim();
  await compDaiFarmerContract.recycle();
  await compDaiFarmerContract.mint();

  console.log("solved", await setupContract.isSolved());
};

main();
