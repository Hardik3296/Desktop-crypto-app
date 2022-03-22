import axios from "axios"
import { CoinListProps } from "../props";

export const fetchCoinList = async():Promise<CoinListProps[]>=>{
  const url = `${process.env.REACT_APP_BASE_API_URL}/coins/markets?vs_currency=inr`
  const response = await axios.get(url);
  return response.data;
}