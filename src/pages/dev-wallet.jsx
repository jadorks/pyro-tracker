import axios from "axios";
import { useEffect, useState } from "react";

export default function DevWallet() {
  const [devTransactions, setDevTransactions] = useState([]);

  useEffect(() => {
    async function fetchDevWallet() {
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
    }

    fetchDevWallet();
  }, []);

  return (
    <div>
      Dev Wallet
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Function</th>
            <th>Date</th>
            <th>Etherscan</th>
          </tr>
        </thead>

        <tbody>
          {devTransactions.map((devTx, index) => {
            return (
              <tr key={index}>
                <td>{devTx.isError == "1" ? "Fail" : "Pass"}</td>
                <td>{devTx.functionName.split("(")[0]}</td>
                <td>{devTx.timeStamp}</td>
                <td><a href={`https://etherscan.io/tx/${devTx.hash}`} target="_blank" rel="noopener noreferrer">Etherscan</a></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
