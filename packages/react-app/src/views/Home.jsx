import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";

import './Home.scss';

function TrackerRow({title, percent, total, className}) {
  return (
    <div className="tracker-row">
      <div className="tracker-row-title">{title}</div>
      <div className="bar-container">
        <div className={className} style={{width: percent}}></div>
        <div>{total && ethers.utils.formatEther(total.toString()).toString()} ETH</div>
      </div>
    </div>
  );
}

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({
  readContracts,
  loadWeb3Modal,
  userSigner,
  writeContracts,
}) {

  const [donationAmount, setDonationAmount] = React.useState();
  const [donated, setDonated] = React.useState(false);

  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const punkTotal = useContractReader(readContracts, "JPEGsGiveBack", "punkTotal", []);
  const apeTotal = useContractReader(readContracts, "JPEGsGiveBack", "apeTotal", []);
  const otherTotal = useContractReader(readContracts, "JPEGsGiveBack", "otherTotal", []);
  let grandTotal = null;
  let punkPercent = '0%';
  let apePercent = '0%';
  let otherPercent = '0%';
  const targetAmount = 2;
  if(punkTotal && apeTotal && otherTotal) {
    grandTotal = punkTotal.add(apeTotal).add(otherTotal);
    punkPercent = punkTotal == 0 ? '2px' : (punkTotal / grandTotal / targetAmount) * 100 + '%';
    apePercent = apeTotal == 0 ? '2px' : (apeTotal / grandTotal / targetAmount) * 100 + '%';
    otherPercent = otherTotal == 0 ? '2px' : (otherTotal / grandTotal / targetAmount) * 100 + '%';
  }

  const hasPunk = useContractReader(writeContracts, "JPEGsGiveBack", "hasPunk");
  const hasApe = useContractReader(writeContracts, "JPEGsGiveBack", "hasApe");
  console.log(hasPunk, hasApe)

  const donateAsPunk = async () => {
    await writeContracts.JPEGsGiveBack.donateAsPunk({value: ethers.utils.parseEther(donationAmount)});
    setDonated(true);
  };

  const donateAsApe = async () => {
    await writeContracts.JPEGsGiveBack.donateAsApe({value: ethers.utils.parseEther(donationAmount)});
    setDonated(true);
  };

  const donateAsOther = async () => {
    await writeContracts.JPEGsGiveBack.donateAsOther({value: ethers.utils.parseEther(donationAmount)});
    setDonated(true);
  };

  return (
    <div className="Home">
      <div>
        <div className="grand-total">
          Together we've raised {grandTotal && ethers.utils.formatEther(grandTotal.toString()).toString()} ETH for Girls Who Code!
        </div>
        <div className="tracker">
          <div className="breakdown">Breakdown by community:</div>
          <TrackerRow
            title="Cryptopunks"
            percent={punkPercent}
            total={punkTotal}
            className="bar punk"
          />
          <TrackerRow
            title="Apes"
            percent={apePercent}
            total={apeTotal}
            className="bar ape"
          />
          <TrackerRow
            title="Everyone else"
            percent={otherPercent}
            total={otherTotal}
            className="bar other"
          />
        </div>
      </div>
      <div className="donation-section">
        { !userSigner &&
          <Button
            type="primary"
            onClick={loadWeb3Modal}
          >Connect your wallet to donate</Button>
        }
        { userSigner &&
          <>
            {!donated &&
              <>
                <p>
                  <p>Donation amount:</p>
                  <input
                    style={{width: '100px'}}
                    onChange={e => setDonationAmount(e.target.value)}
                    value={donationAmount}
                  ></input> ETH
                </p>
                <div className="donate-buttons">
                  <Button
                    type="primary"
                    onClick={donateAsPunk}
                    disabled={!hasPunk}
                  >Donate as a punk</Button>
                  <Button
                    type="primary"
                    onClick={donateAsApe}
                    disabled={!hasApe}
                  >Donate as a an ape</Button>
                  <Button
                    type="primary"
                    onClick={donateAsOther}
                  >Donate as a member of the wider community</Button>
                </div>
              </>
            }
            {donated &&
              <p className="thanks">Thank you for your donation!</p>
            }
          </>
        }
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
      </div>
    </div>
  );
}

export default Home;
