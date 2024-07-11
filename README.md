<<<<<<< HEAD
# Next.js + Hardhat Project

This project demonstrates the integration of a Next.js frontend with an Ethereum smart contract deployed using Hardhat. The contract allows the owner to deposit, withdraw, mint, transfer, and burn tokens.
=======
Next/Hardhat Project
>>>>>>> b2ea0dea1de7312898939302d84fdf38976852fc

## Prerequisites

Ensure you have the following installed:
- Node.js
- npm
- MetaMask extension in your browser

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Open three terminals in your VS Code:**

   **Terminal 1:** For running the frontend:
   ```bash
   npm run dev
   ```

   **Terminal 2:** For starting a local Ethereum node:
   ```bash
   npx hardhat node
   ```

   **Terminal 3:** For deploying the contract to the local Ethereum node:
   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

4. **Connect MetaMask:**
   - Open MetaMask.
   - Connect to the local Ethereum node (`localhost 8545`).

5. **Running the Project:**
   - The project will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **Frontend:**
  - The frontend is built using Next.js.
  - The main interaction happens in `pages/index.js`.

- **Smart Contract:**
  - The contract is located in `contracts/Assessment.sol`.
  - Contains functions for depositing, withdrawing, minting, transferring, and burning tokens.

- **Scripts:**
  - Deployment script is located in `scripts/deploy.js`.

## Smart Contract Details

**Contract Address:** `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`

**Contract Functions:**
- `getBalance`: Returns the current balance.
- `deposit`: Allows the owner to deposit ETH.
- `withdraw`: Allows the owner to withdraw ETH.
- `mint`: Allows the owner to mint tokens.
- `transfer`: Allows transferring tokens to another address.
- `burn`: Allows burning tokens.

## Frontend Features

- Connect MetaMask wallet.
- Display connected account and contract owner.
- Display current balance.
- Buttons to:
  - Deposit 1 ETH (only for owner)
  - Withdraw 1 ETH (only for owner)
  - Mint 1 Token (only for owner)
  - Transfer 1 Token
  - Burn 1 Token

## MetaMask Configuration

- Ensure MetaMask is connected to `localhost 8545`.
- Import the account provided by Hardhat to MetaMask for testing purposes.

## Troubleshooting

- **MetaMask not detected:**
  - Ensure MetaMask is installed and the browser extension is enabled.
  
- **Contract not deploying:**
  - Ensure the Hardhat node is running (`npx hardhat node`).
  - Check for any errors in the terminal where the deploy script is executed.

- **Frontend not loading:**
  - Ensure the frontend server is running (`npm run dev`).
  - Check for any console errors in the browser.

## License

This project is licensed under the MIT License. 

For any additional help or issues, feel free to open an issue in the repository.