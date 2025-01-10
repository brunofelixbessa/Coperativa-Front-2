<template>
  <router-view />
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue';
import { useAuth } from 'src/stores/auth';

export default defineComponent({
  name: 'App',

  setup() {
    const store = useAuth();
    onBeforeMount(() => {
      pegarToken();
    });

    const pegarToken = async () => {
      await store.init();
    };

    return {
      store,
    };
  },
});
</script>
