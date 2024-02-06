<script setup lang="ts">
import {computed} from "vue";
import {useDialogStore} from "@/store/dialog";

const show = computed(() => {
  return useDialogStore().getStatus
})

</script>

<template>
<v-dialog :model-value="show" width="45%" :persistent="true" :scrollable="true">
  <slot></slot>
</v-dialog>
</template>

<style scoped>

</style>
