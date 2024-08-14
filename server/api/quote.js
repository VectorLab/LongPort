import { Config, QuoteContext } from "longport"

export default defineEventHandler(async (e) => {
  const { symbol } = getQuery(e)
  if (!symbol) {
    return { error: "什么都不输入查你🐎呢" }
  }

  let config = Config.fromEnv()
  try {
    const ctx = await QuoteContext.new(config)
    const response = await ctx.quote([symbol])
    const res = response.map(quote => ({
      symbol: quote.symbol.toString(),
      lastDone: quote.lastDone.toString(),
      prevClose: quote.prevClose.toString(),
      open: quote.open.toString(),
      high: quote.high.toString(),
      low: quote.low.toString(),
      timestamp: quote.timestamp.toISOString(),
      volume: quote.volume.toString(),
      turnover: quote.turnover.toString(),
      tradeStatus: quote.tradeStatus.toString(),
      preMarketQuote: quote.preMarketQuote
        ? {
            lastDone: quote.preMarketQuote.lastDone.toString(),
            timestamp: quote.preMarketQuote.timestamp.toISOString(),
            volume: quote.preMarketQuote.volume.toString(),
            turnover: quote.preMarketQuote.turnover.toString(),
            high: quote.preMarketQuote.high.toString(),
            low: quote.preMarketQuote.low.toString(),
            prevClose: quote.preMarketQuote.prevClose.toString(),
          }
        : null,
      postMarketQuote: quote.postMarketQuote
        ? {
            lastDone: quote.postMarketQuote.lastDone.toString(),
            timestamp: quote.postMarketQuote.timestamp.toISOString(),
            volume: quote.postMarketQuote.volume.toString(),
            turnover: quote.postMarketQuote.turnover.toString(),
            high: quote.postMarketQuote.high.toString(),
            low: quote.postMarketQuote.low.toString(),
            prevClose: quote.postMarketQuote.prevClose.toString(),
          }
        : null,
    }))
    return res
  } catch (error) {
    return { error: error.message }
  }
})