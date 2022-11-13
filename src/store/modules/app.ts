import { defineStore } from 'pinia'
import { LayoutStore } from '../../type/store'

export const useAppStore = defineStore('app', {
  state: (): LayoutStore => {
    return {
      collapse: false
    }
  },
  getters: {
    getCollapse: (state) => state.collapse
  },
  actions: {
    setCollapse(status: boolean) {
      this.collapse = status
    }
  },
  persist: {
    key: 'APP'
  }
})
