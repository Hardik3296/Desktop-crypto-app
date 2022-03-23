import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchCoinList } from "../../network";
import { CoinListProps } from "../../props";
import { Cell, Column, HeaderGroup, useTable } from "react-table";
import { AxiosError } from "axios";
import { getTableData, RefinedDataProps } from "../../utils/helper";
import {
  TableCell,
  TableHeader,
  TableRow,
  Heading,
  CoinTable,
} from "./styledComponents";

const tableColumn: Column<RefinedDataProps>[] = [
  {
    Header: "Coin",
    accessor: "name",
  },
  {
    Header: "Symbol",
    accessor: "code",
  },
  {
    Header: "Price",
    accessor: "currentPrice",
  },
  {
    Header: "24h change %",
    accessor: "price_change_percentage_24h",
  },
  {
    Header: "Market Cap.",
    accessor: "mktCap",
  },
];

// Function to return appropriate cell for table body
const getTableCell = (
  cell: Cell<RefinedDataProps, any>
): React.ReactElement => {
  if (cell.column.Header === "Coin")
    return (
      <TableCell {...cell.getCellProps()} key={cell.value}>
        {cell.column.Header === "Coin" && (
          <img
            src={cell.row.original.image}
            style={{ height: 18, width: 18, marginRight: 10 }}
          />
        )}
        {cell.value}
      </TableCell>
    );
  else if (
    cell.column.Header == "Price" ||
    cell.column.Header === "Market Cap."
  )
    return (
      <TableCell {...cell.getCellProps()} key={cell.value} textAlign="right">
        <span style={{ fontWeight: "bold" }}>&#x20b9;</span>{" "}
        {cell.value > 0
          ? cell.value
          : cell.value.toLocaleString(undefined, { minimumFractionDigits: 8 })}
      </TableCell>
    );
  else if (cell.column.Header === "24h change %")
    return (
      <TableCell
        {...cell.getCellProps()}
        key={cell.value}
        textAlign="right"
        color={Number.parseFloat(cell.value) < 0 ? "#e15241" : "#4eaf0a"}
      >
        {Number.parseFloat(cell.value).toFixed(2)}
        <span style={{ fontWeight: 800 }}> %</span>
      </TableCell>
    );
  else if (cell.column.Header === "Symbol")
    return (
      <TableCell {...cell.getCellProps()} key={cell.value}>
        {cell.value.toUpperCase()}
      </TableCell>
    );
  else
    return (
      <TableCell {...cell.getCellProps()} key={cell.value}>
        {cell.value}
      </TableCell>
    );
};

// Function to return appropriate header cell for the body
const getTableHeaderCell = (
  column: HeaderGroup<RefinedDataProps>
): React.ReactElement => {
  return (
    <TableHeader
      {...column.getHeaderProps()}
      key={column.id}
      textAlign={
        ["Coin", "Symbol"].includes(column.Header as string) ? "start" : "end"
      }
    >
      {column.Header}
    </TableHeader>
  );
};

const Home = (): React.ReactElement => {
  const { data, isLoading } = useQuery<CoinListProps[], AxiosError>(
    "coinList",
    fetchCoinList,
    {
      refetchInterval: 5000,
    }
  );

  const tableData = useMemo(() => (data ? getTableData(data) : []), [data]);
  const tableInstance = useTable({ columns: tableColumn, data: tableData });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Roboto",
          fontSize: 30,
          fontStyle: "italic",
        }}
      >
        Loading...
      </div>
    );
  }

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    tableInstance;
  console.log(rows[0].cells[0]);
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <Heading>Cryptocurrency Prices by Market Cap</Heading>
      <CoinTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => getTableHeaderCell(column))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => getTableCell(cell))}
              </TableRow>
            );
          })}
        </tbody>
      </CoinTable>
    </div>
  );
};

export default Home;
