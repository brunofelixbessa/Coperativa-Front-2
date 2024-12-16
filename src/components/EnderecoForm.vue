<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div class="col-md col-xs-6">
        <q-input
          :disable="disable"
          dense
          v-model="endereco.cep"
          outlined
          mask="#####-###"
          unmasked-value
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="search"
              color="primary"
              @click="buscarCEP"
            />
          </template>
        </q-input>
      </div>
      <div class="col-md col-xs-6">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.pais"
          label="País"
          dense
        ></q-input>
      </div>
      <div class="col-md col-xs-2">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.uf"
          label="UF"
          dense
        ></q-input>
      </div>
      <div class="col-md col-xs">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.cidade"
          label="Cidade"
          dense
        >
        </q-input>
      </div>
      <div class="col-md col-xs">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.bairro"
          label="Bairro"
          dense
        >
        </q-input>
      </div>
      <div class="col-md col-xs-12">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.logradouro"
          label="Logradouro"
          dense
        >
        </q-input>
      </div>
      <div class="col-md col-xs-6">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.numero"
          label="Nº"
          dense
        >
        </q-input>
      </div>
      <div class="col-md col-xs-6">
        <q-input
          :disable="disable"
          outlined
          v-model="endereco.complemento"
          label="Complemento"
          dense
        >
        </q-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import integracaoServices from '../services/IntegracaoServices.ts';
import tokens from '../config/tokens.ts';

const props = defineProps({
  endereco: Object,
  disable: Boolean,
  isNovo: Boolean,
});

const endereco = ref(props.endereco);

const { buscarCepCorreio } = integracaoServices();

/**
 * Função para buscar o endereço pelo CEP.
 * Se for um novo cadastro ou se o CPF ou CNPJ estiverem presentes,
 * chama a função buscarCepCorreio e mapeia o resultado.
 */
const buscarCEP = async () => {
  if (props.isNovo || endereco.value.cpf || endereco.value.cnpj) {
    const result = await buscarCepCorreio(
      endereco.value.cep,
      tokens.TokenIntegracoes
    );
    if (result && !result.erro) {
      mapEnderecoServico(result.dados);
    } else {
      MsgErro('Endereço não encontrado');
    }
  } else {
    MsgErro(
      'A pesquisa de endereço só é permitida para novos cadastros ou quando um CPF ou CNPJ é fornecido.'
    );
  }
};

/**
 * Função para mapear os dados do endereço recebidos do backend
 * para as propriedades do objeto endereco.
 */
const mapEnderecoServico = (dados) => {
  endereco.value.cep = dados.cep;
  endereco.value.uf = dados.uf;
  endereco.value.cidade = dados.localidade;
  endereco.value.bairro = dados.bairro;
  endereco.value.logradouro = dados.logradouro;
  endereco.value.complemento = dados.complemento;
};

/**
 * Função para mapear os dados do endereço recebidos de outra fonte
 * para as propriedades do objeto endereco.
 */
// const mapEndereco = (resultado) => {
//   endereco.value.id = resultado.id;
//   endereco.value.cpf = resultado.cpf;
//   endereco.value.cnpj = resultado.cnpj;
//   endereco.value.cep = resultado.cep;
//   endereco.value.pais = resultado.pais;
//   endereco.value.uf = resultado.uf;
//   endereco.value.cidade = resultado.cidade;
//   endereco.value.bairro = resultado.bairro;
//   endereco.value.logradouro = resultado.logradouro;
//   endereco.value.numero = resultado.numero;
//   endereco.value.complemento = resultado.complemento;
//   endereco.value.gps = resultado.gps;
//   endereco.value.datado = resultado.datado;
//   endereco.value.atualizado = resultado.atualizado;
//   endereco.value.usuario_Cadastrador = resultado.usuario_Cadastrador;
// };

/**
 * Função para habilitar os campos de endereço.
 */
// const habilitarCamposEndereco = () => {
//   isCamposEnderecoVisible.value = true;
// };

/**
 * Observa mudanças na propriedade endereco e atualiza o valor de endereco.
 */
watch(
  () => props.endereco,
  (newVal) => {
    endereco.value = newVal;
  }
);
</script>
