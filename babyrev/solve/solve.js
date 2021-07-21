const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545/fb45f45a-bc34-4252-9c3d-fb14fb422bae"
);
const wallet = new ethers.Wallet(
  "0x4f51aef8bf029c3a9e38d65641fd115404c8ca3d5c16fa29eae652acc1769abe",
  provider
);
const setupAddress = "0x61f538043377dCfd2B0Cd2a5ceb980c16E88cba3";
const setupAbi = `[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"challenge","outputs":[{"internalType":"contract ChallengeInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSolved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]`;
const setupContract = new ethers.Contract(setupAddress, setupAbi, wallet);

const main = async () => {
  const challengeAddress = await setupContract.challenge();

  const data = await provider.call({
    to: challengeAddress,
    data:
      "0xb8b8d35a" +
      ethers.utils.defaultAbiCoder
        .encode(
          ["uint256"],
          [
            ethers.BigNumber.from(
              "0"
            ),
          ]
        )
        .slice(2),
  });

  // if (
  //   data !==
  //   "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000026504354467b763332795f3533637532335f336e633279703731306e5f34313930323137686d7d0000000000000000000000000000000000000000000000000000"
  // ) {
  //   console.log("different");
  //   console.log(i);
  //   break;
  // }

  console.log(data);

  // const d = ethers.utils.defaultAbiCoder.decode(["uint256[3]"], data);
  // console.log(
  //   i,
  //   d[0].map((x) => x.toHexString())
  // );

  //   await wallet
  //     .sendTransaction({
  //       to: challengeAddress,
  //       data:
  //         "0xb8b8d35a" +
  //         ethers.utils.defaultAbiCoder.encode(["uint256"], [1]).slice(2),
  //       gasLimit: 6000000,
  //     })
  //     .then((x) => x.wait())
  //     .catch((e) => console.log("error", e));
};

main();
