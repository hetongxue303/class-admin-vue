import { defineStore } from 'pinia'
import { SettingStore } from '../../type/store'

export const useSettings = defineStore('settings', {
  state: (): SettingStore => {
    return {}
  },
  getters: {},
  actions: {},
  persist: {
    key: 'SETTINGS'
  }
})
