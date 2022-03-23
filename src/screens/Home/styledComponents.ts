import React from "react";
import styled from "styled-components";

type CellProperties = Pick<React.CSSProperties, 'textAlign' | 'color'>;

export const Heading = styled.div`
  font-family: Roboto;
  font-size: 2.5rem;
  line-height: 3rem;
  color: #000000;
  text-align: center;
  padding: 12px;
`;

export const CoinTable= styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
`;

export const TableHeader = styled.th<CellProperties>`
  font-family: Roboto;
  font-size: 24px;
  text-align: ${props => props.textAlign || 'start'};
  border-top: 1px solid #dee2e6;
  padding: 10px
`;

export const TableCell = styled.td<CellProperties>`
  font-family: Roboto;
  font-size: 20px;
  text-align: ${props => props.textAlign || 'start'};
  border-top: 1px solid #dee2e6;
  padding: 10px;
  color: ${props => props.color || '#000000'}
`;

export const TableRow = styled.tr`
  &:hover{
    cursor:pointer;
    background-color: #f0f0f0
  }
`;