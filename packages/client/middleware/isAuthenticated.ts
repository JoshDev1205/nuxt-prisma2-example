export default ({ store, route, redirect }) => {
  if (!store.getters['auth/isAuthenticated']) {
    console.log('not authenticated');
    redirect(`/login?redirect=${route.path || ''}`);
  }
};
