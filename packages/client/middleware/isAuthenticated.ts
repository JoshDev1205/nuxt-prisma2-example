export default ({ store, route, redirect }) => {
  if (!store.getters['auth/isAuthenticated']) {
    redirect(`/login?redirect=${route.path || ''}`);
  }
};
