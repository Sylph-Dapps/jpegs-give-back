pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Cryptopunks is ERC721Enumerable {

  uint256 public mintCount = 0;

  constructor() ERC721("Cryptopunk", "Cryptopunks") {}

  function mint() public payable {
    mintCount++;
    _safeMint(msg.sender, mintCount);
  }
}

contract BAYC is ERC721Enumerable {

  uint256 public mintCount = 0;

  constructor() ERC721("BAYC", "BAYC") {}

  function mint() public payable {
    mintCount++;
    _safeMint(msg.sender, mintCount);
  }
}

contract MAYC is ERC721Enumerable {

  uint256 public mintCount = 0;

  constructor() ERC721("MAYC", "MAYC") {}

  function mint() public payable {
    mintCount++;
    _safeMint(msg.sender, mintCount);
  }
}

contract BAKC is ERC721Enumerable {

  uint256 public mintCount = 0;

  constructor() ERC721("BAKC", "BAKC") {}

  function mint() public payable {
    mintCount++;
    _safeMint(msg.sender, mintCount);
  }
}

contract BACC is ERC1155 {

  uint256 public mintCount = 0;

  constructor() ERC1155("") {}

  function mint(uint256 id) public payable {
    mintCount++;
    _mint(msg.sender, id, 1, abi.encodePacked(mintCount));
  }
}