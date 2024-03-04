
<script setup lang="ts">
import { ref,reactive, computed,watch } from 'vue';
import { dishes } from '../../data/dishes.json';
import { IOrderForm } from '@/types';

import Step1 from './OrderStep/Step1.vue';
import Step2 from './OrderStep/Step2.vue';
import Step3 from './OrderStep/Step3.vue';
import Review from './OrderStep/Review.vue';


// Define Steps
const steps = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Review
}
const currentStep = ref(1);

const orderForm: IOrderForm = reactive({
  mealCategory: 'breakfast',
  numberOfPeople: 1,
  selectedRestaurant: null,
  selectedDishes: [
    {
      selectedDish: '',
      numberOfServings: 1
    }
  ]
})

const filteredRestaurants = computed(() => {
  return [...new Set(dishes.filter(dish => dish.availableMeals.includes(orderForm.mealCategory)).map(dish => dish.restaurant))];
});

const filteredDishes = computed(() => {
  return dishes.filter(dish => dish.restaurant === orderForm.selectedRestaurant && dish.availableMeals.includes(orderForm.mealCategory));
});

const resetSelectedDishes = ()=>{
  orderForm.selectedDishes = [
    {
      selectedDish: '',
      numberOfServings: 1
    }
  ]
}
const resetSelectedRestaurant = ()=>{
  orderForm.selectedRestaurant = null
}

watch(filteredRestaurants, () => {
  resetSelectedRestaurant()
},{immediate: true})

watch(filteredDishes, () => {
  resetSelectedDishes()
},{immediate: true})


// Validate
const error = ref('');
const validateStep3 = () => {
  if(orderForm.selectedDishes.some(selected => selected.selectedDish === '')) {
    error.value = 'Please select a dish.'
  }
  else if(orderForm.selectedDishes.reduce((res, dish) => res += dish.numberOfServings, 0) < orderForm.numberOfPeople) {
    error.value = 'Total number of servings must be greater than or equal to the number of people.'
  } else {
    error.value = ''
  }
};

const nextStep = () => {
  if (currentStep.value === 1) {
    currentStep.value++;
  } else if (currentStep.value === 2) {
    if(!orderForm.selectedRestaurant) {
      error.value = 'Please select a restaurant.'
    } else {
      error.value = ''
      currentStep.value++;
    }
  } else if (currentStep.value === 3) {
    validateStep3()
    if(error.value) {
      return
    }
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitOrder = () => {
  console.log('Order Submitted:', orderForm);
};

</script>
<template>
  <div class="bg-gray-100 p-4 max-w-lg mx-auto relative pb-32 mt-6 min-h-[480px]">
    <h1 class="text-2xl text-center mb-4 font-bold uppercase">Pre-Order Form</h1>
    <!--Step Indicators-->
    <div class="flex items-stretch gap-2 mb-8">
      <div
        v-for="step in 4"
        class="flex items-center justify-center w-full rounded font-bold"
        style="border: 1px solid;"
        :class="{'bg-blue-500 text-white': step  <= currentStep}"
      >{{ step === 4 ? 'Review' : step }}</div>
    </div>
    <!--Steps-->
    <div class="px-4">
      <KeepAlive>
        <component 
          :is="steps[currentStep]" 
          v-model="orderForm"
          :filteredRestaurants="filteredRestaurants"
          :filteredDishes="filteredDishes"
          :error="error"
        ></component>
      </KeepAlive>
    </div>
    <!--Footer-->
    <footer class="absolute bottom-4 flex flex-row-reverse justify-between left-4 right-4">
      <button v-if="currentStep < 4" @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      <button v-else @click="submitOrder" class="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      <button v-if="currentStep > 1" @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
    </footer>
  </div>
</template>
