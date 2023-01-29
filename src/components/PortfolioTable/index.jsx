import style from "./portfolio-table.module.css";

function PortfolioTable() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <table className={style.portfolio_table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Holdings</td>
              <td>Market Cap</td>
              <td>1h</td>
              <td>6h</td>
              <td>24h</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Ethereum
                <div>ETH</div>
              </td>
              <td>1630.02</td>
              <td>0.01</td>
              <td>$9,999,999</td>
              <td>-0.5</td>
              <td>-1</td>
              <td>-4.5</td>
              <td>11.66 <div>0.01ETH</div></td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>1630.02</td>
              <td>0.01</td>
              <td>$9,999,999</td>
              <td>-0.5</td>
              <td>-1</td>
              <td>-4.5</td>
              <td>11.66</td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>1630.02</td>
              <td>0.01</td>
              <td>$9,999,999</td>
              <td>-0.5</td>
              <td>-1</td>
              <td>-4.5</td>
              <td>11.66</td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>1630.02</td>
              <td>0.01</td>
              <td>$9,999,999</td>
              <td>-0.5</td>
              <td>-1</td>
              <td>-4.5</td>
              <td>11.66</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioTable;
