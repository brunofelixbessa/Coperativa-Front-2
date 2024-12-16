<template>
  <div class="row q-col-gutter-sm">
    <div class="col-md-2 col-xs-12">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.cpf"
        label="CPF"
        mask="###.###.###-##"
        unmasked-value
        dense
      ></q-input>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.nome"
        @update:model-value="gerarLogin(cliente.nome)"
        lazy-rules="ondemand"
        :rules="[(val) => (val !== null && val !== '') || 'Campo obrigatório.']"
        label="Nome"
        dense
      ></q-input>
    </div>
    <div class="col-md-3 col-xs-12">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.email"
        label="E-mail"
        dense
      >
        <template v-slot:append> <q-icon name="mail" /> </template>
      </q-input>
    </div>
    <div class="col-md-3 col-xs-10">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.celular"
        label="Celular"
        mask="(##) #####-####"
        unmasked-value
        dense
      >
        <template v-slot:append> <q-icon name="call" /> </template>
      </q-input>
    </div>
    <div class="col-md-3 col-xs-12">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.login"
        label="Login"
        dense
      ></q-input>
    </div>
    <div class="col-md-3 col-xs-12">
      <q-select
        :disable="disable"
        outlined
        v-model="cliente.tags"
        label="Tags"
        multiple
        :options="tagOptions"
        option-value="nome"
        option-label="nome"
        map-options
        emit-value
        dense
        use-chips
        unique
      ></q-select>
    </div>
    <div class="col-md-4 col-xs-12">
      <q-select
        :disable="disable"
        outlined
        v-model="cliente.grupos"
        label="Grupos"
        multiple
        :options="grupoOptions"
        option-value="nome"
        option-label="nome"
        map-options
        emit-value
        dense
        use-chips
        unique
      ></q-select>
    </div>
    <div v-if="isAdmin" class="col-md-2 col-xs-12">
      <q-input
        :disable="disable"
        outlined
        v-model="cliente.senha"
        label="Senha"
        type="password"
        dense
      ></q-input>
    </div>
    <div class="col-md-2 col-xs-12">
      <q-input
        :disable="true"
        outlined
        v-model="dataFormatada"
        label="Última Atualização"
        type="text"
        dense
      ></q-input>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { formatarData } from '../util/dateUtils.ts';
const props = defineProps({
  cliente: Object,
  disable: Boolean,
  isNovo: Boolean,
});

const cliente = ref(props.cliente);
const grupoOptions = ref([]);
const tagOptions = ref([]);
const dataFormatada = ref('');

// Observa mudanças no objeto cliente
watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = newVal;
    if (newVal.nome && props.isNovo) {
      gerarLogin(newVal.nome);
      cliente.value.senha = gerarSenha(newVal.nome);
    }
    if (newVal.atualizado) {
      dataFormatada.value = formatarData(newVal.atualizado);
    }
  },
  { deep: true, immediate: true }
);

/**
 * Função para buscar as opções de grupos e tags do serviço auxiliar.
 */
const buscarOpcoes = async () => {
  const grupos = [
    { nome: 'Admin' },
    { nome: 'Cliente' },
    { nome: 'Fornecedor' },
    { nome: 'Usuário' },
    { nome: 'TI' },
    { nome: 'Gerente' },
  ];
  const tags = [
    { nome: 'VIP' },
    { nome: 'Verificado' },
    { nome: 'Participante de Promoção' },
    { nome: 'Membro' },
  ];

  grupoOptions.value = grupos;
  tagOptions.value = tags;
};

const gerarLogin = (nome) => {
  console.log('nome', nome);
  const nomes = nome
    .normalize('NFD') // Normaliza a string
    .replace(/[\u0300-\u036f]/g, '') // Remove acentuação
    .replace(/[^a-zA-Z\s]/g, '') // Remove caracteres especiais
    .split(' ')
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
  if (nomes.length >= 2) {
    cliente.value.login = `${nomes[0]}.${
      nomes[nomes.length - 1]
    }`.toLowerCase();
  }
};

// Função para gerar a senha
const gerarSenha = (nome) => {
  const primeiroNome = nome.split(' ')[0];
  const primeiroNomeCapitalizado =
    primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
  const anoCorrente = new Date().getFullYear();
  return `${primeiroNomeCapitalizado}@${anoCorrente}`;
};

/**
 * Busca as opções de grupos e tags ao montar o componente.
 */
onMounted(() => {
  buscarOpcoes();
});
</script>
