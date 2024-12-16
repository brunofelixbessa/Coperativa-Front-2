<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div
        class="col-md-4 col-xs-12"
        v-for="(linha, index) in linhas"
        :key="index"
      >
        <q-card class="bg-grey-4" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-btn round @click="card = true">
                <q-avatar size="42px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </q-btn>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ linha.nome }}</q-item-label>
              <div class="row no-wrap">
                <q-item-label caption> Empresa Forte </q-item-label>
                <q-icon name="verified" color="primary" class="q-ml-xs" />
              </div>
            </q-item-section>
          </q-item>

          <q-separator />

          <div class="row">
            <div class="col-7 q-pa-md">
              {{ lorem }}
            </div>
            <div class="col">
              <q-list dense>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="keyboard_double_arrow_right" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Sinalização horizontal</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="keyboard_arrow_right" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Pintura fria</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="handshake" />
                  </q-item-section>
                  <q-item-section
                    ><q-item-label caption
                      >121 interessados</q-item-label
                    ></q-item-section
                  >
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="history" />
                  </q-item-section>
                  <q-item-section
                    ><q-item-label caption
                      >Finaliza em 52 dias</q-item-label
                    ></q-item-section
                  >
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="paid" />
                  </q-item-section>
                  <q-item-section
                    ><q-item-label caption>
                      Média 100.000,00</q-item-label
                    ></q-item-section
                  >
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="grey-8" name="share" />
                  </q-item-section>
                  <q-item-section
                    ><q-item-label caption
                      >Compartilhar</q-item-label
                    ></q-item-section
                  >
                </q-item>
              </q-list>
            </div>
          </div>

          <q-separator />

          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="row no-wrap items-center">
                  <q-rating
                    size="18px"
                    v-model="stars"
                    :max="5"
                    color="accent"
                  />
                  <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
                </div>
                <div class="row text-subtitle2 text-grey-8">
                  {{ linha.cidade }} - {{ linha.uf }}
                </div>
              </div>
              <div class="col">
                <q-btn no-caps class="full-width" color="secondary">
                  Aceitar o trabalho
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-dialog v-model="card">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">Cafe Basilico</div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  <q-icon name="place" />
                  250 ft
                </div>
              </div>

              <q-rating v-model="stars" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">$・Italian, Cafe</div>
              <div class="text-caption text-grey">
                Small plates, salads & sandwiches in an intimate setting.
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Reserve" />
              <q-btn v-close-popup flat color="primary" round icon="event" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ObraModel } from 'src/models/Obra';
import firestoreService from 'src/services/FireStoreService';

const { buscarObras } = firestoreService();

const linhas = ref<ObraModel[]>([]);

const stars = ref(4);
const card = ref(false);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

onMounted(() => {
  buscarObrasAbertas();
});

async function buscarObrasAbertas() {
  linhas.value = await buscarObras('aberto');
}
</script>

<style scoped>
.card-obra {
  width: 100%;
  max-width: 350px;
}

.q-item__section--avatar {
  min-width: 0px;
}
.q-list--dense > .q-item,
.q-item--dense {
  padding: 2px 6px;
}
</style>
