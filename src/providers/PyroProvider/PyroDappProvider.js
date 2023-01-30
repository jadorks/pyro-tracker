import { useEvmTokenPrice } from "@moralisweb3/next";
import React from "react";
import PyroDappContext from "./context";

function PyroDappProvider({ children }) {
  const { data: ethPrice } = useEvmTokenPrice({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chain: "0x1",
  });

  const {data: pyroPrice} = useEvmTokenPrice({
    address: "0x1e2D230C7A7F4C679Fb1378F1f51dEDeAe85Cd72",
    chain: "0x1",
  });


  return (
    <PyroDappContext.Provider value={{ ethPrice, pyroPrice }}>
      {children}
    </PyroDappContext.Provider>
  );
}

function usePyroDapp() {
  const context = React.useContext(PyroDappContext);
  if (context === undefined) {
    throw new Error("usePyroDapp must be used within a YantraDappProvider");
  }
  return context;
}

export { PyroDappProvider, usePyroDapp };
