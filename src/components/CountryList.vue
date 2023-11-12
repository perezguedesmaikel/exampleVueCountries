<script setup lang="ts">
import { IData } from "./interfaces";

defineProps({
  data: {
    type:Array as ()=>IData[],
    required:true
  }
});
</script>

<template>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
  <div v-for="(el,index) in data" class="border border-gray-300 rounded p-3"><label>{{index+'-'}}</label>{{el.name.common}}</div>
</div>
</template>

<style scoped>

</style>