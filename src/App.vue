<template>
  <CustomHeader />
  <div class=" bg-gray-100 flex flex-col items-center">
    <CustomTable />
    <CustomModal />

  </div>
  <CustomFooter />
</template>

<script setup lang="ts">
import CustomTable from "./components/CustomTable.vue";
import CustomModal from "./components/CustomModal.vue";
import CustomHeader from "./components/CustomHeader.vue";
import CustomFooter from "./components/CustomFooter.vue";
</script>

<style>

</style>
