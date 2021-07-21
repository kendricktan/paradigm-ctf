const { ethers } = require("ethers");

const artifacts = require("./artifacts/combined.json");
const abi = artifacts.contracts["Solution.sol:Solution"].abi;
const bin = artifacts.contracts["Solution.sol:Solution"].bin;

const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545/94daa729-5b89-467f-a5a1-d52d1ec9abc8"
);
const wallet = new ethers.Wallet(
  "0x8ecc895f8bf21b843c952a438248e5f70d840bdcc22b69e4276497a09981141d",
  provider
);
const setupAddress = "0x80ed864CFa0d4080e3F22e10f29e494d665E45F3";

const sandboxAbi = `[{"inputs":[{"internalType":"address","name":"code","type":"address"}],"name":"run","outputs":[],"stateMutability":"payable","type":"function"}]`;
const setupAbi = `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"isSolved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sandbox","outputs":[{"internalType":"contract BabySandbox","name":"","type":"address"}],"stateMutability":"view","type":"function"}]`;

const main = async () => {
  const Factory = new ethers.ContractFactory(abi, bin, wallet);
  const deployed = await Factory.deploy();

  const setupContract = new ethers.Contract(setupAddress, setupAbi, wallet);
  const sandbox = new ethers.Contract(
    await setupContract.sandbox(),
    sandboxAbi,
    wallet
  );

  await sandbox.run(deployed.address);

  console.log("isSolved", await setupContract.isSolved());
};

main();
