import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', {
  state: () => {
    return {
      status: false
    }
  },
  getters: {
    getStatus(state: any): boolean {
      return state.status
    }
  },
  actions: {
    setStatus(status: boolean) {
      this.status = status
    }
  }
})
