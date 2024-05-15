<template>
  <div>
    <h1>Stock Quote</h1>
    <input v-model="stockSymbol" placeholder="输入股票代码" />
    <select v-model="market">
      <option value="US">美国</option>
      <option value="HK">香港</option>
    </select>
    <button @click="fetchQuote">查查你的</button>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="quote" class="quote">
      <h2>{{ quote.symbol }}</h2>
      <ul>
        <li>Last Done: {{ quote.lastDone }}</li>
        <li>Previous Close: {{ quote.prevClose }}</li>
        <li>Open: {{ quote.open }}</li>
        <li>High: {{ quote.high }}</li>
        <li>Low: {{ quote.low }}</li>
        <li>Timestamp: {{ quote.timestamp }}</li>
        <li>Volume: {{ quote.volume }}</li>
        <li>Turnover: {{ quote.turnover }}</li>
        <li>Trade Status: {{ quote.tradeStatus }}</li>
        <li v-if="quote.preMarketQuote">
          Pre-Market Quote:
          <ul>
            <li>Last Done: {{ quote.preMarketQuote.lastDone }}</li>
            <li>Timestamp: {{ quote.preMarketQuote.timestamp }}</li>
            <li>Volume: {{ quote.preMarketQuote.volume }}</li>
            <li>Turnover: {{ quote.preMarketQuote.turnover }}</li>
            <li>High: {{ quote.preMarketQuote.high }}</li>
            <li>Low: {{ quote.preMarketQuote.low }}</li>
            <li>Previous Close: {{ quote.preMarketQuote.prevClose }}</li>
          </ul>
        </li>
        <li v-if="quote.postMarketQuote">
          Post-Market Quote:
          <ul>
            <li>Last Done: {{ quote.postMarketQuote.lastDone }}</li>
            <li>Timestamp: {{ quote.postMarketQuote.timestamp }}</li>
            <li>Volume: {{ quote.postMarketQuote.volume }}</li>
            <li>Turnover: {{ quote.postMarketQuote.turnover }}</li>
            <li>High: {{ quote.postMarketQuote.high }}</li>
            <li>Low: {{ quote.postMarketQuote.low }}</li>
            <li>Previous Close: {{ quote.postMarketQuote.prevClose }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stockSymbol = ref("");
const market = ref("US");
const quote = ref(null);
const error = ref(null);

const fetchQuote = async () => {
  error.value = null;
  quote.value = null;
  const fullSymbol = `${stockSymbol.value}.${market.value}`;
  try {
    const response = await fetch(`/api/quote?symbol=${fullSymbol}`);
    const data = await response.json();
    if (response.ok) {
      quote.value = data[0];
    } else {
      error.value = data.error;
    }
  } catch (err) {
    error.value = "Failed to fetch quote";
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.quote {
  margin-top: 20px;
}
</style>
