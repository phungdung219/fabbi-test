<script setup lang="ts">
import { IOrderForm } from '@/types';

const orderForm = defineModel<IOrderForm>();
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div>
    <div class="flex gap-4 mb-4">
      <div class=" label-primary w-1/3">Meal</div>
      <div class="">{{capitalizeFirstLetter(orderForm.mealCategory)}}</div>
    </div>
    <div class="flex gap-4 mb-4">
      <div class=" label-primary w-1/3">No. of People</div>
      <div class="">{{orderForm.numberOfPeople}}</div>
    </div>
    <div class="flex gap-4 mb-4">
      <div class=" label-primary w-1/3">Restaurant</div>
      <div class="">{{orderForm.selectedRestaurant}}</div>
    </div>
    <div class="flex gap-4 mb-4">
      <div class=" label-primary w-1/3">Dishes</div>
      <div>
        <div v-for="(dish, index) in orderForm.selectedDishes" :key="index" class="mb-2">
          <p>{{ dish.selectedDish }} - {{ dish.numberOfServings }}</p>
        </div>
      </div>
    </div>
  </div>
</template>