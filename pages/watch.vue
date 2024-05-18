<template>
  <div>
    <h1>Watchlist</h1>
    <div v-if="watchlist.length">
      <div v-for="group in watchlist" :key="group.id">
        <h2>{{ group.name }}</h2>
        <ul>
          <li v-for="security in group.securities" :key="security.symbol">
            <p>Symbol: {{ security.symbol }}</p>
            <p>Market: {{ security.market }}</p>
            <p>Name: {{ security.name }}</p>
            <p v-if="security.watched_price !== null">Watched Price: {{ security.watched_price }}</p>
            <p>Watched At: {{ security.watched_at }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>查不到，完蛋咯</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const watchlist = ref([]);

async function fetchWatchlist() {
  try {
    const response = await fetch("/api/watch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch watchlist");
    const data = await response.json();
    watchlist.value = data;
  } catch {
    // Handle error silently
    watchlist.value = [];
  }
}

fetchWatchlist();
</script>