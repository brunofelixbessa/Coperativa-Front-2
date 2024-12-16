<template>
  <fundo-animado> </fundo-animado>
  <div class="pagina">
    <q-card class="q-pa-md">
      <q-form class="q-gutter-y-sm">
        <div class="text-center text-h6">{{ titulo }}</div>

        <!-- Etapa 1: Esqueci a Senha -->
        <div v-if="etapa === 1">
          <q-input dense outlined v-model="email" label="Email" />
          <q-btn
            no-caps
            class="full-width q-mt-md"
            color="primary"
            label="Enviar"
            @click="enviarEmailRecuperacao"
          />
        </div>

        <!-- Etapa 2: Confirmação de PIN -->
        <div v-if="etapa === 2">
          <q-input dense outlined v-model="pin" label="PIN" />
          <q-btn
            no-caps
            class="full-width"
            color="primary"
            label="Confirmar"
            @click="confirmarPin"
          />
        </div>

        <!-- Etapa 3: Nova Senha -->
        <div v-if="etapa === 3">
          <q-input
            dense
            outlined
            v-model="novaSenha"
            label="Nova Senha"
            type="password"
          />
          <q-input
            dense
            outlined
            v-model="confirmarSenha"
            label="Confirmar Senha"
            type="password"
          />
          <q-btn
            no-caps
            class="full-width"
            color="primary"
            label="Alterar Senha"
            @click="alterarSenha"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from 'stores/auth';
import { useRouter, useRoute } from 'vue-router';
import FundoAnimado from 'src/components/FundoAnimado.vue';

// Referência ao estado de autenticação
const storeAuth = useAuth();
// Referência ao roteador
const router = useRouter();
// Referência à rota atual
const route = useRoute();

// Referências reativas para os campos de email, PIN e senhas
const email = ref('');
const pin = ref('');
const novaSenha = ref('');
const confirmarSenha = ref('');

// Estado da etapa atual do fluxo de recuperação de senha
const etapa = ref(1);

// Título da etapa atual
const titulo = ref('Esqueci a Senha');

/**
 * Envia um email de recuperação de senha.
 * Após o envio, avança para a etapa de confirmação de PIN.
 */
const enviarEmailRecuperacao = async () => {
  if (!email.value) {
    // Notifica o usuário que o campo de email está vazio
    alert('Por favor, insira um email válido.');
    return;
  }
  await enviarEmailRecuperacao(email.value);
  etapa.value = 2;
  titulo.value = 'Confirmação de PIN';
};

/**
 * Confirma o PIN enviado para o email.
 * Se o PIN for válido, avança para a etapa de redefinição de senha.
 */
const confirmarPin = async () => {
  const isValid = await confirmarPin(email.value, pin.value);
  if (isValid) {
    etapa.value = 3;
    titulo.value = 'Nova Senha';
  } else {
    // Notifica o usuário sobre o PIN inválido
  }
};

/**
 * Redefine a senha do usuário.
 * Se a senha for redefinida com sucesso, redireciona para a página de login.
 */
const alterarSenha = async () => {
  if (novaSenha.value === confirmarSenha.value) {
    await alterarSenha(email.value, novaSenha.value);
    router.push({ name: 'login-page' });
  } else {
    // Notifica o usuário sobre a discrepância nas senhas
  }
};
</script>

<style scoped>
.pagina {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: calc(100vh - 60px);
  z-index: 2;
}
.q-pa-md {
  min-width: 350px;
}
</style>
