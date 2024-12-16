<template>
  <q-page class="q-pa-md">
    <div class="row">
      <q-card class="col-md-12 col-xs-12 q-pa-md">
        <div class="row q-col-gutter-md">
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              label="Código"
              v-model="codigoRecurso"
              unmasked-value
              dense
              :rules="[(val) => !!val || 'Código é obrigatório']"
              ><template v-slot:append>
                <q-btn
                  flat
                  rounded
                  icon="search"
                  color="primary"
                  @click="buscar()"
                ></q-btn> </template
            ></q-input>
          </div>
          <div class="col-md-2 col-xs-6">
            <q-btn
              no-wrap
              no-caps
              class="full-width"
              label="Novo Cliente"
              icon="add_circle"
              color="secondary"
              @click="novoRecurso()"
            ></q-btn>
          </div>
          <div class="col-md-2 col-xs-6" v-if="novo_recursov || recursov">
            <q-btn
              no-wrap
              no-caps
              class="full-width"
              label="Salvar"
              icon="save"
              color="positive"
              @click="salvar()"
            ></q-btn>
          </div>
        </div>

        <q-separator class="q-mt-lg q-mb-sm" v-if="novo_recursov || recursov" />

        <div class="row">
          <div
            class="col-md-12 col-xs-12 q-col-gutter-y-sm"
            v-if="novo_recursov || recursov"
          >
            <div class="row">
              <span class="text-h6">Recurso</span>
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  label="Código"
                  mask="#######"
                  v-model="recurso.codigo"
                  unmasked-value
                  dense
                  :rules="[(val) => !!val || 'Código é obrigatório']"
                ></q-input>
              </div>
              <div class="col-md col-xs-12">
                <q-input
                  outlined
                  label="Nome"
                  v-model="recurso.nome"
                  dense
                  :rules="[(val) => !!val || 'Código é obrigatório']"
                ></q-input>
              </div>
              <div class="col-md col-xs-12">
                <q-input
                  outlined
                  label="Descrição"
                  v-model="recurso.descricao"
                  dense
                  :rules="[(val) => !!val || 'Código é obrigatório']"
                >
                </q-input>
              </div>
              <div class="col-md-2 col-xs">
                <q-input
                  outlined
                  label="Tipo"
                  v-model="recurso.tipo"
                  dense
                  :rules="[(val) => !!val || 'Código é obrigatório']"
                >
                </q-input>
              </div>
            </div>

            <div class="col-md col-xs-12">
              <q-select
                outlined
                label="TAGs"
                v-model="recurso.tags"
                :options="tagsOptions"
                use-chips
                multiple
                dense
                :rules="[(val) => !!val || 'Código é obrigatório']"
              ></q-select>
            </div>

            <div class="col-md col-xs-12">
              <q-select
                outlined
                label="Classe"
                v-model="classeSelect"
                :options="classeOptions"
                @update:model-value="buscarSubClasse(classeSelect)"
                option-value="id"
                option-label="nome"
                map-options
                emit-value
                use-chips
                multiple
                dense
                :rules="[(val) => !!val || 'Código é obrigatório']"
              ></q-select>
            </div>

            <div class="col-md col-xs-12">
              <q-select
                outlined
                label="Sub classe"
                v-model="subClasseSelect"
                :options="subClasseOptions"
                option-value="id"
                option-label="nome"
                map-options
                emit-value
                use-chips
                multiple
                dense
                :rules="[(val) => !!val || 'Código é obrigatório']"
              ></q-select>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <!-- TABELA -->
    <div class="row q-mt-lg">
      <q-table
        class="col-md-12 col-xs-12"
        title="Lista de recursos"
        title-class="text-h5 text-primary text-bold"
        :rows="linhas"
        :columns="colunas"
        :filter="filter"
        row-key="codigo"
        v-model:pagination="pagination"
        ><template v-slot:top-right>
          <div class="row q-gutter-sm">
            <div class="col-md col-xs">
              <q-input
                outlined
                dense
                debounce="300"
                v-model="filter"
                placeholder="Procurar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <div class="col-md col-xs">
              <q-btn
                color="secondary"
                icon-right="archive"
                label="Exportar"
                no-caps
                @click="exportarTabelaTodosUsuarios()"
              />
            </div>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="key"
                @click="copiarChave(props.row.id || '')"
              >
              </q-btn>
            </q-td>

            <q-td key="codigo" :props="props">
              {{ props.row.codigo }}
            </q-td>

            <q-td key="nome" :props="props">
              {{ props.row.nome }}
            </q-td>

            <q-td key="descricao" :props="props">
              {{ props.row.descricao }}
            </q-td>

            <q-td key="tipo" :props="props">
              {{ props.row.tipo }}
            </q-td>

            <q-td key="tags" :props="props">
              {{
                Array.isArray(props.row.tags)
                  ? props.row.tags.join(', ')
                  : 'Sem tags'
              }}
            </q-td>
            <q-td key="acoes" :props="props">
              <q-btn
                round
                color="primary"
                icon="edit_note"
                @click="editarRecurso(props.row)"
              >
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Recurso } from 'src/models/Recurso';
import { Cliente } from 'src/models/Cliente';
import { Classe } from 'src/models/Classe';
import { MsgCopia } from 'src/util/useMsg';
import { exportarTabela } from 'src/util/auxiliar';
import recursoServices from 'src/services/RecursoService';
import auxiliarServices from 'src/services/AuxiliarService';

const novo_recursov = ref<boolean>(false);
const recursov = ref<boolean>(false);
const codigoRecurso = ref<string>('');

const classeSelect = ref(null);
const subClasseSelect = ref<string>('');

const filter = ref<string>('');
const linhas = ref<Cliente[]>([]);
const tagsOptions = ref<string[]>([]);
const classeOptions = ref<Classe[]>([]);
const subClasseOptions = ref<Classe[]>([]);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 15,
});

const recurso = ref<Recurso>({
  id: '',
  codigo: '',
  nome: '',
  descricao: '',
  tipo: '',
  foto: '',
  datado: '',
  classe_id: '',
  tags: [],
});

const colunas = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    sortable: true,
  },
  {
    name: 'codigo',
    label: 'Codigo',
    field: 'codigo',
    align: 'left',
    sortable: true,
  },
  {
    name: 'nome',
    label: 'Nome',
    field: 'nome',
    align: 'left',
    sortable: true,
  },
  {
    name: 'descricao',
    label: 'Descrição',
    field: 'descricao',
    align: 'left',
    sortable: true,
  },
  {
    name: 'tipo',
    label: 'Tipo',
    field: 'tipo',
    align: 'left',
    sortable: true,
  },

  {
    name: 'tags',
    label: 'Tags',
    field: 'tags',
    align: 'left',
    sortable: true,
  },
  {
    name: 'acoes',
    label: 'Ações',
    field: 'acoes',
    align: 'center',
  },
];

const {
  buscarRecursoPorCodigo,
  buscarTodosRecursos,
  buscarRecursoPorID,
  atualizarRecurso,
  salvarRecurso,
} = recursoServices();

const { buscarClasses, buscarPorMae, buscarTags } = auxiliarServices();

onMounted(async () => {
  await buscarTagsTodas();
  await buscarClasse();
  await buscarRecursoTodos();
});

// BUSCAR //
const buscarTagsTodas = async () => {
  const lista = await buscarTags();

  if (lista) {
    tagsOptions.value.push(...lista.listaTags);
  }
};
const buscarClasse = async () => {
  const lista = await buscarClasses();

  if (lista) {
    classeOptions.value = lista;
  }
};
const buscarSubClasse = async (id: string) => {
  const lista = await buscarPorMae(id);
  if (lista) {
    subClasseSelect.value = lista;
  }
};
const buscar = async () => {
  if (codigoRecurso.value.length === 36) {
    await buscarRecPorID();
  } else {
    await buscarRecPorCodigo();
  }

  novo_recursov.value = true;
  recursov.value = true;
};
const buscarRecursoTodos = async () => {
  const lista = await buscarTodosRecursos();

  if (lista) {
    linhas.value.push(...lista);
  }
};
const buscarRecPorCodigo = async () => {
  const result = await buscarRecursoPorCodigo(codigoRecurso.value);

  if (result) {
    mapeamentoRecurso(result);
  }
};
const buscarRecPorID = async () => {
  const result = await buscarRecursoPorID(codigoRecurso.value);
  if (result) {
    mapeamentoRecurso(result);
  }
};

// SALVAR //
const salvar = async () => {
  console.log(subClasseSelect.value);
  recurso.value.classe_id = subClasseSelect.value[0].id;

  if (!recurso.value.id) {
    await salvarRec();
  } else {
    await atualizarRec();
    console.log('aqui');
  }

  await buscarTagsTodas();
};
const salvarRec = async () => {
  console.log(recurso.value);
  const result = await salvarRecurso(recurso.value);

  if (result) {
    limparAll();

    mapeamentoRecurso(result);
  }
};

// ATUALIZAR //
const atualizarRec = async () => {
  console.log(recurso.value);
  const result = await atualizarRecurso(recurso.value);
  if (result) {
    console.log(result);
    limparAll();

    mapeamentoRecurso(result);
  }
};

// MAPEAMENTOS //
// eslint-disable-next-line @typescript-eslint/no-empty-function
const mapeamentoRecurso = (rec: any) => {
  recurso.value.id = rec.id;
  recurso.value.codigo = rec.codigo;
  recurso.value.nome = rec.nome;
  recurso.value.descricao = rec.descricao;
  recurso.value.tipo = rec.tipo;
  recurso.value.foto = rec.foto;
  recurso.value.datado = rec.datado;
  recurso.value.classe_id = rec.classe_id;
  recurso.value.tags = rec.tags;

  subClasseSelect.value = rec.classe_id;
};

const editarRecurso = async (linha: any) => {
  codigoRecurso.value = linha.codigo;
  limparAll();
  await buscar();
};

// OUTROS /
const exportarTabelaTodosUsuarios = () => {
  exportarTabela(linhas.value, colunas);
};
const limparAll = () => {
  classeSelect.value = null;
  subClasseSelect.value = '';

  recurso.value = {
    id: '',
    codigo: '',
    nome: '',
    descricao: '',
    tipo: '',
    foto: '',
    datado: '',
    classe_id: '',
    tags: [],
  };
};
const novoRecurso = () => {
  limparAll();
  novo_recursov.value = true;
};
const copiarChave = (id: string) => {
  MsgCopia(id);
};
</script>
