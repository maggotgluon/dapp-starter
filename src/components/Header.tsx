/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";

import { Account } from "./Account";
import { Balance } from "./Balance";
import { ChainId } from "./ChainId";
import { ConnectMetamask } from "./ConnectMetamask";

export const Header = function () {
  const { active, error } = useWeb3React();

  return (
    <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
      <span className="text-lg font-bold">{active ? "🟢 " : error ? "🔴" : "🟠 "}</span>
      <span className="text-lg hidden lg:inline-block font-bold">{active ? " Ropesten Test Network" : error ? "" : " Please Connect to Ropesten Test Network"}</span>
      </div>
      <div className="flex-none hidden px-2 mx-2 lg:flex">
        <div className="flex justify-items-center items-center">
          {/* <ChainId /> */}
          <Account />
          <Balance />
          
        </div>
      </div>
      <ConnectMetamask />
    </div>
  );
};

export default Header;
