import style from "./wallet-info.module.css";
import CopySymbol from "@/assets/images/copy-symbol.svg";
import EtherscanLogo from "@/assets/images/etherscan-logo-circle.svg";
import DeleteIcon from "@/assets/images/trash.svg";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Dialog, Transition } from "@headlessui/react";

function WalletInfo({ walletAddress }) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const deleteWallet = () => {
    const address = localStorage.getItem("savedWalletAddress");
    if (address) {
      localStorage.removeItem("savedWalletAddress");
    }
    router.reload();
  };

  const ConfirmDeleteModal = () => {
    return (
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md trasnform overflow-hidden rounded-2xl bg-[#202020] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="nexa-reg-25 leading-6 text-white"
                  >
                    Remove Wallet
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="montserrat-med-15 text-white">
                      Are you sure you want to remove the current wallet?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => deleteWallet()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  useEffect(() => {
    if (walletAddress) {
      setAddress(walletAddress);
    } else {
      const address = localStorage.getItem("savedWalletAddress");
      const initial = JSON.parse(address);
      if (initial && initial.length > 0) {
        setAddress(initial);
      }
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.info__header}>
          <h2>Wallet</h2>
        </div>
        <div className={style.info__body}>
          <div className={style.wallet_address}>
            <p>{address}</p>
          </div>
          <div>
            <a
              href={`https://etherscan.io/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img className="max-w-[25px]" src={EtherscanLogo.src} alt="" />
            </a>
          </div>
        </div>
        <div className={style.info__footer}>
          <div
            className={style.footer_actions}
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <img src={DeleteIcon.src} className="w-[18px]" alt="" />
            <p>Remove Wallet</p>
          </div>
          <CopyToClipboard
            text={address}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <div className={style.footer_actions}>
              <img src={CopySymbol.src} className="w-[12px]" alt="" />
              <p>{copied ? "Wallet Address Copied" : "Copy Wallet Address"}</p>
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <ConfirmDeleteModal />
    </div>
  );
}

export default WalletInfo;
