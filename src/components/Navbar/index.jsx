import style from "./navbar.module.css"
import EthereumLogo from "@/assets/images/ethereum.svg"

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <div className={style.navbar__left}>
        <div className={style.token_price}>
          <img src={EthereumLogo.src} alt="" />
          <p>ETH $1630.02</p>
        </div>
      </div>
      <div className={style.navbar__right}>
        <button className={style.connect_btn}>
          Connect Wallet
        </button>
      </div>
    </div>
  )
}
