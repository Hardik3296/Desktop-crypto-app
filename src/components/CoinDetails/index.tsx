import React from 'react'
import styled from 'styled-components';
import { CoinListProps } from '../../props';

const CoinName = styled.p`
  font-family: Roboto;
  font-weight: 600;
  font-size: 20px
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CoinSymbol = styled.p`
  font-family: Roboto;
  font-weight: 300;
  font-size: 20px
`;

const CoinDetails = ({coin, index}:{coin:CoinListProps, index: number}) => {
  return (
    <tr>
      <td>
      <RowDiv>
      <img src={coin.image} alt={coin.name} style={{height: 18, width:18, marginRight: 12}}/>
      <CoinName>{coin.name}</CoinName>
      </RowDiv>
      </td>
      <td>
      <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
      </td>
      <td>
      <div style={{textAlign:"left"}}> &#x20b9;{coin.current_price}</div>
      </td>
      <td>
      <div>{coin.price_change_percentage_24h}</div>
      </td>
    </tr>
  )
}

export default CoinDetails