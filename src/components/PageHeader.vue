<script setup lang="ts">
import ApiService from '../services/ApiServices.ts'
import { reactive, onMounted } from "vue";

const service = new ApiService('https://restcountries.com/v3.1/')
interface IData{
  name:{common:string}
}
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
  <div v-for="el in data" key="el.name.common">{{el.name.common}}</div>
</div>
</template>

<style scoped>

</style>