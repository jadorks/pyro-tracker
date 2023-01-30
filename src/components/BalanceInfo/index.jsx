import style from "./balance-info.module.css";
import EthereumLogo from "@/assets/images/ethereum.svg";
import DeleteIcon from "@/assets/images/trash.svg";
import { usePyroDapp } from "@/providers/PyroProvider/PyroDappProvider";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";

function BalanceInfo({ data, toggleNFT, isNFTView }) {
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

  const { ethPrice } = usePyroDapp();

  const ethValue = (walletBalanceUSD() / ethPrice?.usdPrice).toFixed(5);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>${walletBalanceUSD()}</h2>
        </div>
        <div className={style.info__body}>
          <img src={EthereumLogo.src} alt="" />
          <p>{!isNaN(ethValue) ? ethValue : "-"} ETH</p>
        </div>
        <div className={style.info__footer}>
          <div
            className={`${style.footer_action} cursor-pointer`}
            onClick={toggleNFT}
          >
            <ArrowsRightLeftIcon className="w-5"/>
            <p>{isNFTView ? "View Tokens" : "View NFTs"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
