import BalanceInfo from "@/components/BalanceInfo";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioTable from "@/components/PortfolioTable";
import WalletChart from "@/components/WalletChart";
import WalletInfo from "@/components/WalletInfo";
import { useEvmWalletTokenBalances } from "@moralisweb3/next";
import axios from "axios";
import { EvmChain } from "moralis/common-evm-utils";
import React, { useEffect, useState } from "react";

export default function Portfolio() {
  const address = "0x3145Fbf82170A049c30Cbd2706e0714f47826cb8";
  const chain = EvmChain.ETHEREUM;
  const [tokenResults, setTokenResults] = useState([]);

  const { data: tokens } = useEvmWalletTokenBalances({ address, chain });

  useEffect(() => {
    async function fetchTokens() {
      const results = [];

      for (const tkn of tokens) {
        const data = await axios
          .get(
            `https://api.dexscreener.com/latest/dex/tokens/${tkn?.token.contractAddress.checksum}`
          )
          .then((response) => {
            return response.data?.pairs?.[0];
          })
          .catch((error) => {
            console.error(error);
            return undefined;
          });
        const mergedData = [tkn, data];
        results.push(mergedData);
      }
      setTokenResults(results);
    }
    if (tokens != undefined) {
      fetchTokens();
    }
  }, [tokens]);

  const memData = React.useMemo(() => tokenResults, [tokenResults]);

  return true ? (
    <div className="w-full px-4 py-4 lg:px-10">
      {/* <PortfolioForm /> */}
      <div className="flex flex-col lg:flex-row pb-8 gap-10">
        <WalletInfo />
        <WalletChart data={memData}/>
        <BalanceInfo data={memData}/>
      </div>
      <PortfolioTable data={memData} />
    </div>
  ) : (
    <div>
      <PortfolioForm />
    </div>
  );
}
