<template>
  <div class="row q-col-gutter-sm">
    <div class="col">
      <q-input
        outlined
        v-model="empresa.cnpj"
        label="CNPJ"
        mask="##.###.###/####-##"
        unmasked-value
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col">
      <q-input
        outlined
        v-model="empresa.nome_Fantasia"
        label="Nome Fantasia"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col">
      <q-input
        :disable="disable"
        outlined
        v-model="empresa.telefone"
        label="Telefone"
        mask="(##) #####-####"
        unmasked-value
        dense
      >
        <template v-slot:append> <q-icon name="call" /> </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  empresa: Object,
  disable: Boolean,
  isNovo: Boolean,
});

const empresa = ref(props.empresa);

/**
 * Observa mudanças na propriedade empresa e atualiza o valor de empresa.
 */
watch(
  () => props.empresa,
  (newVal) => {
    empresa.value = newVal;
  }
);
</script>
