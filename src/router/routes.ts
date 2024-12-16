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
        path: 'leitor',
        name: 'leitor',
        component: () => import('pages/LeitorPage.vue'),
        meta: { leitor: true },
      },
      {
        path: 'lista',
        name: 'lista',
        component: () => import('src/pages/PropostaPage.vue'),
        meta: { requerLogin: true },
      },
      {
        path: 'cadastro-cliente',
        name: 'cadastro-cliente',
        component: () => import('pages/CadastroClientePage.vue'),
        meta: { requerLogin: true },
      },
      {
        path: 'usuario',
        name: 'usuario',
        component: () => import('pages/CadastroUsuario.vue'),
        meta: { requerLogin: true },
      },
      {
        path: 'recurso',
        name: 'recurso',
        component: () => import('pages/RecursoPage.vue'),
        meta: { requerLogin: true },
      },
      {
        path: 'orcamento',
        name: 'orcamento',
        component: () => import('pages/OrcamentoPage.vue'),
        meta: { requerLogin: true },
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('pages/TagsPage.vue'),
        meta: { requerLogin: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
