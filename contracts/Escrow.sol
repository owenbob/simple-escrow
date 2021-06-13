// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract  Escrow is AccessControl{
    using SafeMath for uint256;

    mapping(address => uint256) public funds;
    mapping(address => address) public parties;
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    address owner;
    uint256 agentRate = 2;
    
    constructor(){
        owner = msg.sender;

        // Make contract creator admin
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
        
        // grant contract creator AGENT_ROLE
        grantRole(AGENT_ROLE, owner);

    }

    function depositFunds(address seller) public payable{
        require(msg.value != 0, "Zero funds deposited!");
        uint256 amount = msg.value;
        
        // get agent fee
        uint256 calculation = amount.mul(agentRate);
        uint256 agentFee = calculation.div(100);
        uint256 amountToTransfer = amount.sub(agentFee);

        parties[msg.sender] = seller;
        funds[seller] = funds[seller].add(amountToTransfer);
        payable(owner).transfer(agentFee);
    }
    
    function getOwnerBalance() public view returns (uint256){
        return owner.balance;
    }

    function releaseFunds(address payable seller) public {
        require(hasRole(AGENT_ROLE, msg.sender), "Caller is not an Agent");
        uint256 payment =  funds[seller];
        funds[seller] = 0;
        seller.transfer(payment);
    }
    
    function revertFunds(address payable buyer) public {
        require(hasRole(AGENT_ROLE, msg.sender), "Caller is not an Agent");
        address seller = parties[buyer];
        uint256 payment =  funds[seller];
        funds[seller] = 0;
        buyer.transfer(payment);
    }
    
}


