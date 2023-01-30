import style from "./balance-info.module.css";
import EthereumLogo from "@/assets/images/ethereum.svg";
import DeleteIcon from "@/assets/images/trash.svg";
import { useEvmTokenPrice } from "@moralisweb3/next";

function BalanceInfo({ data }) {
  const walletBalanceUSD = () => {
    let total = 0;
    const cleanData = data.filter((value) => value[1] != undefined);
    cleanData.forEach((elem) => {
      const value = elem[1].priceUsd * elem[0].value;
      if (!isNaN(value)) {
        total += value;
      }
    });
    return total.toFixed(2);
  };

  const { data: priceData } = useEvmTokenPrice({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chain: "0x1",
  });

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>${walletBalanceUSD()}</h2>
        </div>
        <div className={style.info__body}>
          <img src={EthereumLogo.src} alt="" />
          <p>{(walletBalanceUSD() / priceData?.usdPrice).toFixed(5)} ETH</p>
        </div>
        <div className={style.info__footer}>
          <div className={style.footer_action}>
            <img src={DeleteIcon.src} className="w-[18px]" alt="" />
            <p>View NFTs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
