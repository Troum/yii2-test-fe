<template>
  <v-container class="fill-height" :fluid="true">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-start align-center flex-wrap ga-4">
        <template v-if="users.length">
          <template v-for="(user, i) of users" :key="i">
            <v-card width="calc(100% / 3 - 15px)">
              <v-card-item>
                <v-card-title>{{ user.username }}</v-card-title>
                <v-card-subtitle>{{ user.email }}</v-card-subtitle>
              </v-card-item>
              <v-card-actions>
                <v-select :items="roles" v-model="user.role" variant="outlined" density="comfortable"
                          label="Select role for user"
                          placeholder="Role"></v-select>
              </v-card-actions>
              <v-card-actions class="d-flex justify-end align-center">
                <v-btn variant="tonal" color="secondary"
                       @click.prevent="setRole(user)">{{ user.role ? `Set ${user.role} role to user` : 'Set user role'}}
                </v-btn>
                <v-btn variant="tonal" color="error" append-icon="mdi-delete"
                       @click.prevent="deleteUser(user)">
                  Delete user
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";

const http: any = inject('axios')

interface Response {
  data: any
}

interface User {
  id?: number | null,
  username?: string | null;
  email?: number;
  role?: string | null;
}

const roles = ref<string[]>(['moderator', 'admin', 'customer'])

const users = ref<User[]>([])
const userForm = ref<User>({
  id: null,
  role: 'moderator'
})

const getUsers = () => {
  http.get('/api/auth/users')
    .then((response: Response) => {
      users.value = response.data
    })
}

const setRole = (user: User) => {

  userForm.value = {
    id: user.id,
    role: user.role
  }

  http.post('/api/auth/users/set-role?action=PATCH', userForm.value)
    .then(() => {
      getUsers()
    })
}

const deleteUser = (user: User) => {

  userForm.value = {
    id: user.id
  }

  http.post('/api/auth/users/delete?action=DELETE', userForm.value)
    .then(() => {
      getUsers()
    })
}

getUsers()

</script>
