<script setup lang="ts">
import { defineModel } from 'vue';
import { type IOrderForm } from '@/types';

const orderForm = defineModel<IOrderForm>();

</script>

<template >
  <div>
    <div class="row-start-1 col-start-1 mb-4">
      <label class=" label-primary">Please select a meal</label>
      <select v-model="orderForm.mealCategory" class="select-input-primary">
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
    </div>
    <div class="row-start-1 col-start-1">
      <label class=" label-primary">Please enter number of people (max 10)</label>
      <input type="number" v-model="orderForm.numberOfPeople" max="10" class="number-input-primary">
    </div>
  </div>
</template>