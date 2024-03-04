<script setup lang="ts">
import { watch, computed } from 'vue';
const orderForm = defineModel()

const props = defineProps({
  filteredDishes: { type: Array, required: true },
})

const addDish = ()=> {
  orderForm.value.selectedDishes.push({
    selectedDish: '',
    numberOfServings: 1
  })
}
const removeDish = (index)=> {
  if(orderForm.value.selectedDishes.length > 1){
    orderForm.value.selectedDishes.splice(index, 1);
  }
}
const resetSelectedDishes = ()=>{
  orderForm.value.selectedDishes = [
    {
      selectedDish: '',
      numberOfServings: 1
    }
  ]
}
const selectedRestaurantComputed = computed(()=>{
  return orderForm.value.selectedRestaurant
})

watch(selectedRestaurantComputed, () => {
  resetSelectedDishes()
},{ deep: true })

</script>

<template>
  <div>
    <!-- Add dynamic Select Dish and Number of Servings fields -->
    <div v-for="(item, index) in orderForm.selectedDishes" :key="index" class="flex gap-4 items-center mb-4">
      <div>
        <label class="label-primary">Please select a dish</label>
        <select v-model="item.selectedDish" class="select-input-primary">
          <option v-for="dish in props.filteredDishes" :key="dish.id" :value="dish.name" :disabled="orderForm.selectedDishes.find(selected=>selected.selectedDish==dish.name)">
            {{ dish.name }}
          </option>
        </select>
      </div>
      <!-- <span v-if="dishEntry.step3Error" class="error">{{ dishEntry.step3Error }}</span> -->
      <div>
        <label class="label-primary">Please enter number</label>
        <input type="number" v-model="item.numberOfServings" min="1" class="number-input-primary" >
      </div>
      <!-- <span v-if="dishEntry.step3Error" class="error">{{ dishEntry.step3Error }}</span> -->
      <button @click="removeDish(index)" class="bg-red-500 text-white px-2 rounded ">x</button>
    </div>
    <button v-if="orderForm.selectedDishes.length !== props.filteredDishes.length" @click="addDish" class="bg-blue-500 text-white px-4 py-2 rounded">Add Dish</button>

  </div>
</template>