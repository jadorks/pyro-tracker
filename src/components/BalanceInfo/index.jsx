import style from "./balance-info.module.css";
import EthereumLogo from "@/assets/images/ethereum.svg";
import DeleteIcon from "@/assets/images/trash.svg";

function BalanceInfo() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>$20.02</h2>
        </div>
        <div className={style.info__body}>
          <img src={EthereumLogo.src} alt="" />
          <p>0.01 ETH</p>
        </div>
        <div className={style.info__footer}>
          <div className={style.footer_action}>
            <img src={DeleteIcon.src} className="w-[18px]" alt="" />
            <p>Hide small balances</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceInfo;
