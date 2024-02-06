<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'success'
  }
})
defineEmits(['reset'])
</script>

<template>
  <v-alert position="absolute" class="w-100"
           style="top: 0; left: 0; right: 0; z-index: 10000"
           :color="color"
           :closable="true"
           @click:close="$emit('reset')"
           :text="message"></v-alert>
</template>

<style scoped>

</style>
