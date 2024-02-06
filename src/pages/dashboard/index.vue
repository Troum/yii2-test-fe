<template>
  <template v-if="message">
    <Alert @reset="message = null" :message="message"/>
  </template>
  <v-container class="fill-height" :fluid="true">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex justify-start align-center flex-wrap ga-4">
        <template v-if="posts.length">
          <template v-for="(post, i) of posts" :key="i">
            <v-card :to="`/posts/${post.id}`" width="calc(100% / 3 - 15px)">
              <v-card-item>
                <v-card-title>{{ post.title }}</v-card-title>
                <template v-if="post.is_published">
                  <v-card-subtitle>Post was published {{ post.published_at }}</v-card-subtitle>
                </template>
                <template v-else>
                  <v-card-subtitle>Draw was created at {{ post.created_at }}</v-card-subtitle>
                </template>
              </v-card-item>
              <v-card-text>
                {{ post.content }}
              </v-card-text>
              <template v-if="user?.role.includes('moderator')">
                <v-card-actions class="d-flex justify-end align-center">
                  <v-btn variant="tonal" color="secondary"
                         :disabled="post.is_published"
                         @click.prevent="publishPost(post.id)">Publish</v-btn>
                </v-card-actions>
              </template>
            </v-card>
          </template>
        </template>
        <template v-else>
          <span class="d-inline-block mx-auto text-h5">
            Currently, you didn't add any post
          </span>
        </template>

      </v-col>

    </v-row>
  </v-container>
  <Dialog>
    <v-form @submit.prevent="onSubmit">
      <v-card>
        <div class="d-flex align-center justify-space-between flex-fill w-100 pt-4 px-6">
          <v-card-title class="d-inline">Create post</v-card-title>
          <v-btn size="24" flat icon="mdi-close" @click="closeDialog"></v-btn>
        </div>
        <v-card-text>
          <v-text-field label="Enter post title" placeholder="Title"
                        autocomplete="off"
                        variant="outlined" density="comfortable"
                        type="text" v-model="postForm.title"></v-text-field>
          <v-textarea label="Enter post content" placeholder="Content" variant="outlined" density="comfortable"
                        rows="10" v-model="postForm.content"></v-textarea>
        </v-card-text>
        <v-card-actions class="d-flex justify-end align-center ga-4">
          <v-btn variant="tonal" color="primary" type="submit">Create</v-btn>
          <v-btn variant="tonal" color="warning" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </Dialog>
</template>

<script lang="ts" setup>
import {computed, inject, ref} from "vue";
import {useAppStore} from "@/store/app";
import Dialog from "@/components/Dialog.vue";
import {useDialogStore} from "@/store/dialog";
import moment from "moment";
import {useRoute} from "vue-router";
import Alert from "@/components/Alert.vue";

const http: any = inject('axios')

interface Response {
  data: any
}
interface Post {
  id?: number|null,
  user_id?: number|null,
  title: string|null;
  content: string|null;
  is_published?: number;
  created_at?: number|string|null;
  published_at?: number|string|null;
}
const {permission} = useRoute().query
const message = ref<string|null>(permission === 'denied' ? 'You cannot interact with users' : null)
const user = computed(() => {
  return useAppStore().getUser
})
const posts = ref<Post[]>([])
const postForm = ref<Post>({title: null, content: null, user_id: user.value.id, created_at: moment().format('YYYY-MM-DD')})

const getPosts = () => {
  http.get('/api/auth/my-posts?expand=user')
    .then((response: Response) => {
      posts.value = response.data
    })
}

const publishPost = (post_id: number|null|undefined) => {
  http.post('/api/auth/posts/publish?action=PATCH', {post_id: post_id})
    .then(() => {
      getPosts()
    })
}
const onSubmit = () => {
  http.post('/api/auth/posts', postForm.value)
    .then(() => {
      getPosts()
    })
}

const closeDialog = () => {
  useDialogStore().setStatus(false)
}

getPosts()

</script>
