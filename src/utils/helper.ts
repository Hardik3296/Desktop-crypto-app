import { CoinListProps } from "../props";

export interface RefinedDataProps{
  code: string,
  currentPrice: number,
  name: string,
  price_change_percentage_24h: number,
  image: string,
  id: string,
  mktCap: number
}

// Function to segregate the required information from the api resposne
export const getTableData = (data:CoinListProps[] | undefined): RefinedDataProps[]|[]=>{
  if(data){
  const refinedData = data.map((singleCoinData:CoinListProps)=>{
      const newObject: RefinedDataProps = {
        code: "",
        currentPrice: 0,
        name: "",
        price_change_percentage_24h: 0,
        image:"",
        id:"",
        mktCap:0
      };
      newObject.code = singleCoinData.symbol;
      newObject.currentPrice= singleCoinData.current_price;
      newObject.name = singleCoinData.name;
      newObject['price_change_percentage_24h'] = singleCoinData.price_change_percentage_24h;
      newObject.image = singleCoinData.image;
      newObject.id = singleCoinData.id;
      newObject.mktCap = singleCoinData.market_cap
      return newObject;
  });
  return refinedData;
}
else{
  return []
}
}