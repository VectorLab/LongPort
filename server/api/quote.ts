import { Config, QuoteContext } from "longport";

export default defineEventHandler(async (e) => {
  const { symbol } = getQuery(e);
  if (!symbol) {
    return { error: "什么都不输入查你🐎呢" };
  }

  let config = Config.fromEnv();
  try {
    const ctx = await QuoteContext.new(config);
    const response = await ctx.quote([symbol]);
    const res = response.map((securityQuote) => ({
      symbol: securityQuote.symbol.toString(),
      lastDone: securityQuote.lastDone.toString(),
      prevClose: securityQuote.prevClose.toString(),
      open: securityQuote.open.toString(),
      high: securityQuote.high.toString(),
      low: securityQuote.low.toString(),
      timestamp: securityQuote.timestamp.toISOString(),
      volume: securityQuote.volume.toString(),
      turnover: securityQuote.turnover.toString(),
      tradeStatus: securityQuote.tradeStatus.toString(),
      preMarketQuote: securityQuote.preMarketQuote
        ? {
            lastDone: securityQuote.preMarketQuote.lastDone.toString(),
            timestamp: securityQuote.preMarketQuote.timestamp.toISOString(),
            volume: securityQuote.preMarketQuote.volume.toString(),
            turnover: securityQuote.preMarketQuote.turnover.toString(),
            high: securityQuote.preMarketQuote.high.toString(),
            low: securityQuote.preMarketQuote.low.toString(),
            prevClose: securityQuote.preMarketQuote.prevClose.toString(),
          }
        : null,
      postMarketQuote: securityQuote.postMarketQuote
        ? {
            lastDone: securityQuote.postMarketQuote.lastDone.toString(),
            timestamp: securityQuote.postMarketQuote.timestamp.toISOString(),
            volume: securityQuote.postMarketQuote.volume.toString(),
            turnover: securityQuote.postMarketQuote.turnover.toString(),
            high: securityQuote.postMarketQuote.high.toString(),
            low: securityQuote.postMarketQuote.low.toString(),
            prevClose: securityQuote.postMarketQuote.prevClose.toString(),
          }
        : null,
    }));
    return res;
  } catch (error) {
    return { error: error.message };
  }
});
