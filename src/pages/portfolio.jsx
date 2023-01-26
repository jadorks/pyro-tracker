import { useEvmWalletTokenBalances } from "@moralisweb3/next";
import axios from "axios";
import { EvmChain } from "moralis/common-evm-utils";
import { useEffect, useState } from "react";

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
        const mergedData = [ tkn, data ];
        results.push(mergedData);
      }
      setTokenResults(results);
    }
    if (tokens != undefined) {
      fetchTokens();
    }
  }, [tokens]);

  return (
    <div>
      <table>
        <tr>
          <th>Token Name</th>
          <th>Price</th>
          <th>Holdings</th>
          <th>MarketCap</th>
          <th>1h</th>
          <th>6h</th>
          <th>24h</th>
          <th>Value</th>
        </tr>
        {tokenResults.map((tkn) => {            
          return (
            <tr>
              <td>{tkn[0].token.name}</td>
              <td>{tkn[1] ? tkn[1].priceUsd : "-"}</td>
              <td>{tkn[0].value}</td>
              <td>{tkn[1] ? tkn[1].fdv : "-"}</td>
              <td>{tkn[1] ? tkn[1].priceChange.h1 : "-"}</td>
              <td>{tkn[1] ? tkn[1].priceChange.h6 : "-"}</td>
              <td>{tkn[1] ? tkn[1].priceChange.h24 : "-"}</td>
              <td>{tkn[1] ? Number(tkn[1].priceUsd) * Number(tkn[0].value) : "-"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
