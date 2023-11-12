<script setup lang="ts">
import ApiService from '../services/ApiServices.ts'
import { reactive, onMounted } from "vue";
import CountryList from "./CountryList.vue";
import {IData} from "./interfaces.ts";

const service = new ApiService('https://restcountries.com/v3.1/')

const data:IData[] = reactive([])



const fetchData = async () => {
  try {
    const countries:[] = await service.getCountries('all')
    data.push(...countries)
    console.log('viendo paises',data)
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

onMounted(fetchData)
</script>

<template>
<div class="text-center py-24">
  <h1 class="text-4xl font-bold tracking-widest text-sky-700"> Countries App</h1>
  <h6 class="mt-4 text-xl"> A simple app to search countries</h6>
  <div class="container max-w-screen-lg mx-auto">
  <CountryList v-for="el in data" :key="el.name.common" :countries="el"/>
  </div>
</div>
</template>

<style scoped>

</style>