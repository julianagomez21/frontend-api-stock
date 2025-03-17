<template>
  
    <!-- Modal con animación y tamaño mejorado -->
    <div
      v-if="store.recommendations?.length"
      class="fixed inset-0 bg-black/40 flex items-center justify-center transition-opacity"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg transform animate-bounce-in min-w-[600px] max-w-[800px]">
        <h2 class="text-xl font-semibold mb-2 text-center p-5">
          📈 The best investment opportunity!
        </h2>
  
        <div class="text-center mb-4">
          <h1>
            <strong> {{ store.recommendations[0].ticker }} </strong> - 
            {{ store.recommendations[0].company }}
          </h1>
          <p><strong>Brokerage:</strong> {{ store.recommendations[0].brokerage }}</p>
          <p><strong>Action:  </strong> 
            <span
                  :class="{
                    'bg-yellow-200 text-gray-700 px-3 py-1 rounded-md cursor-pointer':
                      store.recommendations[0].action === 'reiterated by',
                    'bg-red-100 text-red-700 px-3 py-1 rounded-md cursor-pointer':
                      store.recommendations[0].action === 'target lowered by' ||
                      store.recommendations[0].action === 'downgraded by',
                    'bg-green-100 text-green-700 px-3 py-1 rounded-md cursor-pointer':
                      store.recommendations[0].action === 'upgraded by' ||
                      store.recommendations[0].action === 'target raised by' ||
                      store.recommendations[0].action === 'initiated by' ||
                      store.recommendations[0].action === 'target set by',
                  }"
                >
                {{ store.recommendations[0].action }}
            </span>
            </p>
        </div>
  
        <!-- Contenedor con la gráfica a la izquierda y la tabla a la derecha -->
        <div class="flex gap-6 items-center">
          <!-- 📊 Gráfico a la izquierda con espacio adecuado -->
          <div class="w-[350px] h-[200px] flex justify-center items-center">
            <canvas ref="chartCanvas" class="max-w-full max-h-full"></canvas>
          </div>
  
          <!-- 📋 Tabla a la derecha con mejor espacio -->
          <div class="flex-1">
            <table class="w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="border border-gray-300 px-4 py-2">Rating from</th>
                  <th class="border border-gray-300 px-4 py-2">Rating to</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border border-gray-300 px-4 py-2 text-center">
                    {{ store.recommendations[0].rating_from }}
                  </td>
                  <td class="border border-gray-300 px-4 py-2 text-center">
                    {{ store.recommendations[0].rating_to }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Botón para cerrar -->
        <div class="flex justify-center mt-4">
          <button
            @click="closeModal"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useItemsStore } from "../store/items";
import { nextTick } from "vue";
import Chart from "chart.js/auto";

const store = useItemsStore();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const closeModal = () => {
  store.recommendations = null;
};

// Esperar datos antes de graficar
watch(
  () => store.recommendations,
  async (newData) => {
    console.log("📊 Datos actualizados:", newData);
    
    if (!newData?.length) {
      console.log("❌ No hay datos para graficar.");
      return;
    }

    await nextTick(); // Espera a que Vue termine de renderizar

    if (chartCanvas.value) {
      console.log("✅ Canvas encontrado:", chartCanvas.value);

      // Destruir gráfico previo si existe
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels: newData.map((r) => r.ticker),
          datasets: [
            {
              label: "Change (%)",
              data: newData.map((r) => r.change),
              backgroundColor: "#155DFC",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      });
    } else {
      console.log("⚠️ Canvas aún es null.");
    }
  }
);
</script>

<style>
/* 🎨 Animación de brinco más pronunciado */
@keyframes bounce-in {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  40% {
    transform: scale(1.15);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease-out;
}
</style>
