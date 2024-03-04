<script setup lang="ts">
import { IOrderForm, IDishes } from '@/types';

const orderForm = defineModel<IOrderForm>();

const props = defineProps<{
  filteredDishes: IDishes[],
  error: string
}>()

const addDish = ()=> {
  orderForm.value.selectedDishes.push({
    selectedDish: '',
    numberOfServings: 1
  })
}
const removeDish = (index:number)=> {
  if(orderForm.value.selectedDishes.length > 1){
    orderForm.value.selectedDishes.splice(index, 1);
  }
}

</script>

<template>
  <div>
    <div v-for="(item, index) in orderForm.selectedDishes" :key="index" class="flex gap-4 items-center ">
      <div>
        <label class="label-primary">Please select a dish</label>
        <select v-model="item.selectedDish" class="select-input-primary">
          <option v-for="dish in props.filteredDishes" :key="dish.id" :value="dish.name" :disabled="orderForm.selectedDishes.some(selected => selected.selectedDish === dish.name)">
            {{ dish.name }}
          </option>
        </select>
      </div>
      <div>
        <label class="label-primary">Please enter number</label>
        <input type="number" v-model="item.numberOfServings" min="1" class="number-input-primary" >
      </div>
      <button @click="removeDish(index)" class="bg-red-500 text-white px-2 rounded ">x</button>
    </div>
    <div v-if="props.error" class="text-red-500">{{ props.error }}</div>
    <button v-if="orderForm.selectedDishes.length !== props.filteredDishes.length" @click="addDish" class="bg-blue-500 text-white mt-4 px-4 py-2 rounded">Add Dish</button>

  </div>
</template>