const hre = require("hardhat");

async function main() {
  const initBalance = hre.ethers.utils.parseUnits("1", 18); // Initialize balance with 1 ETH
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`Contract deployed to ${assessment.address} with an initial balance of ${initBalance.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
