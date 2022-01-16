// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");
const {
  beneficiary,
  punkAddress,
  baycAddress,
  maycAddress,
  bakcAddress,
  baccAddress,
} = require('../../react-app/src/contracts/addresses');

const mainnetChainId = "1";
const localChainId = "31337";

const sleep = (ms) =>
  new Promise((r) =>
    setTimeout(() => {
      // console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
      r();
    }, ms)
  );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer, ape, both } = await getNamedAccounts();
  const chainId = await getChainId();

  let args;
  if(chainId === mainnetChainId) {
    args = [
      beneficiary,
      punkAddress,
      baycAddress,
      maycAddress,
      bakcAddress,
      baccAddress,
    ];
  } else if(chainId === localChainId) {
    const CryptopunksContract = await deploy("Cryptopunks", { from: deployer, log: true });
    const Cryptopunks = await ethers.getContract("Cryptopunks", deployer);
    
    const BaycContract = await deploy("BAYC", { from: deployer, log: true });
    const Bayc = await ethers.getContract("BAYC", deployer);

    const MaycContract = await deploy("MAYC", { from: deployer, log: true });
    const Mayc = await ethers.getContract("MAYC", deployer);
    //await Mayc.mint();

    const BakcContract = await deploy("BAKC", { from: deployer, log: true });
    const Bakc = await ethers.getContract("BAKC", deployer);
    //await Bakc.mint();

    const BaccContract = await deploy("BACC", { from: deployer, log: true });
    const Bacc = await ethers.getContract("BACC", deployer);
    //await Bacc.mint(0);
    //await Bacc.mint(1);
    //await Bacc.mint(69);
    //await Bacc.mint(2); // Not a galid serum number, will not qualify user as an ape

    const apeSigner = ethers.provider.getSigner(ape);
    const bothSigner = ethers.provider.getSigner(both);

    console.log("mint punk")
    await Cryptopunks.mint();
    console.log("mint ape")
    await Bayc.connect(apeSigner).mint();
    console.log("mint both")
    await Cryptopunks.connect(bothSigner).mint();
    await Bayc.connect(bothSigner).mint();

    args = [
      "0x0000000000000000000000000000000000000000",
      CryptopunksContract.address,
      BaycContract.address,
      MaycContract.address,
      BakcContract.address,
      BaccContract.address,
    ];
  } else {
    throw Error("Invalid chain ID. The necessary contracts are not deployed on the target chain.");
  }

  await deploy("JPEGsGiveBack", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: args,
    log: true,
  });

  // Getting a previously deployed contract
  const JPEGsGiveBack = await ethers.getContract("JPEGsGiveBack", deployer);
  
  //await JPEGsGiveBack.donateAsPunk({value: 1});
  //await JPEGsGiveBack.donateAsApe({value: 1});
  //await JPEGsGiveBack.donateAsOther({value: 1});

  /*  await YourContract.setPurpose("Hello");
  
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify your contracts with Etherscan
  // You don't want to verify on localhost
  if (chainId !== localChainId) {
    // wait for etherscan to be ready to verify
    await sleep(15000);
    await run("verify:verify", {
      address: JPEGsGiveBack.address,
      contract: "contracts/JPEGsGiveBack.sol:JPEGsGiveBack",
      contractArguments: [],
    });
  }
};
module.exports.tags = ["JPEGsGiveBack"];
