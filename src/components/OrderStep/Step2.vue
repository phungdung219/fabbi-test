<script setup lang="ts">
import { ref } from 'vue';
const orderForm = defineModel()
const props = defineProps({
  filteredRestaurants: { type: Array, required: true },
})
</script>

<template>
  <div>
    <label class="label-primary">Select Restaurant:</label>
    <select v-model="orderForm.selectedRestaurant"  class="select-input-primary">
      <option v-for="restaurant in props.filteredRestaurants" :key="restaurant" :value="restaurant">
        {{ restaurant }}
      </option>
    </select>
    <!-- <span v-if="step2Error" class="error">{{ step2Error }}</span> -->
  </div>
</template>