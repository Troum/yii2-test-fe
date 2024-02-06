import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  persist: true,
  state: () => {
    return {
      csrf: null,
      user_data: null
    }
  },
  getters: {
    getCSRF(state: any): string {
      return state.csrf
    },
    getUser(state: any): object {
      return state.user_data
    }
  },
  actions: {
    setCSRF(csrf: string) {
      this.csrf = csrf
    },
    setUser(user_data: object) {
      this.user_data = user_data
    }
  }
})
