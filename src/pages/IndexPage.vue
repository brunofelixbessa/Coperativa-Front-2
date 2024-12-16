<template>
  <q-page class="colunm q-pa-md">
    <!-- <q-input outlined label="Celular"></q-input> -->
    <q-btn label="Abrir" @click="buscar()"></q-btn>

    <q-select
      filled
      v-model="modelMultiple"
      multiple
      :options="options"
      use-chips
      stack-label
      label="Tags para filtro"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import usuarioService from 'src/services/UsuarioService';

// const { buscarGenerica } = usuarioService();
const modelMultiple = ref(['Facebook']);

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

const buscar = async () => {
  ///
  console.log('ok');
  // var result = await buscarGenerica();
  // console.log(result);
};
</script>
