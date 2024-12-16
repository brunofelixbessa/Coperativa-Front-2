<template>
  <q-page class="login-page">
    <div class="login-card">
      <q-card>
        <q-card-section>
          <div class="text-h5 text-center">Login</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">
            <q-input
              v-model="email"
              label="Email"
              type="email"
              outlined
              dense
              :rules="[(val) => !!val || 'O e-mail é obrigatório']"
              prepend-icon="mail"
            />

            <q-input
              v-model="password"
              label="Senha"
              type="password"
              outlined
              dense
              :rules="[(val) => !!val || 'A senha é obrigatória']"
              prepend-icon="lock"
              class="q-mt-md"
            />

            <q-btn
              label="Entrar"
              color="orange"
              class="q-mt-lg"
              type="submit"
              icon="login"
              unelevated
              block
            />

            <q-btn
              label="Entrar com Google"
              color="orange"
              class="q-mt-md"
              icon="login"
              unelevated
              block
            />

            <q-btn
              label="Esqueci a Senha"
              color="orange"
              flat
              class="q-mt-md text-right"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const onSubmit = () => {
  // Lógica de autenticação
  console.log('Email:', email.value);
  console.log('Senha:', password.value);
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e0e0, #f5f5f5);
}

.login-card {
  width: 350px;
}

.q-card {
  background-color: #808080; /* Cor cinza para o card */
}

.q-btn.orange {
  background-color: #ff8c00; /* Laranja */
  color: white;
}

.q-btn.orange.flat {
  color: #ff8c00;
}

.q-input input {
  color: #333;
}

.text-right {
  text-align: right;
}
</style>
