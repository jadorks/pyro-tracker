import style from "./navbar.module.css";
import EthereumLogo from "@/assets/images/ethereum.svg";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useProSidebar } from "react-pro-sidebar";

export default function Navbar() {

  const { collapseSidebar } = useProSidebar();
  return (
    <div className={style.navbar}>
      <div className={style.navbar__left}>
        <div className={style.mobile_menu}>
          <Bars3Icon
            className={`${false ? "" : "text-opacity-100"}
                  h-8 w-8 text-white transition duration-150 ease-in-out group-hover:text-opacity-80 cursor-pointer`}
            aria-hidden="true"
            onClick={()=>{collapseSidebar()}}
          />
        </div>
        <div className={style.token_price}>
          <img src={EthereumLogo.src} alt="" />
          <p>ETH $1630.02</p>
        </div>
      </div>
      <div className={style.navbar__right}>
        <button className={style.connect_btn}>Connect Wallet</button>
      </div>
    </div>
  );
}
