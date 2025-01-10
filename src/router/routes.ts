import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login-page',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/esqueci-senha',
    name: 'esqueci-senha',
    component: () => import('pages/EsqueciSenha.vue'),
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/main/home',
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'lista',
        name: 'lista',
        component: () => import('src/pages/PropostaPage.vue'),
      },
      {
        path: 'cadastro-cliente',
        name: 'cadastro-cliente',
        component: () => import('pages/CadastroClientePage.vue'),
        meta: { requireLogin: true },
      },
      {
        path: 'recurso',
        name: 'recurso',
        component: () => import('pages/RecursoPage.vue'),
        meta: { requireLogin: true },
      },
      {
        path: 'orcamento',
        name: 'orcamento',
        component: () => import('pages/OrcamentoPage.vue'),
        meta: { requireLogin: true },
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('pages/TagsPage.vue'),
        meta: { requireLogin: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
