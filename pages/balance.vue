<template>
  <div>
    <h1>Account Balance</h1>
    <div v-if="balance">
      <p>Total Cash: {{ balance.totalCash }}</p>
      <p>Currency: {{ balance.currency }}</p>
    </div>
    <div v-else>
      <p>查不到，完蛋咯</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const balance = ref(null);

try {
  const response = await fetch("/api/balance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if (!response.ok) throw new Error("Failed to fetch balance");
  const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    balance.value = data[0];
  } else {
    balance.value = null;
  }
} catch {
  // Handle error silently
  balance.value = null;
}
</script>
