import { Config, TradeContext } from "longport"

export default defineEventHandler(async (e) => {
  let config = Config.fromEnv()
  try {
    const ctx = await TradeContext.new(config)
    const response = await ctx.accountBalance()
    const res = response.map(balance => ({
      totalCash: balance.totalCash.toString(),
      currency: balance.currency.toString()
    }))
    return JSON.stringify(res)
  } catch (error) {
    return JSON.stringify({ error: error.message })
  }
})