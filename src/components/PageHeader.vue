<script lang="ts" setup>
import ApiService from '../services/ApiServices.ts'
import {reactive, onMounted, ref, Ref, watch} from "vue";
import CountryList from "./CountryList.vue";
import {IData} from "./interfaces.ts";

const service = new ApiService('https://restcountries.com/v3.1/')

let data: IData[] = reactive([])
const search = ref('')
let filteredCountries: Ref<IData[]> = ref([]);
const page = ref(1)
const itemPerPage = ref(12)
const paginatedCountries: Ref<IData[]> = ref([])
const totalItems = ref(0)
const fetchData = async () => {
  try {
    const countries: [] = await service.getCountries('all')
    data.push(...countries)
    totalItems.value = data.length
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw error
  }
}

function filterCountries() {
  filteredCountries.value = data.filter(country => country.name.common.includes(search.value!!))
  console.log('searching Countries', search.value)
}

function sliceCountries(currentArrayCountries: IData[]) {
  const start = (page.value - 1) * itemPerPage.value
  const end = page.value * itemPerPage.value
  paginatedCountries.value = currentArrayCountries.slice(start, end)
}

function changePage(pageNew: number) {
  page.value = pageNew
}

onMounted(() => {
  fetchData()

})
watch([data, page, filteredCountries], () => {
  sliceCountries(filteredCountries.value.length > 0 || search.value !== '' ? filteredCountries.value : data)
})
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
      <CountryList :country="paginatedCountries"/>
      <div class="mt-8 space-x-1">
        <button :class="{'opacity-50':page<=1}" :disabled="page<=1"
                class=" border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200 w-[100px]"
                @click="()=>changePage(page-1)">Previous
        </button>
        <button :class="{'opacity-50':page>=totalItems/itemPerPage}" :disabled="page>=totalItems/itemPerPage"
                class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200 w-[100px]"
                @click="()=>changePage(page+1)">Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>