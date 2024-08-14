import { Config, QuoteContext } from "longport"

export default defineEventHandler(async (e) => {
  const config = Config.fromEnv()
  const ctx = await QuoteContext.new(config)
  const resp = await ctx.watchlist()

  const result = resp.map(group => ({
    id: group.id,
    name: group.name,
    securities: group.securities.map(security => ({
      symbol: security.symbol,
      market: security.market,
      name: security.name,
      watchedPrice: security.watchedPrice?.toNumber() ?? null,
      watchedAt: security.watchedAt.toISOString()
    }))
  }))

  return result
})