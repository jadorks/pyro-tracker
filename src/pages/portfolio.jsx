import BalanceInfo from "@/components/BalanceInfo";
import PortfolioForm from "@/components/PortfolioForm";
import PortfolioTable from "@/components/PortfolioTable";
import WalletChart from "@/components/WalletChart";
import WalletInfo from "@/components/WalletInfo";
import {
  useEvmNativeBalance,
  useEvmWalletTokenBalances,
} from "@moralisweb3/next";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "@/assets/images/spinner.svg";
import { WETH } from "@/constants/metadata";

export default function Portfolio() {
  const [walletAddress, setWalletAddress] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);
  const [tokenResults, setTokenResults] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [nativeBalance, setNativeBalance] = useState(0);

  const { fetch, isFetching } = useEvmWalletTokenBalances();

  const { fetch: nativeFetch, isFetching: nativeIsFetching } =
    useEvmNativeBalance();

  const fetchTokenBalances = async (address) => {
    const response = await fetch({ address, chain: "0x1" });
    const nativeResponse = await nativeFetch({ address, chain: "0x1" });
    setTokens(response);
    setNativeBalance(nativeResponse);
    localStorage.setItem("savedWalletAddress", JSON.stringify(address));
  };

  useEffect(() => {
    const address = localStorage.getItem("savedWalletAddress");
    const initial = JSON.parse(address);
    if (initial && initial.length > 0) {
      setIsLoading(true);
      fetchTokenBalances(initial);
    }
  }, []);

  useEffect(() => {
    async function fetchTokens() {
      setIsLoading(true);
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

      const nativeData = await axios
        .get(
          `https://api.dexscreener.com/latest/dex/tokens/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`
        )
        .then((response) => {
          return response.data?.pairs?.[0];
        })
        .catch((error) => {
          console.error(error);
          return undefined;
        });
      const mergedNativeData = [{ ...WETH, value: nativeBalance.balance.ether }, nativeData];
      console.log(mergedNativeData);
      results.push(mergedNativeData);
      setTokenResults(results);
      setIsLoading(false);
    }
    if (tokens != undefined) {
      fetchTokens();
    }
  }, [tokens]);

  const memData = React.useMemo(() => tokenResults, [tokenResults]);

  return isFetching || isLoading ? (
    <div>
      <img src={Spinner.src} alt="" />
    </div>
  ) : tokenResults != undefined ? (
    <div className="w-full px-4 py-4 lg:px-10">
      <div className="flex flex-col lg:flex-row pb-8 gap-10">
        <WalletInfo walletAddress={walletAddress} />
        <WalletChart data={memData} />
        <BalanceInfo data={memData} />
      </div>
      <PortfolioTable data={memData} />
    </div>
  ) : (
    <div>
      <PortfolioForm
        onSubmit={fetchTokenBalances}
        setAddress={setWalletAddress}
        address={walletAddress}
      />
    </div>
  );
}
