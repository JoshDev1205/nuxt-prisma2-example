import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtAppOptions } from '@nuxt/types/app';
import VueRouter from 'vue-router';

export interface RootState { };
export const state = (): RootState => ({});

interface Store<S> {
  app: NuxtAppOptions,
  $router: VueRouter,
  $axios: NuxtAxiosInstance;
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('auth/init', context);
  },
};
