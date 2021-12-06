import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export const ConnectIdle = function () {

  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  return (
    <div className="flex flex-col items-center">
        <div className="hero">
            <div className="text-center hero-content">
                <div className="max-w-md px-4 py-8">
                    <figure className="mb-5 ">
                        <img src="/logo_ani.svg" alt="logo" className="mask mask-squircle mx-auto" />
                    </figure>
                    <h1 className="mb-5 text-5xl font-bold">Summoner Crystal</h1>
                    <p className="mb-5">
                        Minting Soon. Stay Tuned.
                    </p>
                    <span className="text-red-500">
                        <span className="text-2xl">
                            Conncet Metamask to subscribe
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ConnectIdle;
