<template>
  <template v-if="message">
    <Alert @reset="message = null" :message="message"/>
  </template>
  <template v-else-if="loginFailedMessage">
    <Alert @reset="loginFailedMessage = null" :message="loginFailedMessage" color="error"/>
  </template>
  <v-container class="fill-height" :fluid="true">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center fill-height">
        <v-form @submit.prevent="onSubmit">
          <v-card :width="420">
            <v-card-item>
              <v-card-title>Login to System</v-card-title>
            </v-card-item>
            <v-card-text class="pb-0">
              <v-text-field label="Enter e-mail" placeholder="E-mail" variant="outlined" density="comfortable"
                            type="email" v-model="loginForm.email"></v-text-field>
              <v-text-field label="Enter password" placeholder="Password" variant="outlined" density="comfortable"
                            type="password" v-model="loginForm.password"></v-text-field>
            </v-card-text>
            <v-card-actions class="px-4 d-flex justify-end align-center">
              <v-btn variant="tonal" color="primary" type="submit">Login</v-btn>
              <v-btn variant="tonal" color="warning" to="/">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";
import {useAppStore} from "@/store/app";
import {useRoute, useRouter} from "vue-router";
import Alert from "@/components/Alert.vue";

interface Response {
  data: {
    user_data: {
      name: string;
      email: string;
      id: number;
      access_token: string;
    }
  }
}

interface LoginForm {
  email: string | null;
  password: string | null;
}

const http: any = inject('axios')
const loginForm = ref<LoginForm>({email: null, password: null})
const router = useRouter()
const {status} = useRoute().query
const loginFailedMessage = ref<string | null>(null)

const message = ref<string|null>(status ? 'You were successfully registered. Please, login using your credentials' : null)
const onSubmit = () => {
  http.post('/api/login', loginForm.value)
    .then((response: Response) => {
      useAppStore().setUser(response.data.user_data)
    })
    .then(() => {
      router.push({path: '/dashboard'})
    })
    .catch((err: any) => {
      message.value = null
      loginFailedMessage.value = err.response.data.message
    })
}

</script>
