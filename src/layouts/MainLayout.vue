<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <div class="flex flex-center" style="height: 60px">
          <img src="~assets/LogoSemFundo2.png" class="logo" />
        </div>
        <q-space />
      </q-toolbar>
      <q-img src="~assets/fundo.jpg" class="header-img absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
      class="bg-primary"
    >
      <q-scroll-area
        style="
          height: calc(100% - 53px);
          margin-top: 53px;
          border-right: 1px solid #232f34;
        "
      >
        <q-list padding bordered separator>
          <q-item
            clickable
            active-class="my-menu-link"
            v-ripple
            to="/main/cadastro-cliente"
            exact
          >
            <q-item-section avatar>
              <q-icon color="secondary" name="person" />
            </q-item-section>
            <q-item-section class="text-white"> Cadastro </q-item-section>
          </q-item>

          <q-item
            clickable
            active-class="my-menu-link"
            v-ripple
            to="/main/lista"
            exact
            color="secondary"
          >
            <q-item-section avatar>
              <q-icon color="secondary" name="receipt_long" />
            </q-item-section>
            <q-item-section class="text-white"> Proposta </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/main/orcamento">
            <q-item-section avatar>
              <q-icon color="secondary" name="attach_money" />
            </q-item-section>

            <q-item-section class="text-white"> Orçamento </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/main/recurso">
            <q-item-section avatar>
              <q-icon color="secondary" name="inventory_2" />
            </q-item-section>
            <q-item-section class="text-white"> Recurso </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/main/tags">
            <q-item-section avatar>
              <q-icon color="secondary" name="label" />
            </q-item-section>

            <q-item-section class="text-white"> Tags </q-item-section>
          </q-item>

          <q-item
            v-if="storeAuth.isAuthenticated"
            clickable
            v-ripple
            to="/main/admin"
            exact
          >
            <q-item-section avatar>
              <q-icon color="secondary" name="settings" />
            </q-item-section>
            <q-item-section class="text-white"> Configuração </q-item-section>
          </q-item>

          <q-item class="absolute-bottom" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="secondary" name="info" />
            </q-item-section>
            <q-item-section class="text-white"> v1.2 </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" style="height: 60px" src="~assets/fundo.jpg">
        <div class="bg-transparent">
          <q-item>
            <q-item-section avatar>
              <q-btn
                round
                color="primary"
                v-if="storeAuth.isAuthenticated"
                @click="sairDoSistema()"
                icon="person"
              ></q-btn>
              <q-btn v-else round color="secondary" icon="login" to="/login" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{
                storeAuth.usuario?.Nome || 'Nome do usuário'
              }}</q-item-label>
              <q-item-label caption lines="1">{{
                storeAuth.usuario?.Email || 'email do usuário'
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/stores/auth';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);
    const storeAuth = useAuth();
    const router = useRouter();

    /**
     * Realiza o logout do usuário e redireciona para a página de login.
     */
    const sairDoSistema = () => {
      storeAuth.removeUsuario();
      router.push('/login');
    };

    /**
     * Alterna o estado do menu lateral.
     */
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      storeAuth,
      sairDoSistema,
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
});
</script>

<style scoped>
.logo {
  width: 150px;
}
.header-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
.my-menu-link {
  background-color: #373737;
}
.q-img__content > div {
  padding: 0px !important;
}
</style>
