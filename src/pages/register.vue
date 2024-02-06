<template>
  <v-container class="fill-height" :fluid="true">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-center align-center fill-height">
        <v-form @submit.prevent="onSubmit">
          <v-card :width="420">
            <v-card-item>
              <v-card-title>Register to System</v-card-title>
            </v-card-item>
            <v-card-text>
              <v-text-field label="Enter username" placeholder="Name and surname"
                            autocomplete="off"
                            variant="outlined" density="comfortable"
                            type="text" v-model="registrationForm.username"></v-text-field>
              <v-text-field label="Enter e-mail" placeholder="E-mail" variant="outlined" density="comfortable"
                            type="email" v-model="registrationForm.email"></v-text-field>
              <v-text-field label="Enter password" placeholder="Password" variant="outlined" density="comfortable"
                            type="password" v-model="registrationForm.password"></v-text-field>
            </v-card-text>
            <v-card-actions class="px-4 d-flex justify-end align-center">
              <v-btn variant="tonal" color="primary" type="submit">Register</v-btn>
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
import {useRouter} from "vue-router";
interface RegistrationForm {
  username: string | null;
  email: string | null;
  password: string | null;
}
const router = useRouter()
const http: any = inject('axios')
const registrationForm = ref<RegistrationForm>({username: null, email: null, password: null})

const onSubmit = () => {
  http.post('/api/registration/register', registrationForm.value)
    .then(() => {
      router.push({
        path: '/login',
        query: {
          status: 'registered'
        }
      })
    })
    .catch((err: Error) => {
      console.log(err.message)
    })
}

</script>
