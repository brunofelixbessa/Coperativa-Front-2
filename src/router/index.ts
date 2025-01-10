import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { addInterceptors } from 'src/util/iterceptorHttp';

import { useAuth } from 'src/stores/auth';

import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const store = useAuth();
    if (
      to.matched.some((record) => record.meta.requireLogin) &&
      !store.isAuthenticated
    ) {
      console.log('Pagina segura', store.isAuthenticated);
      next(
        {
          name: 'login',
          query: { to: to.path },
        }
        // console.log("Pagina segura")
      );
    } else {
      console.log('Pagina NAO segura', store.isAuthenticated);
      next();
    }
  });

  addInterceptors(Router);
  return Router;
});
