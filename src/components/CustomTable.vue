<template>
  <div class="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
    <!-- Contenedor de la Tabla -->
    <div class="max-w-5xl w-full bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-center my-4">
        <button
          @click="store.fetchRecommendation()"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Generate recommendation
        </button>
      </div>
      <!-- Input de Búsqueda -->
      <div class="relative flex items-center">
        <input
          v-model="store.search"
          placeholder="Search by ticker, company or brokerage"
          class="border p-2 w-full rounded-md pr-10 bg-white text-gray-700 placeholder-gray-500"
        />
        <button
          @click="store.fetchItems()"
          class="absolute right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          🔍
        </button>
        <button
          v-if="store.search"
          @click="clearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto mt-4 rounded-lg shadow-sm">
        <table
          class="w-full border-collapse border border-gray-300 bg-white text-gray-900 rounded-lg overflow-hidden"
        >
          <thead class="bg-gray-300 text-gray-900 rounded-t-lg">
            <tr>
              <th class="border border-gray-300 p-3 text-left">Ticker</th>
              <th class="border border-gray-300 p-3 text-left">Brokerage</th>
              <th class="border border-gray-300 p-3 text-right">Target from</th>
              <th class="border border-gray-300 p-3 text-right">Target to</th>
              <th class="border border-gray-300 p-3 text-center">Change (%)</th>
              <th class="border border-gray-300 p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody v-if="store.loading" class="divide-y divide-gray-300">
            <tr>
              <td colspan="6" class="py-10 text-center">
                <div class="flex justify-center">
                  <div
                    class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="divide-y divide-gray-300">
            <tr
              v-for="(item, index) in store.items"
              :key="index"
              class="hover:bg-gray-200"
            >
              <!-- Ticker con Tooltip del Nombre Completo -->
              <td class="border border-gray-300 p-3 relative">
                <span class="cursor-pointer group underline">
                  {{ item.ticker }}
                  <div
                    class="absolute left-0 bottom-7 bg-gray-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {{ item.company }}
                  </div>
                </span>
              </td>

              <!-- Broker -->
              <td class="border border-gray-300 p-3">{{ item.brokerage }}</td>

              <!-- Precios -->
              <td class="border border-gray-300 p-3 text-right">
                {{
                  item.target_from.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </td>
              <td class="border border-gray-300 p-3 text-right">
                {{
                  item.target_to.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}
              </td>

              <!-- Cambio (%) -->
              <td
                class="border border-gray-300 p-3 text-center font-semibold"
                :class="{
                  'text-green-600': item.change > 0,
                  'text-red-600': item.change < 0,
                }"
              >
                {{ item.change.toFixed(2) }}%
                <span v-if="item.change > 0">📈</span>
                <span v-else-if="item.change < 0">📉</span>
              </td>

              <!-- Acción con Tooltip de Calificaciones -->
              <td class="border border-gray-300 p-3 text-center relative group">
                <span
                  :class="{
                    'bg-yellow-200 text-gray-700 px-3 py-1 rounded-md cursor-pointer':
                      item.action === 'reiterated by',
                    'bg-red-100 text-red-700 px-3 py-1 rounded-md cursor-pointer':
                      item.action === 'target lowered by' ||
                      item.action === 'downgraded by',
                    'bg-green-100 text-green-700 px-3 py-1 rounded-md cursor-pointer':
                      item.action === 'upgraded by' ||
                      item.action === 'target raised by' ||
                      item.action === 'initiated by' ||
                      item.action === 'target set by',
                  }"
                >
                  {{ item.action }}
                </span>

                <!-- Tooltip -->
                <div
                  class="absolute left-1/2 -translate-x-1/2 bottom-8 w-40 bg-gray-800 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg"
                >
                  {{ item.rating_from }} → {{ item.rating_to }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Controles de Paginación y Selector de Registros -->
      <div
        class="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <!-- Botones de Paginación -->
        <div class="flex space-x-4">
          <button
            @click="store.prevPage"
            :disabled="store.offset === 0"
            class="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Anterior
          </button>

          <!-- Selector de Límites -->
          <select
            v-model="store.limit"
            @change="store.setLimit(Number(store.limit))"
            class="border border-gray-200 p-2 rounded-md bg-white text-gray-500"
          >
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
            <option value="100">100 / page</option>
          </select>

          <button
            @click="store.nextPage"
            class="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useItemsStore } from "../store/items";

const store = useItemsStore();

const clearSearch = () => {
  store.search = "";
  store.fetchItems();
};

onMounted(() => {
  store.fetchItems();
});
</script>
