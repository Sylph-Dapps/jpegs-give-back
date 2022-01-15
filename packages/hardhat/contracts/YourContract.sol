pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; 

interface BalanceOf {
    function balanceOf(address owner) external view returns (uint256 balance);
}
 
contract PunksVsApes {
 
    address public punksAddress = 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB;
 
    address public apesAddress = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D;
 
    address payable public owner;
 
    constructor() {
        owner = payable(msg.sender);
    }
   
    function donateAsPunk() external payable {
        require(BalanceOf(punksAddress).balanceOf(msg.sender) == 0, "msg.sender does not own an punk");
        owner.transfer(msg.value);
        console.log(msg.sender,"donated as punk");
    }
 
    function donateAsApe() external payable {
        require(BalanceOf(apesAddress).balanceOf(msg.sender) == 0, "msg.sender does not own an ape");
        owner.transfer(msg.value);
        console.log(msg.sender,"donated as ape");
    }
 
    function donateAsOther() external payable {
        owner.transfer(msg.value);
        console.log(msg.sender,"donated as other");
    }
}

