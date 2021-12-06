import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
  } from "@web3-react/injected-connector";
  import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
  import logger from "../logger";
  
function getErrorMessage(error: Error) {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    }
    if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network. Please switch to the Ropsten test network";
    }
    if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
      return "Please authorize this website to access your Ethereum account.";
    }
    logger.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }

export const ConnectError = function () {

  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  return (
    <div>{!!error && <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>{getErrorMessage(error)}</h4>}</div>
  );
};

export default ConnectError;
