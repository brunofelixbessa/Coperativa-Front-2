<template>
  <div class="row q-col-gutter-sm">
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.cpf_solicitante"
        label="CPF do Solicitante"
        mask="###.###.###-##"
        unmasked-value
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.cnpj_solicitante"
        label="CNPJ do Solicitante"
        mask="##.###.###/####-##"
        unmasked-value
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.endereco_id"
        label="ID do Endereço"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.valor"
        label="Valor"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.status"
        label="Status"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.previsao"
        label="Previsão"
        type="date"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.descricao"
        label="Descrição"
        dense
        :disable="disable"
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        outlined
        v-model="proposta.observacao"
        label="Observação"
        dense
        :disable="disable"
      ></q-input>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  proposta: Object,
  disable: Boolean,
});

const proposta = ref(props.proposta);

/**
 * Observa mudanças na propriedade proposta e atualiza o valor de proposta.
 */
watch(
  () => props.proposta,
  (newVal) => {
    proposta.value = newVal;
  }
);
</script>
