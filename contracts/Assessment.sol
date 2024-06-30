// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Mint(address to, uint256 amount);
    event Transfer(address from, address to, uint256 amount);
    event Burn(address from, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender); // Set the owner to the account that deployed the contract
        balance = initBalance;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit() public payable onlyOwner {
        uint256 _amount = msg.value; // Get the amount sent in the transaction
        uint256 _previousBalance = balance;
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }
        balance -= _withdrawAmount;
        payable(owner).transfer(_withdrawAmount); // Send ETH to the owner
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        balance += amount;
        emit Mint(to, amount);
    }

    function transfer(address to, uint256 amount) public {
        require(balance >= amount, "Insufficient balance");
        require(to != address(0), "Cannot transfer to the zero address");
        balance -= amount;
        emit Transfer(msg.sender, to, amount);
    }

    function burn(uint256 amount) public {
        require(balance >= amount, "Insufficient balance");
        balance -= amount;
        emit Burn(msg.sender, amount);
    }
}
