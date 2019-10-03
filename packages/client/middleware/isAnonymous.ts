export default ({ store, redirect }) => {
  if (store.getters['auth/isAuthenticated']) {
    redirect('/');
  }
};
