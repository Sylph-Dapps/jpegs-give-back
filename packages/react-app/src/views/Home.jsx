import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";

import './Home.scss';

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const punkTotal = useContractReader(readContracts, "JPEGsGiveBack", "punkTotal", [], 60000000);
  const apeTotal = useContractReader(readContracts, "JPEGsGiveBack", "apeTotal", [], 60000000);
  const otherTotal = useContractReader(readContracts, "JPEGsGiveBack", "otherTotal", [], 60000000);
  let grandTotal = null;
  if(punkTotal && apeTotal && otherTotal) {
    grandTotal = punkTotal.add(apeTotal).add(otherTotal);
  }

  return (
    <div className="Home">
      <div>
        <p>
          Cryptopunks have donated {punkTotal && punkTotal.toString()} ETH.
          <Button type="primary">Donate as a Cryptopunk</Button>
        </p>
        <p>
          Bored Apes have donated {apeTotal && apeTotal.toString()} ETH.
        </p>
        <p>
          Everyone else has donated {otherTotal && otherTotal.toString()} ETH.
        </p>
        <p>
          For a grand total of {grandTotal && grandTotal.toString()} ETH.
        </p>
      </div>
      <div>
        <p>
          The members of the Cryptopunk and Bored Ape communities are some of the wealthiest people in crypto, but they wouldn't be where they are today if it weren't for the developers that built the systems on which their communities depend. This goes beyond Larva Labs and Yuga Labs. Their work wouldn't exist without Ethereum. Ethereum wouldn't exist without Go. Go wouldn't exist without... you get the point. Modern software is built on the shoulders of giants.
        </p>
        <p>
          <a href="https://girlswhocode.com/" target="_blank">Girls Who Code</a> is raising the <i>next</i> generation of programmers and ensuring that it will be more diverse than the current one. The next open source library that is vital to the minting of a millionaire might very well be a written by a Girls Who Code participant.
        </p>
        <p><i>JPEGs Pay It Forward</i> calls on the Cryptopunk and Bored Ape communities, who owe so much to previous generations of developers, to donate to Girls Who Code. But which community will donate the most?</p>
        <p>
          If you don't own an ape or a punk, you can still donate, and your donation will be counted in a pool separate from the apes and the punks. Can the wider crypto community raise even more for Girls Who Code than the two most notable NFT communities?
        </p>
        <Button type="primary">Connect your wallet to donate</Button>
      </div>
    </div>
  );
}

export default Home;
