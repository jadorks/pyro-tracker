import * as React from "react";

const PortfolioIcon = ({ pathFill = "#565555" }) => (
  <svg width={32} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30.352 10.793H25.96a3.734 3.734 0 0 0-3.73 3.73 3.734 3.734 0 0 0 3.73 3.73h4.39a.85.85 0 0 0 .85-.85v-5.761a.85.85 0 0 0-.85-.849Zm-4.58 4.873c-.63 0-1.144-.513-1.144-1.143a1.145 1.145 0 0 1 2.288 0c0 .63-.513 1.143-1.144 1.143Z"
      fill={pathFill}
    />
    <path
      d="M25.96 8.072h3.315V4.835A4.03 4.03 0 0 0 25.249.81H4.923A4.025 4.025 0 0 0 .897 4.824v15.394a4.025 4.025 0 0 0 4.026 4.016H25.27a4.014 4.014 0 0 0 4.005-4.016v-3.245H25.96a4.456 4.456 0 0 1-4.45-4.451 4.455 4.455 0 0 1 4.45-4.45Zm-12.84 12.1a.375.375 0 0 1-.375.374H5.19a.375.375 0 0 1-.376-.375v-2.14c0-.208.169-.375.376-.375h7.555c.208 0 .375.167.375.375v2.14Z"
      fill={pathFill}
    />
  </svg>
);

export default PortfolioIcon;
