import React, { useState } from "react";
import style from "./navbar.module.css";
import EthereumLogo from "@/assets/images/ethereum.svg";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useProSidebar } from "react-pro-sidebar";
import PyroLogo from "@/assets/images/pyro-logo-no-text.svg";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { usePyroDapp } from "@/providers/PyroProvider/PyroDappProvider";
import { usdFormatter } from "@/utils/utils";
import WalletManager from "../WalletManager";
import { shortenIfAddress, useEthers } from "@usedapp/core";

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }

  const { account } = useEthers();

  const { collapseSidebar } = useProSidebar();
  const { ethPrice, pyroPrice } = usePyroDapp();
  const ethUSDPrice = !isNaN(ethPrice?.usdPrice)
    ? usdFormatter.format(ethPrice?.usdPrice)
    : "-";
  const pyroUSDPrice = !isNaN(pyroPrice?.usdPrice)
    ? usdFormatter.format(pyroPrice?.usdPrice)
    : "-";

  return (
    <>
      <div className={style.navbar}>
        <div className={style.navbar__left}>
          <Bars3Icon
            className={`${false ? "" : "text-opacity-100"}
                  h-8 w-8 text-white transition duration-150 ease-in-out group-hover:text-opacity-80 cursor-pointer`}
            aria-hidden="true"
            onClick={() => {
              collapseSidebar();
            }}
          />
          <div className={style.token_price}>
            <img src={EthereumLogo.src} alt="" />
            <p>ETH {ethUSDPrice}</p>
          </div>
          <div className={style.token_price}>
            <img src={PyroLogo.src} className="w-6" alt="" />
            <p>PYRO {pyroUSDPrice}</p>
          </div>
        </div>
        <div className={style.mobile__left}>
          <div>
            <img src={PyroLogo.src} alt="" />
          </div>
          <div className={style.token_price}>
            <img src={EthereumLogo.src} alt="" />
            <p>ETH {ethUSDPrice}</p>
          </div>
          <div className={style.token_price}>
            <img src={PyroLogo.src} className="w-6" alt="" />
            <p>PYRO {pyroUSDPrice}</p>
          </div>
        </div>
        <div className={style.navbar__right}>
          <button
            onClick={openModal}
            className={
              account ? style.connect_btn_connected : style.connect_btn
            }
          >
            {account ? shortenIfAddress(account) : "Connect Wallet"}
          </button>
        </div>
        <Popover className={style.mobile__right}>
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  open ? "" : "text-opacity-90"
                } text-white group px-3 py-2 rounded-md inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <Bars3Icon
                  className={`${open ? "" : "text-opacity-100"}
                  h-8 w-8 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-screen px-4 mt-3 left-0 right-0 ">
                <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-4 bg-black p-4">
                    <div className="flex nexa-reg-18 text-white flex-col gap-4">
                      <Link href="/portfolio">Portfolio</Link>
                      <Link href="/dev-wallet">Dev Wallet</Link>
                      <button
                        onClick={openModal}
                        className={
                          account
                            ? style.connect_btn_connected
                            : style.connect_btn
                        }
                      >
                        {account ? shortenIfAddress(account) : "Connect Wallet"}
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </>
  );
}
