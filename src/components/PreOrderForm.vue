
<script setup lang="ts">
import { ref,reactive, computed } from 'vue';
import dishesData from '../../data/dishes.json' with { type: 'json' };

import Step1 from './OrderStep/Step1.vue';
import Step2 from './OrderStep/Step2.vue';
import Step3 from './OrderStep/Step3.vue';
import Review from './OrderStep/Review.vue';
import * as data from '../../data/dishes.json'



  // Define Steps
  const steps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Review
  }
  const currentStep = ref(1);
  const mealCategory = ref('breakfast');
  const numberOfPeople = ref(1);
  const selectedRestaurant = ref(null);
  const selectedDishes = reactive([
    {
      selectedDish: '',
      numberOfServings: 1
    }
  ]);

  const orderForm = reactive({
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

  // Validation errors
  const step1Error = ref(null);
  const step2Error = ref(null);
  const step3Error = ref(null);

  const filteredRestaurants = computed(() => {
    return [...new Set(dishesData.dishes.filter(dish => dish.availableMeals.includes(orderForm.mealCategory)).map(dish => dish.restaurant))];
  });

  const filteredDishes = computed(() => {
    return dishesData.dishes.filter(dish => dish.restaurant === orderForm.selectedRestaurant && dish.availableMeals.includes(orderForm.mealCategory));
  });

  const validateStep1 = () => {
    step1Error.value = orderForm.mealCategory ? null : 'Please select a meal category.';
  };

  const validateStep2 = () => {
    step2Error.value = selectedRestaurant ? null : 'Please select a restaurant.';
  };

  // const validateStep3 = () => {
  //   step3Error.value = selectedDish.value && numberOfServings.value > 0 ? null : 'Please select a dish and enter a valid number of servings.';
  // };

  const nextStep = () => {
    if (currentStep.value === 1 && !step1Error.value) {
      currentStep.value++;
    } else if (currentStep.value === 2 && !step2Error.value) {
      currentStep.value++;
    } else if (currentStep.value === 3 && !step3Error.value) {
      currentStep.value++;
    }
  };

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };

  const submitOrder = () => {
    // Implement logic to submit the order with selected data
    console.log('Order Submitted:', orderForm);
  };

</script>
<template>
  <div class="bg-gray-100 p-4 max-w-lg mx-auto min-h-96 relative pb-32">
    <!--Step Indicators-->
    <div class="flex items-stretch gap-2 mb-8">
      <div
        v-for="step in 4"
        class="flex items-center justify-center w-full rounded font-bold"
        style="border: 1px solid;"
        :class="{'bg-blue-500 text-white': step  <= currentStep}"
      >{{ step === 4 ? 'Review' : step }}</div>
    </div>
    <KeepAlive>
      <component 
        :is="steps[currentStep]" 
        v-model="orderForm"
        :filteredRestaurants="filteredRestaurants"
        :filteredDishes="filteredDishes"
      ></component>
    </KeepAlive>
    <!--Footer-->
    <footer class="absolute bottom-4 flex flex-row-reverse justify-between left-4 right-4">
      <button v-if="currentStep < 4" @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      <button v-else @click="submitOrder" class="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      <button v-if="currentStep > 1" @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
    </footer>
  </div>
</template>


<style scoped>
.error {
  color: red;
  margin-top: 5px;
}
</style>
