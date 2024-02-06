<template>
  <v-app-bar flat class="d-flex justify-space-between align-center px-4">
    <v-app-bar-title class="d-flex justify-start align-center ga-4">
      <v-icon icon="mdi-circle-slice-6"/>
      <template v-if="loggedIn">
        <span class="text-body-1 font-weight-medium">{{ user.name }}</span>
      </template>
    </v-app-bar-title>
    <template v-if="!loggedIn">
      <div class="d-flex justify-start align-center ga-4">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat to="/register">Register</v-btn>
      </div>
    </template>
    <template v-else>
      <div class="d-flex justify-start align-center ga-4">
        <template v-if="isDashboard">
          <v-btn variant="tonal" @click="addPost">Add Post</v-btn>
          <template v-if="isAdmin">
            <v-btn variant="tonal" to="/dashboard/users">Work with Users</v-btn>
          </template>
        </template>
        <template v-else>
          <v-btn flat to="/dashboard">Dashboard</v-btn>
        </template>
        <v-btn flat @click="logout" color="error">Logout</v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import {computed, inject} from "vue";
import {useAppStore} from "@/store/app";
import {useRoute, useRouter} from "vue-router";
import {useDialogStore} from "@/store/dialog";

const router = useRouter()
const route = useRoute()
const user = computed(() => {
  return useAppStore().getUser
})

const loggedIn = computed(() => {
  return !!user.value
})

const isDashboard = computed(() => {
  return route.name?.includes('dashboard')
})

const isAdmin = computed(() => {
  return user.value?.role.includes('admin')
})

const http: any = inject('axios')
const logout = () => {
  http.post('/api/auth/logout')
    .then(() => {
      useAppStore().setUser(null)
    })
    .then(() => {
      router.push({path: '/login'})
    })
}
const addPost = () => {
  useDialogStore().setStatus(true)
}
</script>
