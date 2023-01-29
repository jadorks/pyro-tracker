import React from "react";
import style from "./portfolio-form.module.css";
import PyroFullLogo from "@/assets/images/pyro-logo.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { EyeIcon } from "@heroicons/react/20/solid";

function PortfolioForm() {
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
            The most successulf portfolio management tool on the Ethereum Chain
          </p>
          <div className={style.form__input}>
            <div className="w-full">
              <input type="text" placeholder="Enter a wallet address" />
              <button>Me</button>
            </div>
            <button className={style.form__submit}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioForm;
