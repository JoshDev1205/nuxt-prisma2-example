import { ActionTree, MutationTree } from 'vuex';
import { authLoginPath, authLogoutPath, getUserFromCookie } from '../../server/src/auth/utils';
import { RootState } from './index';
import '@nuxtjs/axios/types/vuex';

export interface AuthState {
  user: Express.User | null;
}

export const state = (): AuthState => ({
  user: null,
});

export const mutations: MutationTree<AuthState> = {
  SET_USER: (state, user) => {
    state.user = user;
  },
};

export const actions: ActionTree<AuthState, RootState> = {
  init ({ commit }, { req }) {
    const user = getUserFromCookie(req.headers.cookie || '');
    commit('SET_USER', user);
  },
  login (_store, { email, password }) {
    return this.$axios.post(authLoginPath, { email, password });
  },
  logout ({ commit }) {
    return this.$axios.post(authLogoutPath)
      .then(() => {
        commit('SET_USER', null);
      });
  },
};
