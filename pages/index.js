import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [owner, setOwner] = useState(undefined);

  const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const atmABI = atm_abi.abi;

  useEffect(() => {
    const fetchWallet = async () => {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          handleAccount(accounts[0]);
        }
      } else {
        console.error("MetaMask is not installed");
      }
    };
    fetchWallet();
  }, []);

  const handleAccount = async (account) => {
    setAccount(account);
    if (account && ethWallet) {
      await getATMContract();
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting MetaMask account:", error);
    }
  };

  const getATMContract = async () => {
    if (ethWallet) {
      try {
        const provider = new ethers.providers.Web3Provider(ethWallet);
        const signer = provider.getSigner();
        const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
        setATM(atmContract);

        // Fetch initial data after setting up the contract
        await Promise.all([getOwner(), getBalance()]);
      } catch (error) {
        console.error("Error creating ATM contract instance:", error);
      }
    } else {
      console.error("MetaMask wallet is not available");
    }
  };

  const getOwner = async () => {
    if (atm) {
      try {
        const ownerAddress = await atm.owner();
        setOwner(ownerAddress);
      } catch (error) {
        console.error("Error fetching owner address:", error);
      }
    }
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
        setBalance(ethers.utils.formatEther(balance)); // Convert balance to ETH string
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (atm && account === owner) {
      try {
        const tx = await atm.deposit({ value: ethers.utils.parseEther("1.0") });
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing ETH:", error);
      }
    } else {
      alert("Only the owner can perform this action");
    }
  };

  const withdraw = async () => {
    if (atm && account === owner) {
      try {
        const tx = await atm.withdraw(ethers.utils.parseEther("1.0"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing ETH:", error);
      }
    } else {
      alert("Only the owner can perform this action");
    }
  };

  const mint = async () => {
    if (atm && account === owner) {
      try {
        const tx = await atm.mint(account, ethers.utils.parseUnits("1", 18));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error minting token:", error);
      }
    } else {
      alert("Only the owner can perform this action");
    }
  };

  const transfer = async () => {
    if (atm) {
      try {
        const tx = await atm.transfer(account, ethers.utils.parseUnits("1", 18));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error transferring token:", error);
      }
    }
  };

  const burn = async () => {
    if (atm) {
      try {
        const tx = await atm.burn(ethers.utils.parseUnits("1", 18));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error burning token:", error);
      }
    }
  };

  useEffect(() => {
    if (account && atm) {
      getBalance();
      getOwner();
    }
  }, [account, atm]);

  const initUser = () => {
    if (!ethWallet) {
      return <p style={{ color: "red" }}>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount} style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
          Connect MetaMask Wallet
        </button>
      );
    }

    return (
      <div style={{ marginTop: "20px" }}>
        <p>Your Account: {account}</p>
        <p>Contract Owner: {owner}</p>
        <p>Your Balance: {balance} ETH</p>
        <button onClick={deposit} style={{ backgroundColor: "green", color: "white", padding: "10px 20px", borderRadius: "5px", marginRight: "10px" }}>
          Deposit 1 ETH
        </button>
        <button onClick={withdraw} style={{ backgroundColor: "red", color: "white", padding: "10px 20px", borderRadius: "5px", marginRight: "10px" }}>
          Withdraw 1 ETH
        </button>
        <button onClick={mint} style={{ backgroundColor: "yellow", color: "black", padding: "10px 20px", borderRadius: "5px", marginRight: "10px" }}>
          Mint 1 Token
        </button>
        <button onClick={transfer} style={{ backgroundColor: "purple", color: "white", padding: "10px 20px", borderRadius: "5px", marginRight: "10px" }}>
          Transfer 1 Token
        </button>
        <button onClick={burn} style={{ backgroundColor: "gray", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
          Burn 1 Token
        </button>
      </div>
    );
  };

  return (
    <div>
      {initUser()}
    </div>
  );
}
