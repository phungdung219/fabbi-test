<script setup lang="ts">
import { defineModel, ref } from 'vue';
import { type IOrderForm } from '@/types';

const orderForm = defineModel<IOrderForm>();
const props = defineProps({
  filteredRestaurants: { type: Array, required: true },
  error: { type: String, required: false }
})
</script>

<template>
  <div>
    <label class="label-primary">Select Restaurant:</label>
    <select v-model="orderForm.selectedRestaurant"  class="select-input-primary">
      <option v-for="restaurant in props.filteredRestaurants" :value="restaurant">
        {{ restaurant }}
      </option>
    </select>
    <span v-if="props.error" class="text-red-500">{{ props.error }}</span>
  </div>
</template>