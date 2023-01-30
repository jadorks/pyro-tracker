import axios from "axios";
import { useEffect, useState } from "react";
import WalletChecker from "@/components/WalletChecker";

export default function DevWallet() {
  const [devTransactions, setDevTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDevWallet() {
      setIsLoading(true);
      const data = await axios
        .get("/api/dev-wallet")
        .then((response) => {
          return response.data.data.result;
        })
        .catch((error) => {
          console.error(error.message);
          return [];
        });
      setDevTransactions(data);
      setIsLoading(false);
    }

    fetchDevWallet();
  }, []);

  return (
    <div className="w-full lg:max-w-3xl">
      <WalletChecker
        walletTransactions={devTransactions}
        isLoading={isLoading}
      />
    </div>
  );
}
