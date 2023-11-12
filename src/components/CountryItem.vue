<script lang="ts" setup>
import {IData} from "./interfaces.ts";

interface props {
  el: IData
  index: string
}

defineProps<props>()
</script>

<template>
  <div class="h-56 sm:h-36">
    <img :alt="el.name.common" :src="el.flags.png" class="h-56 sm:h-36 w-full"/>
  </div>
  <div class="flex flex-col justify-center items-start">
    <h4 class="text-xl font-bold text-gray-500">{{ index + el.name.common }}</h4>
    <p class="text-sm text-gray-400">Capital:<span v-for="element in el.capital" class="font-bold">{{ element }}
      <template> </template></span>
    </p>
    <p class="text-sm text-gray-400">Population:<span class="font-bold">{{ el.population?.toLocaleString() }}</span></p>
    <p class="text-sm text-gray-400">Región:<span class="font-bold">{{ el.region?.toLocaleString() }}</span></p>
  </div>
</template>

<style scoped>

</style>