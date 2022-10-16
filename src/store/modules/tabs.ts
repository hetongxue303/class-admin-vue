import { defineStore } from "pinia";
import { ITabsStore } from "../types";

export const useTabsStore = defineStore("tabs", {
  state: (): ITabsStore => {
    return {
      tabs: [],
      activeName: "",
      currentName: ""
    };
  },
  getters: {
    getTabs: (state) => state.tabs,
    getActiveName: (state) => state.activeName,
    getCurrentName: (state) => state.currentName
  },
  actions: {},
  persist: {
    key: "TABS"
  }
});
