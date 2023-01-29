import React from "react";
import style from "./wallet-checker.module.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { EyeIcon } from "@heroicons/react/20/solid";

function WalletChecker({ walletTransactions }) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.tracker__header}>
          <p className={style.tracker__title}>Dev Wallet Checker</p>
        </div>
        <div className={style.tracker__body}>
          <table className={style.table}>
            <thead className={style.table__head}>
              <tr>
                <td>Function</td>
                <td>Date</td>
                <td>TX</td>
              </tr>
            </thead>
            <tbody className={style.table__body}>
              {walletTransactions
                .filter((devTx) => devTx.functionName.length > 0)
                .map((devTx, index) => {
                  return (
                    <tr key={index}>
                      <td>{devTx.functionName.split("(")[0]}</td>
                      <td>
                        {formatDistanceToNow(new Date(devTx.timeStamp * 1000), {
                          addSuffix: true,
                        })}
                      </td>
                      <td>
                        <a
                          href={`https://etherscan.io/tx/${devTx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <EyeIcon />
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WalletChecker;
