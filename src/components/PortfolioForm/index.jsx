import React, { useState, useEffect } from "react";
import style from "./portfolio-form.module.css";
import PyroFullLogo from "@/assets/images/pyro-logo.svg";
import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";

function PortfolioForm({ onSubmit, setAddress, address }) {
  const [isValidAddress, setIsValidAddress] = useState(false);

  const { account } = useEthers();

  function handleInputChange(e) {
    const value = e.target.value;
    setAddress(value);
    const meetsLimit = value.length === 42;
    const isAddress = ethers.utils.isAddress(value);

    if (meetsLimit && isAddress) {
      setIsValidAddress(true);
    }

    if (!isAddress) {
      setIsValidAddress(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.form__header}>
          <img src={PyroFullLogo.src} alt="" />
        </div>
        <div className={style.form__body}>
          <p>Track your Portfolio</p>
          <h2>ETH Portfolio Tracker</h2>
          <p>
            The most successful portfolio management tool on the Ethereum Chain
          </p>
          <div className={style.form__input}>
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter a wallet address"
                value={address}
                onChange={(e) => handleInputChange(e)}
              />
              <button
                onClick={() => {
                  setAddress(account);
                  setIsValidAddress(true);
                }}
                disabled={account == undefined}
              >
                Me
              </button>
            </div>
            <button
              onClick={() => {
                onSubmit(address);
              }}
              disabled={!isValidAddress}
              className={style.form__submit}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioForm;
