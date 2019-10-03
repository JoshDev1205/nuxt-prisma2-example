import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { authLoginPath, authLogoutPath, getUserFromCookie } from '../../server/src/auth/utils';
import { RootState } from './index';

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
  async login ({ commit }, { email, password }) {
    const { data } = await this.$axios.post(authLoginPath, { email, password });
    commit('SET_USER', data.user || null);
  },
  async logout ({ commit }) {
    await this.$axios.post(authLogoutPath);
    commit('SET_USER', null);
  },
};

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: state => !!state.user,
};
