import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export const Connected = function () {

  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  return (
    <div className="flex flex-col items-center">
        <h1>Connected</h1>
        <img src={`https://robohash.org/${account.toString()}`} />
        <label className="input-group justify-center my-20" htmlFor="email">
            <span>Enter E mail to Subscribe </span> 
            <input type="email" id="email"placeholder="info@site.com" className="input input-bordered" />
            <button type="button" className="rounded-l-none btn btn-primary">Subscribe</button>
        </label>
    </div>
  );
};

export default Connected;
