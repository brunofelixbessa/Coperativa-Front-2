<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col-md-3 col-xs-3">
        <q-select
          label="Classe"
          outlined
          use-input
          v-model="classeSelect"
          :options="classeOptions"
          @update:model-value="buscarSubClasseTodas()"
          option-value="id"
          option-label="nome"
          map-options
          emit-value
        ></q-select>
      </div>
      <div class="col-md-1 col-xs-1 q-mr-md">
        <q-btn round icon="add" color="primary"></q-btn>
      </div>
      <div class="col-md-3 col-xs-3">
        <q-select
          label="Sub classe"
          outlined
          use-input
          v-model="subClasseSelect"
          :options="subClasseOptions"
          option-value="id"
          option-label="nome"
          map-options
          emit-value
        ></q-select>
      </div>
      <div class="col-md-1 col-xs-1 q-mr-md">
        <q-btn round icon="add" color="primary"></q-btn>
      </div>
      <div class="col-md-3 col-xs-3">
        <q-select
          label="Tag"
          outlined
          use-input
          v-model="tagSelect"
          :options="tagOptions"
          option-value="id"
          option-label="nome"
          map-options
          emit-value
        ></q-select>
      </div>
      <div class="col-md col-xs">
        <q-btn round icon="add" color="primary"></q-btn>
      </div>
    </div>

    <div class="row q-mt-lg q-col-gutter-x-sm">
      <!-- TABELA CLASSE -->
      <div class="col-md-4 col-xs-4 q-pa-sm">
        <q-table
          title="Lista de classes"
          title-class="text-h5 text-primary text-bold"
          :rows="linhasClasse"
          :columns="colunasClasse"
          :filter="filter"
          row-key="id"
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

              <q-td key="nome" :props="props">
                {{ props.row.nome }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <!-- TABELA SUB CLASSE -->
      <div class="col-md-4 col-xs-4 q-pa-sm">
        <q-table
          title="Lista de sub classes"
          title-class="text-h5 text-primary text-bold"
          :rows="linhasSubClasse"
          :columns="colunasSubClasse"
          :filter="filter"
          row-key="id"
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

              <q-td key="nome" :props="props">
                {{ props.row.nome }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <!-- TABELA TAG-->
      <div class="col-md-4 col-xs-4 q-pa-sm">
        <q-table
          title="Lista de tags"
          title-class="text-h5 text-primary text-bold"
          :rows="linhasTag"
          :columns="colunasTag"
          :filter="filter"
          row-key="id"
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
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MsgCopia } from 'src/util/useMsg';
import { exportarTabela } from 'src/util/auxiliar';
import auxiliarServices from 'src/services/AuxiliarService';

const tagOptions = ref([]);
const classeOptions = ref([]);
const subClasseOptions = ref([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const linhasTag = ref<any[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const linhasClasse = ref<any[]>([]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const linhasSubClasse = ref<any[]>([]);

const filter = ref<string>('');

const tagSelect = ref(null);
const classeSelect = ref<string>('');
const subClasseSelect = ref(null);

const colunasClasse = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'nome',
    label: 'Nome',
    field: 'nome',
    align: 'center',
    sortable: true,
  },
];

const colunasSubClasse = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'center',
    sortable: true,
  },
];

const colunasTag = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Tag',
    field: 'name',
    align: 'center',
    sortable: true,
  },
];

const { buscarTags, buscarPorMae, buscarClasses, buscarParametros } =
  auxiliarServices();

onMounted(async () => {
  await buscarListas();
});

// BUSCAR //
const buscarListas = async () => {
  await buscarTagsTodas();
  await buscarClasseTodas();
};
const buscarTagsTodas = async () => {
  const result = await buscarTags();

  console.log(result);
  if (result) {
    tagOptions.value = result.listaTags;
    mapeamentoTabela(result.listaTags, 'tag');
  }
};
const buscarClasseTodas = async () => {
  const result = await buscarClasses();

  if (result) {
    classeOptions.value = result;
    mapeamentoTabela(result, 'classe');
  }
};
const buscarSubClasseTodas = async () => {
  const result = await buscarPorMae(classeSelect.value);
  console.log(result);
  if (result) {
    subClasseOptions.value = result;
    mapeamentoTabela(result, 'subclasse');
  }
};

// MAPEAMENTOS //
const mapeamentoTabela = (lista: any, status: string) => {
  const tabelaFormatada: any[] = [];

  if (status === 'tag') {
    lista.forEach((tag: number, index: string) => {
      tabelaFormatada.push({
        id: index + 1,
        name: tag,
      });
    });

    linhasTag.value = tabelaFormatada;
  }

  if (status === 'classe') {
    lista.forEach((list: any) => {
      let itenslist = {
        id: list.id,
        nome: list.nome,
      };

      linhasClasse.value.push(itenslist);
    });
  }

  if (status === 'subclasse') {
    lista.forEach((list: any) => {
      let itenslist = {
        id: list.id,
        nome: list.nome,
      };

      linhasSubClasse.value.push(itenslist);
    });
  }
};

// OUTROS //
const exportarTabelaTodosUsuarios = () => {
  exportarTabela(linhasTag.value, colunasTag);
};
const copiarChave = (id: string) => {
  MsgCopia(id);
};
</script>
