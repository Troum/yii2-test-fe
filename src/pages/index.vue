<template>
<v-container class="fill-height" :fluid="true">
  <v-row class="fill-height">
    <v-col cols="12" class="d-flex justify-start align-center flex-wrap ga-4">
      <template v-for="(post, i) of posts" :key="i">
        <v-card :to="`/posts/${post.id}`" width="calc(100% / 3 - 15px)">
          <v-card-item>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.user.name }}</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            {{ post.content }}
          </v-card-text>
        </v-card>
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
interface Post {
  id: number,
  title: string;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
  }
}
const posts = ref<Post[]>([])

http.get('/api/posts?expand=user')
  .then((response: Response) => {
    posts.value = response.data
  })

</script>
