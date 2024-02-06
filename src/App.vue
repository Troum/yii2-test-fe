<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import {useAppStore} from "@/store/app";
interface CsrfToken {
  data: {
    csrfToken: string
  }
}
const http: any = inject('axios')

http.get('/csrf-token').then((response: CsrfToken) => {
  useAppStore().setCSRF(response.data.csrfToken)
})

</script>
