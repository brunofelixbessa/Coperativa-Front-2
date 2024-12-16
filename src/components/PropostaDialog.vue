<template>
  <q-dialog v-model="propostav">
    <q-card class="q-pa-md">
      <div class="row">
        <div class="col">
          <span class="text-h6 text-bold">Cadastrar - Nova proposta</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-input
            dense
            outlined
            label="Valor"
            v-model="proposta_form.valor_proposta"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
          ></q-input>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col">
          <q-btn
            color="positive"
            class="full-width"
            icon="add"
            @click="novaProposta()"
          ></q-btn>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

const propostav = ref(false);
const proposta_form = ref({
  valor_proposta: 0,
});

const novaProposta = () => {
  // Implementação da nova proposta
};
</script>
