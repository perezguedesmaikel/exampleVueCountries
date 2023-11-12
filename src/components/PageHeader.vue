<script lang="ts" setup>
import ApiService from '../services/ApiServices.ts'
import {reactive, onMounted, ref, Ref} from "vue";
import CountryList from "./CountryList.vue";
import {IData} from "./interfaces.ts";

const service = new ApiService('https://restcountries.com/v3.1/')

let data: IData[] = reactive([])

const search = ref(null)
let filteredCountries: Ref<IData[]> = ref([]);
const fetchData = async () => {
  try {
    const countries: [] = await service.getCountries('all')
    data.push(...countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

function filterCountries() {
  filteredCountries.value = data.filter(country => country.name.common.includes(search.value!!))
  console.log('searching Countries', search.value)
}

onMounted(fetchData)
</script>

<template>
  <div class="text-center py-24">
    <h1 class="text-4xl font-bold tracking-widest text-sky-700"> Countries App</h1>
    <h6 class="mt-4 text-xl"> A simple app to search countries</h6>
    <div class="container max-w-screen-lg mx-auto px-6">

      <div class="flex justify-start items-center m-4 ml-0">
        <label class="mr-2">Search Country:</label>
        <input
            v-model="search"
            class="border border-gray-300 rounded p-1 w-[300px] px-4"
            placeholder="Cuba,Canada,Estados Unidos..."
            type="text"
            @input="filterCountries"/>
      </div>
      <CountryList :country="filteredCountries.length>0?filteredCountries:data"/>
    </div>
  </div>
</template>

<style scoped>

</style>