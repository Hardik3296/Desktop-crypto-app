import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinList } from '../../network';
import { CoinListProps } from '../../props';
import {Column, useTable} from 'react-table';
import { AxiosError } from 'axios';
import { getTableData, RefinedDataProps } from '../../utils/helper';

const tableColumn: Column<RefinedDataProps>[] = [
{
  Header: 'Coin',
  accessor:'name',
},
{
  Header: 'Symbol',
  accessor:'code',
},
{
  Header: 'Price',
  accessor:'currentPrice',
},
{
  Header: '24h change %',
  accessor:'price_change_percentage_24h',
},
{
  Header: 'Market Cap.',
  accessor:'mktCap',
}]

const Heading = styled.div`
  font-family: Roboto;
  font-size: 2.5rem;
  line-height: 3rem;
  color: #000000;
  text-align: center;
  padding: 12px;
`;

const CoinTable= styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
`;

const TableHeader = styled.th`
  font-family: Roboto;
  font-size: 24px;
  text-align: start;
  border-top: 1px solid #dee2e6;
  padding: 10px
`;

const TableCell = styled.td`
  font-family: Roboto;
  font-size: 20px;
  text-align: start;
  border-top: 1px solid #dee2e6;
  padding: 10px;
  align-items: center;
`;

const TableRow = styled.tr`
  &:hover{
    cursor:pointer;
    background-color: #f0f0f0
  }
`;

const Home = (): React.ReactElement => {

  const {data, isLoading} = useQuery<CoinListProps[],AxiosError>('coinList', fetchCoinList); 

  const tableData = useMemo(()=>data?getTableData(data):[],[data]);
  const tableInstance = useTable({columns:tableColumn, data: tableData})
  
  if(isLoading){
    return <div style={{display: 'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:"Roboto", fontSize: 30, fontStyle:'italic'}}>Loading...</div>
  }
  
  const {getTableProps, getTableBodyProps, prepareRow, headerGroups, rows} = tableInstance;
  console.log(rows[0].cells[0])
  return (
    <div style={{paddingLeft: 20,paddingRight: 20}}>
    <Heading>Cryptocurrency Prices by Market Cap</Heading>
    <CoinTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup)=>(
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column)=>{
              return <TableHeader {...column.getHeaderProps()} key={column.id}>{column.Header}</TableHeader>
            })}
          </tr>
          ))}
      </thead>
      <tbody {...getTableBodyProps}>
        {rows.map((row)=>{
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell=>{
                if(cell.column.Header === 'Coin')
                return <TableCell {...cell.getCellProps()} key={cell.value}>{cell.column.Header === 'Coin' &&<img src={cell.row.original.image} style={{height: 18, width: 18, marginRight:10}}/>}{cell.value}</TableCell>
                else if( cell.column.Header == 'Price' || cell.column.Header === 'Market Cap.')
                return <TableCell {...cell.getCellProps()} key={cell.value}><span style={{fontWeight:'bold'}}>&#x20b9;</span> {cell.value}</TableCell>
                else
                return <TableCell {...cell.getCellProps()} key={cell.value}>{cell.value}</TableCell> 
              })}
            </TableRow>
          )
        })}
    </tbody>
    </CoinTable>
    </div>
  )
}

export default Home;