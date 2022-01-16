pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";

interface ERC721ish {
    function balanceOf(address owner) external view returns (uint256 balance);
}
interface ERC1155ish {
    function balanceOf(address account, uint256 id) external view returns (uint256 balance);
}

contract JPEGsGiveBack is Ownable {

    address payable public beneficiary;

    address public punksAddress;

    address public baycAddress;
    address public maycAddress;
    address public bakcAddress;
    address public baccAddress;

    uint256 public punkTotal;
    uint256 public apeTotal;
    uint256 public otherTotal;

    bool public isActive = false;

    constructor(address payable _beneficiary, address _punksAddress, address _baycAddress, address _maycAddress, address _bakcAddress, address _baccAddress) {
        beneficiary = _beneficiary;
        punksAddress = _punksAddress;
        baycAddress = _baycAddress;
        maycAddress = _maycAddress;
        bakcAddress = _bakcAddress;
        baccAddress = _baccAddress;
    }

    modifier onlyPunkHolder() {
        require(
            hasPunk(),
            "msg.sender is not a punk"
        );
        _;
    }

    modifier onlyApeHolder() {
        require(
            hasApe(),
            "msg.sender is not an ape"
        );
        _;
    }

    function hasPunk() public view returns (bool answer) {
        return ERC721ish(punksAddress).balanceOf(msg.sender) > 0;
    }

    function hasApe() public view returns (bool answer) {
        return (
            ERC721ish(baycAddress).balanceOf(msg.sender) > 0 ||
            ERC721ish(maycAddress).balanceOf(msg.sender) > 0 ||
            ERC721ish(bakcAddress).balanceOf(msg.sender) > 0 ||
            ERC1155ish(baccAddress).balanceOf(msg.sender, 0) > 0 ||
            ERC1155ish(baccAddress).balanceOf(msg.sender, 1) > 0 ||
            ERC1155ish(baccAddress).balanceOf(msg.sender, 69) > 0
        );
    }
   
    function donateAsPunk() external payable onlyPunkHolder {
        punkTotal = punkTotal + msg.value;
        beneficiary.transfer(msg.value);
    }

    function donateAsApe() external payable onlyApeHolder {
        apeTotal = apeTotal + msg.value;
        beneficiary.transfer(msg.value);
    }

    function donateAsOther() external payable {
        otherTotal = otherTotal + msg.value;
        beneficiary.transfer(msg.value);
    }

    function flipActiveState() public onlyOwner {
        isActive = !isActive;
    }
}
