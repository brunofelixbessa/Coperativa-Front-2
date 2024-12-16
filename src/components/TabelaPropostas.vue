<template>
  <div class="q-pa-md">
    <q-table
      :rows="propostas"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template v-slot:body-cell-previsao="props">
        <q-td :props="props">
          {{ formatDate(props.row.previsao) }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  propostas: Array,
});

const columns = [
  {
    name: 'cpf_solicitante',
    required: true,
    label: 'CPF do Solicitante',
    align: 'left',
    field: (row) => row.cpf_solicitante,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'cnpj_solicitante',
    align: 'left',
    label: 'CNPJ do Solicitante',
    field: (row) => row.cnpj_solicitante,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'endereco_id',
    align: 'left',
    label: 'ID do Endereço',
    field: (row) => row.endereco_id,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'valor',
    align: 'left',
    label: 'Valor',
    field: (row) => row.valor,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'status',
    align: 'left',
    label: 'Status',
    field: (row) => row.status,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'previsao',
    align: 'left',
    label: 'Previsão',
    field: (row) => row.previsao,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'descricao',
    align: 'left',
    label: 'Descrição',
    field: (row) => row.descricao,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'observacao',
    align: 'left',
    label: 'Observação',
    field: (row) => row.observacao,
    format: (val) => val,
    sortable: true,
  },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};
</script>
