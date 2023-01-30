import React, { useState, useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import style from "./portfolio-table.module.css";
import DescendingIcon from "@/assets/images/descending.svg";
import AscendingIcon from "@/assets/images/ascending.svg";
import UnsortedIcon from "@/assets/images/unsorted.svg";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import NFTPlaceholder from "@/assets/images/nft-placeholder.png";
import {
  createTheme,
  ImageListItem,
  ImageListItemBar,
  imageListItemClasses,
  ThemeProvider,
  Box,
} from "@mui/material";
import { EvmChain } from "moralis/common-evm-utils";
import { usdFormatter } from "@/utils/utils";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      bigMobile: 350,
      tablet: 650,
      desktop: 900,
    },
  },
});

function PortfolioTable({ data, walletAddress, isNFTView }) {
  const [address, setAddress] = useState("");
  const [nftData, setNftData] = useState([]);

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: (row) => row[0].token.name,
      },
      {
        Header: "Price",
        accessor: (row) =>
          row[1] ? usdFormatter.format(row[1]?.priceUsd) : "-",
      },
      {
        Header: "Holdings",
        accessor: (row) => Number(row[0].value).toFixed(2),
      },
      {
        Header: "MarketCap",
        accessor: (row) => (row[1] ? usdFormatter.format(row[1]?.fdv) : "-"),
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
            ? usdFormatter.format(
                Number(row[1]?.priceUsd) * Number(row[0].value)
              )
            : "-",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const { fetch } = useEvmWalletNFTs();

  useEffect(() => {
    const fetchNFTs = async () => {
      let cursor = null;
      let results = [];
      do {
        const response = await fetch({ address, chain: "0x1" });
        results = [...results, ...response.data];
      } while (cursor != "" && cursor != null);
      setNftData(results);
    };
    if (address && address.length > 0) {
      fetchNFTs();
    }
  }, [address]);

  return isNFTView ? (
    nftData.length > 0 ? (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              mobile: "repeat(1, 1fr)",
              bigMobile: "repeat(2, 1fr)",
              tablet: "repeat(3, 1fr)",
              desktop: "repeat(4, 1fr)",
            },
            gap: "4px",
            // standard variant from here:
            // https://github.com/mui-org/material-ui/blob/3e679ac9e368aeb170d564d206d59913ceca7062/packages/mui-material/src/ImageListItem/ImageListItem.js#L42-L43
            [`& .${imageListItemClasses.root}`]: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {nftData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${
                  item.metadata?.image
                    ? item.metadata?.image
                    : NFTPlaceholder.src
                }`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar title={`${item.name} #${item.tokenId}`} />
            </ImageListItem>
          ))}
        </Box>
      </ThemeProvider>
    ) : (
      <div className="flex justify-center">
        <h2 className="nexa-reg-25 text-white">No NFTs in Wallet</h2>
      </div>
    )
  ) : (
    <div className={style.container}>
      <div className={style.content}>
        {data.length > 0 ? (
          <table {...getTableProps()} className={style.portfolio_table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <td
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className="flex items-center gap-1">
                        {column.render("Header")}{" "}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <img className="w-2" src={DescendingIcon.src} />
                            ) : (
                              <img className="w-2" src={AscendingIcon.src} />
                            )
                          ) : (
                            <img className="w-2" src={UnsortedIcon.src} />
                          )}
                        </span>
                      </div>
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
                            <img
                              src={data?.[superIndex][0].token.logo}
                              alt=""
                            />
                            {cell.render("Cell")}{" "}
                            <div className={style.token_symbol}>
                              {data?.[superIndex][0].token.symbol}
                            </div>
                          </td>
                        );
                      } else if (index >= 4 && index <= 6) {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={
                              !isNaN(cell.value)
                                ? cell.value < 0
                                  ? "text-red-600"
                                  : cell.value > 0 && "text-green-600"
                                : undefined
                            }
                          >
                            {cell.render("Cell")}
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
        ) : (
          <div className="flex justify-center items-center h-10 py-10">
            <h2 className="nexa-reg-25">Portfolio is empty</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default PortfolioTable;
