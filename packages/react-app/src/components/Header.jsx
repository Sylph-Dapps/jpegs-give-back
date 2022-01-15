import React from "react";
import { PageHeader } from "antd";
import { Account } from "../components";

export default function Header(props) {
  const {
    address,
    localProvider,
    userSigner,
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    blockExplorer,
  } = props;

  return (
    <div className="Header">
      <PageHeader
        title={
          <div style={{
            textAlign: 'left'
          }}>
            <div><a href="/" target="_blank" rel="noopener noreferrer">JPEGs Pay It Forward</a></div>
            <div style={{
              fontSize: '11px',
              fontWeight: 'normal',
              lineHeight: '1.2em',
            }}>a charity drive for <a href="https://girlswhocode.com/" target="_blank">Girls Who Code</a> by <a href="https://sylphdapps.com" target="_blank">Sylph Dapps</a></div>
          </div>
        }
        extra={[
          <div className="extras" key="extra">
            <Account
              address={address}
              localProvider={localProvider}
              userSigner={userSigner}
              web3Modal={web3Modal}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              blockExplorer={blockExplorer}
            />
          </div>
        ]}
      />
    </div>
  );
}
