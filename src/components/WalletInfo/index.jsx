import style from "./wallet-info.module.css";
import CopySymbol from "@/assets/images/copy-symbol.svg";
import EtherscanLogo from "@/assets/images/etherscan-logo-circle.svg";
import DeleteIcon from "@/assets/images/trash.svg";
import ShareIcon from "@/assets/images/share.svg";

function WalletInfo() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>Wallet</h2>
        </div>
        <div className={style.info__body}>
          <div className={style.wallet_address}>
            <p>0xc0ffee254729296a45a3885639AC7E10F9d54979</p>
            <img src={CopySymbol.src} alt="" />
          </div>
          <div>
            <img className="w-[25px]" src={EtherscanLogo.src} alt="" />
          </div>
        </div>
        <div className={style.info__footer}>
            <div className={style.footer_actions}>
                <img src={DeleteIcon.src} className="w-[18px]" alt="" />
                <p>Delete Wallet</p>
            </div>
            <div className={style.footer_actions}>
                <img src={ShareIcon.src} className="w-[12px]" alt="" />
                <p>Share Wallet View</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WalletInfo;
