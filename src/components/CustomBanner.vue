<template>
  <div class="overflow-hidden whitespace-nowrap bg-gray-900 text-white p-3 border-b-2 border-gray-700 rounded-b-lg">
    <div 
      class="flex gap-10 animate-ticker" 
      :style="{ animationDuration: `20s` }"
    >
      <div v-for="(item, index) in items" :key="item.ticker" class="flex items-center gap-3 font-bold">
        <span class="text-sm">{{ item.ticker }}</span>
        <span 
          class="text-sm font-sm"
          :class="{
            'text-red-500': item.target_to > item.target_from, 
            'text-green-500': item.target_to < item.target_from
          }"
        > 
          {{ item.target_from.toLocaleString("en-US", { style: "currency", currency: "USD" }) }}
        </span>
        -
        <span 
          class="text-sm font-medium"
          :class="{
            'text-green-500': item.target_to > item.target_from, 
            'text-red-500': item.target_to < item.target_from
          }"
        >
          {{ item.target_to.toLocaleString("en-US", { style: "currency", currency: "USD" }) }}
        </span>
        <span v-if="index !== items.length - 1" class="text-gray-400 text-xl pl-3">|</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useItemsStore } from "../store/items";

const store = useItemsStore();
const items = computed(() => store.items);
</script>

<style scoped>
@keyframes ticker-scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.animate-ticker {
  display: flex;
  animation: ticker-scroll linear infinite;
}
</style>
