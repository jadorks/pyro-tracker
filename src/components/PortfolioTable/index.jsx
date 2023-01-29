import React from "react";
import { useSortBy, useTable } from "react-table";
import style from "./portfolio-table.module.css";
import DescendingIcon from "@/assets/images/descending.svg";
import AscendingIcon from "@/assets/images/ascending.svg";
import UnsortedIcon from "@/assets/images/unsorted.svg";

function PortfolioTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row[0].token.name,
      },
      {
        Header: "Price",
        accessor: (row) => (row[1] ? `$${row[1]?.priceUsd}` : "-"),
      },
      {
        Header: "Holdings",
        accessor: (row) => Number(row[0].value).toFixed(2),
      },
      {
        Header: "MarketCap",
        accessor: (row) => (row[1] ? `$${row[1]?.fdv}` : "-"),
      },
      {
        Header: "1h",
        accessor: (row) => (row[1] ? row[1]?.priceChange.h1 : "-"),
      },
      {
        Header: "6h",
        accessor: (row) => (row[1] ? row[1]?.priceChange.h6 : "-"),
      },
      {
        Header: "24h",
        accessor: (row) => (row[1] ? row[1]?.priceChange.h24 : "-"),
      },
      {
        Header: "Value",
        accessor: (row) =>
          row[1]
            ? `$${(Number(row[1]?.priceUsd) * Number(row[0].value)).toFixed(2)}`
            : "-",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <table {...getTableProps()} className={style.portfolio_table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <td {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}{" "}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img className="w-2" src={DescendingIcon.src}/>
                        ) : (
                          <img className="w-2" src={AscendingIcon.src}/>
                        )
                      ) : (
                        <img className="w-2" src={UnsortedIcon.src}/>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, superIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    if (index == 0) {
                      return (
                        <td {...cell.getCellProps()}>
                          <img src={data?.[superIndex][0].token.logo} alt="" />
                          {cell.render("Cell")}{" "}
                          <div className={style.token_symbol}>
                            {data?.[superIndex][0].token.symbol}
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioTable;
