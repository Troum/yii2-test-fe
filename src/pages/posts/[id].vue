<script setup lang="ts">
import {inject, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const http: any = inject('axios')
const {id} = useRoute().params
const router = useRouter()
interface Response {
  data: any
}

interface Post {
  id: number,
  title: string;
  content: string;
  created_at: string;
  is_published: string;
  user: {
    username: string;
  }
}

const post = ref<Post>()

http.get(`/api/posts/${id}?expand=user`)
  .then((response: Response) => {
    post.value = response.data
  })
  .catch((err: any) => {
    if (err.response.status === 404) {
      router.push({path: '/404'})
    }
  })
</script>

<template>
  <v-container :fluid="true">
    <v-row>
      <v-col cols="12" class="d-flex justify-start align-baseline flex-column ga-4">
        <p class="text-h3">{{ post?.title }}</p>
        <p class="text-h6 font-weight-light mb-0">{{ post?.user.username }}</p>
        <p class="text-body font-weight-light">{{ post?.created_at }}</p>
        <p class="text-body-1">{{ post?.content }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
