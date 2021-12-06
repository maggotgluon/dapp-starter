
import { useWeb3React } from "@web3-react/core";
import { ConnectError } from "./ConnectError";
import { Connected } from "./Connected";
import { ConnectIdle } from "./ConnectIdle";

export const Subscribe = function () {
  const { active, error } = useWeb3React();
  
  return (
    <>
        {active ? <Connected /> : error ?  <ConnectError/> : <ConnectIdle/>}
      </>
  );
};

export default Subscribe;
