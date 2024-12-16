<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm q-mt-xs">
      <div class="col-md-3 col-xs-7">
        <q-input outlined label="Código" v-model="codigo">
          <template v-slot:prepend>
            <q-btn
              flat
              color="primary"
              icon="delete"
              @click="limparVariaveis"
            />
          </template>
          <teplate class="self-center">
            <q-btn
              flat
              round
              dense
              color="negative"
              icon="search"
              @click="buscarProdutoPorCodigo()"
            />
          </teplate>
        </q-input>
      </div>
      <div class="col self-center">
        <q-btn-group spread>
          <q-btn
            size="lg"
            text-color="white"
            color="black"
            icon="mdi-barcode-scan"
          />
          <q-btn color="grey" icon="remove" @click="diminuir()" />
          <q-btn color="secondary" icon="add" @click="adicionar()" />
        </q-btn-group>
      </div>
    </div>

    <!--

      @click="iniciarCamera()"

      <div class="janela-leitor" v-show="cameraStatus">
        <q-btn
          square
          size="lg"
          class="full-width"
          color="secondary"
          label="Fechar câmera"
          @click="pararCamera"
        ></q-btn>
        <div class="leitor" id="leitor">
          <video src=""></video>
        </div>
      </div> -->

    <div
      class="row q-mt-sm"
      style="height: calc(91vh - 200px); overflow-y: auto"
    >
      <div class="col">
        <q-list separator bordered class="bg-white">
          <q-item
            v-for="(item, index) in linhas.slice().reverse()"
            :key="item.codigo"
            clickable
            v-ripple
            class="text-center"
          >
            <span style="display: none">{{ index }}</span>

            <q-item-section avatar>
              <q-dialog v-model="zoom"><q-img></q-img></q-dialog>
              <q-img @click="zoom = true"></q-img>
            </q-item-section>

            <q-item-section @click="abrirPopUp(item.codigo)">
              <q-item-label
                ><strong>{{ item.codigo }}</strong></q-item-label
              >
              <q-item-label>{{ item.produto }}</q-item-label>
            </q-item-section>

            <q-item-section @click="abrirPopUp(item.codigo)">
              <q-item-label>Qtd</q-item-label>
              <q-item-label>{{ item.quantidade }}</q-item-label>
            </q-item-section>

            <q-item-section @click="abrirPopUp(item.codigo)">
              <q-item-label>VU</q-item-label>
              <q-item-label>{{ item.valor }}</q-item-label>
            </q-item-section>

            <q-item-section @click="abrirPopUp(item.codigo)">
              <q-item-label>VT</q-item-label>
              <q-item-label>{{ item.vt }}</q-item-label>
            </q-item-section>

            <q-item-section @click="abrirPopUp(item.codigo)">
              <q-item-label>AT</q-item-label>
              <q-item-label>{{ item.atendente }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <q-dialog v-model="opcoes" persistent>
      <q-card
        ><q-card-actions class="text-primary">
          <q-btn
            stack
            no-caps
            size="lg"
            icon="delete"
            label="Excluir"
            color="primary"
            @click="excluirLinha()"
          />
          <q-btn
            stack
            no-caps
            outline
            size="lg"
            icon="arrow_forward"
            label="Voltar"
            v-close-popup
          /> </q-card-actions></q-card
    ></q-dialog>

    <div class="row bg-grey-4 fixed-bottom">
      <div class="col">
        <div class="row text-center text-subtitle1 q-ma-sm">
          <div class="col-3">
            <span
              >Linha: <strong>{{ total.linhas }}</strong></span
            >
          </div>
          <div class="col-3">
            <span
              >Produto: <strong>{{ total.quantidade }}</strong></span
            >
          </div>
          <!-- <div class="col-6">
              <span
                >Valor Total:
                <strong>{{ MoedaBR(total.valorTotal) }}</strong></span
              >
            </div> -->
        </div>
        <div class="row">
          <div class="col-md col-xs">
            <q-btn
              stack
              square
              no-caps
              class="full-width"
              color="primary"
              icon="refresh"
              label="Novo"
              @click="limarAll()"
            />
          </div>
          <div class="col-md col-xs">
            <q-btn
              stack
              square
              no-caps
              class="full-width"
              color="positive"
              icon="send"
              label="Enviar"
              to="/informacao-cliente"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import Quagga from '@ericblade/quagga2';
import { MoedaBR } from 'src/util/auxiliar';

const codigo = ref('');

const zoom = ref(false);
const opcoes = ref(false);
const cameraStatus = ref(false);
const codigoRepetido = ref(false);

let informacoesCodigo = ref({
  codigo: '',
  produto: '',
  quantidade: 0,
  valor: 0,
  vt: 0,
  atendente: 0,
});
const linhas = ref([]);
const valorCodigo = ref('');

const total = ref({
  linhas: 0,
  valorTotal: 0,
  quantidade: 0,
});

// onMounted(async () => {
//   calcularTotal();
// });

// BUSCAR //
const buscarProdutoPorCodigo = async () => {
  // if (codigo.value !== '') {
  // const cod = parseInt(codigo.value);
  // if (result) {
  //   mapeamentoProduto(result);
  //   verificacao();
  // }

  mapeamentoProduto('00001');

  // } else {
  //console.log("Código não definido");
  // }
};

// MAPEAMENTO //
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapeamentoProduto = (info: string) => {
  // informacoesCodigo.value = {
  //   codigo: info.codigo,
  //   produto: info.produto,
  //   quantidade: 1,
  //   valor: info.valor,
  //   vt: info.valor,
  //   atendente: 0,
  // };

  informacoesCodigo.value = {
    codigo: info,
    produto: 'info.produto',
    quantidade: 1,
    valor: 10,
    vt: 10,
    atendente: 0,
  };
};

// ADICIONAR OU REMOVER //
const adicionar = () => {
  if (informacoesCodigo.value.codigo !== '') {
    linhas.value.forEach((info) => {
      if (info.codigo === informacoesCodigo.value.codigo) {
        codigoRepetido.value = true;
        info.quantidade += 1;
        info.vt += informacoesCodigo.value.valor;
      }
    });

    calcularTotal();
  } else {
    //console.log("Nenhuma informação de produto disponível");
  }
};
const diminuir = () => {
  if (informacoesCodigo.value.codigo !== '') {
    linhas.value.forEach((info) => {
      if (info.codigo === informacoesCodigo.value.codigo) {
        info.quantidade -= 1;
        info.vt -= informacoesCodigo.value.valor;
      }
    });

    // Remove os produtos que têm quantidade zero da tabela
    linhas.value = linhas.value.filter((info) => info.quantidade > 0);

    calcularTotal();
  }
};
const excluirLinha = () => {
  linhas.value = linhas.value.filter(
    (item) => item.codigo !== valorCodigo.value
  );

  opcoes.value = false;
};

// VERIFICAÇÃO //
const verificacao = () => {
  if (informacoesCodigo.value.codigo !== '') {
    linhas.value.forEach((info) => {
      if (info.codigo === informacoesCodigo.value.codigo) {
        codigoRepetido.value = true;
        info.quantidade += 1;
        info.vt += informacoesCodigo.value.valor;
      }
    });

    if (!codigoRepetido.value) {
      const novoProduto = {
        codigo: informacoesCodigo.value.codigo,
        produto: informacoesCodigo.value.produto,
        quantidade: 1,
        valor: informacoesCodigo.value.valor,
        vt: informacoesCodigo.value.valor,
        atendente: 0,
      };

      linhas.value.push(novoProduto);
    }
  }

  calcularTotal();
};

// CALCULOS //
const calcularTotal = () => {
  total.value.linhas = 0;
  total.value.valorTotal = 0;
  total.value.quantidade = 0;

  linhas.value.forEach((linha) => {
    total.value.linhas++;
    total.value.valorTotal += linha.vt;
    total.value.quantidade += linha.quantidade;
  });
};

// OUTROS //
const limarAll = () => {
  codigo.value = '';
  linhas.value = [];
  codigoRepetido.value = false;
  total.value = { linhas: 0, valorTotal: 0, quantidade: 0 };
};
const limparVariaveis = () => {
  codigo.value = '';
  codigoRepetido.value = false;

  informacoesCodigo.value = {
    codigo: '',
    produto: '',
    quantidade: 0,
    valor: 0,
    vt: 0,
    atendente: 0,
  };
};
const abrirPopUp = (codigo: string) => {
  valorCodigo.value = codigo;
  opcoes.value = true;
};

// CAMERA //
// const iniciarCamera = () => {
//   cameraStatus.value = true;
//   const targetElement = document.querySelector('#leitor');

//   if (targetElement !== null) {
//     Quagga.init(
//       {
//         inputStream: {
//           name: 'Live',
//           type: 'LiveStream',
//           constraints: {},
//           target: targetElement,
//         },
//         decoder: {
//           readers: ['ean_reader'],
//         },
//       },
//       function (err) {
//         if (err) {
//           //console.log(err);
//           return;
//         }
//         //console.log("Initialization finished. Ready to start");
//         Quagga.start();
//         Quagga.onDetected((data) => {
//           detectar(data);
//         });
//       }
//     );
//   } else {
//     // Lidere com o caso em que nenhum elemento correspondente foi encontrado
//     console.error("Elemento com ID 'leitor' não encontrado.");
//   }
// };
// const pararCamera = () => {
//   Quagga.stop();
//   cameraStatus.value = false;
// };
// const detectar = (data) => {
//   //console.log(data.codeResult.code);
//   codigo.value = data.codeResult.code;
//   pararCamera();
// };
</script>

<style scoped>
.janela-leitor {
  position: fixed;
  top: 170px;
  left: 0;
  width: 100%;
  height: 203px;
  display: flex;
  flex-direction: column;
  z-index: 999;
}
.leitor {
  max-width: 100%; /* Evita que ultrapasse a largura do contêiner */
  max-height: 100%; /* Evita que ultrapasse a altura do contêiner */
  width: auto; /* Ou um valor específico até 'max-width' */
  height: auto; /* Ou um valor específico até 'max-height' */
  display: flex;
  justify-content: center;
  align-items: center;
}
.leitor video {
  width: 100%;
  position: absolute;
  top: 50px;
}
</style>
