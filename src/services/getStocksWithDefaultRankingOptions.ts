import "../config/mongo";
import calculateScoresAndSort from "./calculateScoresAndSort";
import getLastImport from "./getLastImport";

export default async function getStocksWithDefaultRankingOptions(
  filterSameEnterpriseStocks = false
) {
  const lastImport = await getLastImport();
  if (!lastImport) {
    return null;
  }

  const stocksInOrder = calculateScoresAndSort(
    lastImport.stocks,
    [
      {
        indicator: "enterprise_value_por_ebit",
        weight: 1,
      },
    ],
    {
      filterSameEnterpriseStocks,
    }
  );

  return stocksInOrder;
}
