import { ActionTree } from 'vuex';

export interface RootState { };
export const state = (): RootState => ({});

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('auth/init', context);
  },
};
