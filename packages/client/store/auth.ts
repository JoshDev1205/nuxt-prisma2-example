import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';
import { authLoginPath, authLogoutPath, authSignupPath, getUserFromCookie } from '../../server/src/auth/utils';
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
    const { data, status } = await this.$axios.post(authLoginPath, { email, password }, {
      validateStatus: (status: number) => (status >= 200 && status < 500),
    });
    this.app.apolloProvider.defaultClient.resetStore();
    restartWebsockets(this.app.apolloProvider.defaultClient.wsClient);
    commit('SET_USER', data.user || null);
    if (status !== 200) {
      throw new Error('Invalid email / password combination');
    }
  },
  async logout ({ commit }) {
    await this.$axios.post(authLogoutPath);
    this.app.apolloProvider.defaultClient.resetStore();
    restartWebsockets(this.app.apolloProvider.defaultClient.wsClient);
    commit('SET_USER', null);
  },
  async signup ({ commit }, { email, password }) {
    const { data, status } = await this.$axios.post(authSignupPath, { email, password }, {
      validateStatus: (status: number) => (status >= 200 && status < 500),
    });
    this.app.apolloProvider.defaultClient.resetStore();
    restartWebsockets(this.app.apolloProvider.defaultClient.wsClient);
    commit('SET_USER', data.user || null);
    if (status !== 200) {
      throw new Error('Could not signup user');
    }
  },
};

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: state => !!state.user,
};
