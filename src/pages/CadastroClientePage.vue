<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-xs-12">
          <q-input
            outlined
            v-model="searchValue"
            label="Nome, CPF ou Email"
            dense
          >
            <template v-slot:append>
              <q-btn
                flat
                rounded
                icon="search"
                color="primary"
                @click="buscarClienteGenerica"
              ></q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn
            no-wrap
            no-caps
            class="full-width"
            label="Novo Cliente"
            icon="add_circle"
            color="secondary"
            @click="novoCliente"
          ></q-btn>
        </div>
        <div class="col-md-2 col-xs-6">
          <q-btn
            v-if="!editavel"
            no-wrap
            no-caps
            class="full-width"
            label="ATUALIZAR"
            icon="edit"
            color="primary"
            @click="toggleEditavel"
          ></q-btn>
          <q-btn
            v-else
            no-wrap
            no-caps
            class="full-width"
            label="Salvar"
            icon="save"
            color="positive"
            @click="salvarCliente"
          ></q-btn>
        </div>
      </div>

      <q-separator
        class="q-mt-lg q-mb-md"
        v-if="isCamposClienteVisible || isNovoCliente"
      />

      <div class="row q-mt-sm">
        <span class="text-h6">Cliente</span>
      </div>

      <ClienteForm
        :cliente="cliente"
        :disable="!editavel"
        :isNovo="isNovoCliente"
      />

      <div class="row q-mt-sm">
        <div class="col">
          <span class="text-h6">Endereço</span>
        </div>
      </div>
      <EnderecoForm
        :endereco="endereco_cliente"
        :disable="!editavel"
        :isNovo="isNovoCliente"
      />

      <div class="row q-mt-sm">
        <div class="col">
          <span class="text-h6">Empresa</span>
        </div>
      </div>
      <EmpresaForm
        :empresa="empresa_cliente"
        :disable="!editavel"
        :isNovo="isNovoCliente"
      />
    </q-card>

    <q-dialog v-model="isDialogClienteVisible" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="col">
            <div class="text-h6">Selecione um Cliente</div>
          </div>
          <div class="col-auto">
            <q-btn
              icon="close"
              flat
              round
              dense
              @click="isDialogClienteVisible = false"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-list bordered>
          <q-item
            v-for="(item, index) in searchResults"
            :key="index"
            clickable
            @click="selectCliente(item)"
          >
            <q-item-section avatar>
              <q-avatar icon="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.nome }}</q-item-label>
              <q-item-label caption
                >{{ item.cpf }} - {{ item.email }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Fechar"
            color="primary"
            @click="isDialogClienteVisible = false"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogEnderecoVisible" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="col">
            <div class="text-h6">Selecione um Endereço</div>
          </div>
          <div class="col-auto">
            <q-btn
              icon="close"
              flat
              round
              dense
              @click="isDialogEnderecoVisible = false"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-list bordered>
          <q-item
            v-for="(item, index) in enderecoResults"
            :key="index"
            clickable
            @click="selectEndereco(item)"
          >
            <q-item-section>
              <q-item-label
                >{{ item.logradouro }}, {{ item.numero }}</q-item-label
              >
              <q-item-label caption
                >{{ item.bairro }}, {{ item.cidade }} -
                {{ item.uf }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Fechar"
            color="primary"
            @click="isDialogEnderecoVisible = false"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogEmpresaVisible" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="col">
            <div class="text-h6">Selecione uma Empresa</div>
          </div>
          <div class="col-auto">
            <q-btn
              icon="close"
              flat
              round
              dense
              @click="isDialogEmpresaVisible = false"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-list bordered>
          <q-item
            v-for="(item, index) in empresaResults"
            :key="index"
            clickable
            @click="selectEmpresa(item)"
          >
            <q-item-section>
              <q-item-label>{{ item.nome_Fantasia }}</q-item-label>
              <q-item-label caption
                >{{ item.cnpj }} - {{ item.telefone }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Fechar"
            color="primary"
            @click="isDialogEmpresaVisible = false"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ClienteForm from '../components/ClienteForm.vue'; // Verifique se o caminho está correto
import EmpresaForm from 'components/EmpresaForm.vue';
import EnderecoForm from 'components/EnderecoForm.vue';
import usuarioServices from '../services/UsuarioService.ts';
import enderecoServices from '../services/EnderecoService.ts';
import empresaServices from '../services/EmpresaService.ts';
import { formatarData } from '../util/dateUtils.ts';

const { buscarGenerica, criarUsuario, atualizarUsuario } = usuarioServices();
const { buscarEnderecoPorCPF } = enderecoServices();
const { buscarEmpresaPorClienteId } = empresaServices();

const searchValue = ref('');
const isCamposClienteVisible = ref(false);
const isCamposEnderecoVisible = ref(false);
const isCamposEmpresaVisible = ref(false);
const isNovoCliente = ref(false);
const isDialogClienteVisible = ref(false);
const isDialogEnderecoVisible = ref(false);
const isDialogEmpresaVisible = ref(false);
const searchResults = ref([]);
const enderecoResults = ref([]);
const empresaResults = ref([]);
const editavel = ref(false);

// Objeto cliente inicializado com valores padrão
const cliente = ref({
  id: '',
  cpf: '',
  nome: '',
  admin: true,
  ativo: true,
  celular: '',
  fotoUrl: '',
  admin: false,
  leitor: false,
  editor: false,
  usuarioCadastrador: '',
  datado: '',
  atualizado: '',
  login: '',
  senha: '',
  ativo: false,
  emailVerificado: false,
  celular_Verificado: false,
  grupos: [],
  tags: [],
  dataFormatada: '',
});

// Objeto endereco_cliente inicializado com valores padrão
const endereco_cliente = ref({
  cep: '',
  pais: '',
  uf: '',
  cidade: '',
  bairro: '',
  logradouro: '',
  numero: '',
  complemento: '',
});

// Objeto empresa_cliente inicializado com valores padrão
const empresa_cliente = ref({
  nome_Fantasia: '',
  cnpj: '',
  telefone: '',
});

/**
 * Função para buscar cliente de forma genérica (por nome, CPF ou email).
 * Atualiza os resultados da busca e exibe um diálogo se houver mais de um resultado.
 */
const buscarClienteGenerica = async () => {
  const usuarios = await buscarGenerica(searchValue.value);
  if (usuarios) {
    if (usuarios.length > 1) {
      searchResults.value = usuarios;
      isDialogClienteVisible.value = true;
    } else {
      isCamposClienteVisible.value = true;
      const cliente = usuarios[0];
      await mapCliente(cliente);
      await buscarEndereco(cliente.cpf);
      await buscarEmpresa(cliente.id);
      editavel.value = false; // Desabilita a edição após a busca
    }
  } else {
    MsgErro('Cliente não encontrado');
  }
};

/**
 * Função para buscar endereço pelo CPF.
 * Atualiza os resultados da busca e exibe um diálogo se houver mais de um resultado.
 */
const buscarEndereco = async (cpf) => {
  const enderecoResult = await buscarEnderecoPorCPF(cpf);
  if (enderecoResult) {
    if (Array.isArray(enderecoResult) && enderecoResult.length > 1) {
      enderecoResults.value = enderecoResult;
      isDialogEnderecoVisible.value = true;
    } else {
      mapEndereco(enderecoResult[0]);
      isCamposEnderecoVisible.value = true;
    }
  }
};

/**
 * Função para buscar empresa pelo ID do cliente.
 * Atualiza os resultados da busca e exibe um diálogo se houver mais de um resultado.
 */
const buscarEmpresa = async (clienteId) => {
  const empresaResult = await buscarEmpresaPorClienteId(clienteId);
  if (empresaResult) {
    if (Array.isArray(empresaResult) && empresaResult.length > 1) {
      empresaResults.value = empresaResult;
      isDialogEmpresaVisible.value = true;
    } else {
      mapEmpresa(empresaResult[0]);
      isCamposEmpresaVisible.value = true;
    }
  }
};

/**
 * Função para selecionar um cliente da lista de resultados.
 * Atualiza os campos visíveis e busca o endereço e a empresa associados ao cliente.
 */
const selectCliente = async (item) => {
  isCamposClienteVisible.value = true;
  await mapCliente(item);
  await buscarEndereco(item.cpf);
  await buscarEmpresa(item.id);
  isDialogClienteVisible.value = false;
  editavel.value = false; // Desabilita a edição após a seleção
};

/**
 * Função para selecionar um endereço da lista de resultados.
 * Atualiza os campos visíveis com os dados do endereço selecionado.
 */
const selectEndereco = (item) => {
  mapEndereco(item);
  isDialogEnderecoVisible.value = false;
  isCamposEnderecoVisible.value = true;
};

/**
 * Função para selecionar uma empresa da lista de resultados.
 * Atualiza os campos visíveis com os dados da empresa selecionada.
 */
const selectEmpresa = (item) => {
  mapEmpresa(item);
  isDialogEmpresaVisible.value = false;
  isCamposEmpresaVisible.value = true;
};

/**
 * Função para iniciar o cadastro de um novo cliente.
 * Limpa os campos e define o estado como novo cliente.
 */
const novoCliente = () => {
  limparCampos();
  isNovoCliente.value = true;
  isCamposClienteVisible.value = true;
  editavel.value = true;
};

/**
 * Função para salvar o cliente.
 * Cria um novo cliente ou atualiza um cliente existente.
 */
const salvarCliente = async () => {
  if (isNovoCliente.value) {
    await criarCliente();
  } else {
    await atualizarCliente();
  }
  editavel.value = false;
};

/**
 * Função para criar um novo cliente.
 * Exibe uma mensagem de sucesso ou erro com base no resultado.
 */
const criarCliente = async () => {
  const result = await criarUsuario(cliente.value);
  if (result) {
    MsgSucesso('Cliente salvo com sucesso');
  } else {
    MsgErro('Erro ao salvar cliente');
  }
};

/**
 * Função para atualizar um cliente existente.
 * Exibe uma mensagem de sucesso ou erro com base no resultado.
 */
const atualizarCliente = async () => {
  const result = await atualizarUsuario(cliente.value);
  if (result) {
    MsgSucesso('Cliente atualizado com sucesso');
  } else {
    MsgErro('Erro ao atualizar cliente');
  }
};

/**
 * Função para mapear os dados do cliente recebidos do backend
 * para as propriedades do objeto cliente.
 */
const mapCliente = async (resultado) => {
  cliente.value.id = resultado.id;
  cliente.value.cpf = resultado.cpf;
  cliente.value.nome = resultado.nome;
  cliente.value.email = resultado.email;
  cliente.value.celular = resultado.celular;
  cliente.value.fotoUrl = resultado.fotoUrl;
  cliente.value.admin = resultado.admin ?? false;
  cliente.value.leitor = resultado.leitor ?? false;
  cliente.value.editor = resultado.editor ?? false;
  cliente.value.usuarioCadastrador = resultado.usuario_Cadastrador;
  cliente.value.datado = resultado.datado;
  cliente.value.atualizado = resultado.atualizado;
  cliente.value.login = resultado.login;
  cliente.value.senha = resultado.senha;
  cliente.value.ativo = resultado.ativo ?? false;
  cliente.value.emailVerificado = resultado.emailVerificado;
  cliente.value.celular_Verificado = resultado.celular_Verificado;
  cliente.value.grupos = resultado.grupos;
  cliente.value.tags = resultado.tags;

  // Atualiza a data formatada
  cliente.value.dataFormatada = formatarData(cliente.value.atualizado);
};

/**
 * Função para mapear os dados do endereço recebidos do backend
 * para as propriedades do objeto endereco_cliente.
 */
const mapEndereco = (resultado) => {
  endereco_cliente.value.cep = resultado.cep;
  endereco_cliente.value.pais = resultado.pais;
  endereco_cliente.value.uf = resultado.uf;
  endereco_cliente.value.cidade = resultado.cidade;
  endereco_cliente.value.bairro = resultado.bairro;
  endereco_cliente.value.logradouro = resultado.logradouro;
  endereco_cliente.value.numero = resultado.numero;
  endereco_cliente.value.complemento = resultado.complemento;
};

/**
 * Função para mapear os dados da empresa recebidos do backend
 * para as propriedades do objeto empresa_cliente.
 */
const mapEmpresa = (resultado) => {
  empresa_cliente.value.nome_Fantasia = resultado.nome_Fantasia;
  empresa_cliente.value.cnpj = resultado.cnpj;
  empresa_cliente.value.telefone = resultado.telefone;
};

/**
 * Função para limpar os campos do formulário.
 * Redefine os valores dos objetos cliente, endereco_cliente e empresa_cliente.
 */
const limparCampos = () => {
  searchValue.value = '';
  isCamposClienteVisible.value = false;
  isCamposEnderecoVisible.value = false;
  isCamposEmpresaVisible.value = false;
  isNovoCliente.value = false;
  cliente.value = {
    id: '',
    cpf: '',
    nome: '',
    admin: false,
    ativo: false,
    celular: '',
    fotoUrl: '',
    leitor: false,
    editor: false,
    usuarioCadastrador: '',
    datado: '',
    atualizado: '',
    login: '',
    senha: '',
    emailVerificado: false,
    celular_Verificado: false,
    grupos: [],
    tags: [],
    dataFormatada: '',
  };

  endereco_cliente.value = {
    cep: '',
    pais: '',
    uf: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
  };
  empresa_cliente.value = {
    nome_Fantasia: '',
    cnpj: '',
    telefone: '',
  };
};

/**
 * Alterna o estado de editabilidade dos campos.
 */
const toggleEditavel = () => {
  editavel.value = !editavel.value;
};
</script>
