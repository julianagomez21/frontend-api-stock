<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10 overflow-y-auto" @close="$emit('update:open', false)">
        <TransitionChild as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md bg-white shadow-xl rounded-lg">
                  <TransitionChild as="template"
                    enter="ease-in-out duration-500"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in-out duration-500"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <div class="absolute top-0 right-0 p-4">
                      <button @click="$emit('update:open', false)"
                        class="text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
                      >
                        ❌
                      </button>
                    </div>
                  </TransitionChild>
  
                  <div class="p-6">
                    <DialogTitle class="text-lg font-semibold text-gray-900 mb-3">
                      Understanding stock investments
                    </DialogTitle>
                    
                    <div class="mt-6 space-y-8">
                      <!-- 📌 Card 1: What Are Stocks? -->
                      <div class="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-semibold text-gray-900">📈 What are stocks?</h2>
                        <p class="text-gray-700 mt-2">
                          A stock represents a share in the ownership of a company and constitutes a claim on part of the company’s assets and earnings. 
                          Stocks are bought and sold in stock markets, and their prices fluctuate based on demand and supply.
                        </p>
                      </div>
  
                      <!-- 📌 Card 2: Importance of Price Changes -->
                      <div class="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-semibold text-gray-900">💰 Why do stock prices change?</h2>
                        <p class="text-gray-700 mt-2">
                          Stock prices change due to various factors like company performance, market conditions, and investor sentiment. 
                          Rising prices can indicate strong performance, while declines may signal problems or market corrections.
                        </p>
                      </div>
  
                      <!-- 📌 Card 3: Ratings & Buy/Hold/Sell -->
                      <div class="bg-gray-100 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-semibold text-gray-900">📊 Buy, Hold, or Sell?</h2>
                        <p class="text-gray-700 mt-2">
                          Analysts provide ratings to guide investors:  
                        </p>
                          <ul class="list-disc list-inside mt-2 text-gray-700">
                            <li><span class="font-bold text-green-600">Buy:</span> Stock is expected to increase in value.</li>
                            <li><span class="font-bold text-yellow-600">Hold:</span> Stock should be kept but not aggressively bought.</li>
                            <li><span class="font-bold text-red-600">Sell:</span> Stock is expected to decrease in value.</li>
                          </ul>
                        
                      </div>

                      <div class="flex justify-center my-4">
        <button
          @click="store.fetchRecommendation()"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Generate recommendation
        </button>
      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
  import { useItemsStore } from '../store/items';

    const store = useItemsStore();  
  
  defineProps<{ open: boolean }>();
  defineEmits(['update:open']);
  </script>
  