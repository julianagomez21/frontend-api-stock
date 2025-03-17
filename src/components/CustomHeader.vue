<template>
    <CustomPanel :open="isPanelOpen" @update:open="isPanelOpen = $event" />
  
    <header class="top-0 left-0 w-full bg-white/20 backdrop-blur-md shadow-lg p-4 flex justify-between items-center z-50">
      <div class="flex items-center gap-3">
        <img src="/src/assets/StockLens.ico" alt="Logo" class="h-20" />
      </div>
  
      <!-- 🔘 Botón para abrir el panel -->
      <button @click="isPanelOpen = true"
        class="bg-gray-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition cursor-pointer"
      >
      💡
      </button>
    </header>
  
    <CustomBanner />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import CustomBanner from './CustomBanner.vue';
  import CustomPanel from './CustomPanel.vue';
  
  const isPanelOpen = ref(false);
  </script>
  