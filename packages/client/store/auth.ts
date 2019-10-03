import { ActionTree, MutationTree } from 'vuex';
import { getUserFromCookie } from '../../server/src/auth/utils';
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
};