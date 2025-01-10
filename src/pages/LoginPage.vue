<template>
  <fundo-animado> </fundo-animado>
  <div class="pagina">
    <q-card class="login q-pa-md">
      <q-form class="q-gutter-y-sm">
        <div class="text-center text-h6">Acesso restrito v1.2</div>
        <q-input
          dense
          v-if="cadastrando"
          v-model="form.nome"
          label="Nome"
          outlined
        />
        <q-input
          dense
          v-if="cadastrando"
          v-model="form.cpf"
          label="CPF"
          outlined
          mask="###.###.###-##"
        />
        <q-input
          dense
          outlined
          v-model="form.email"
          label="Email"
          type="email"
        />

        <!-- <q-input
          dense
          outlined
          v-model="form.email"
          label="Email"
          :error="emailErro"
          :error-message="loginErroMensagem"
        /> -->

        <q-input
          dense
          v-if="cadastrando"
          v-model="form.celular"
          label="Celular"
          outlined
          type="tel"
          mask="(##) #####-####"
        />

        <q-input
          dense
          v-model="form.senha"
          label="Senha"
          outlined
          :type="isPwd ? 'password' : 'text'"
          :error="senhaErro"
          :error-message="senhaErroMensagem"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            /> </template
        ></q-input>
        <q-btn
          v-if="!cadastrando"
          no-caps
          class="full-width"
          color="secondary"
          label="Entrar"
          @click="loginEmailSenha()"
        />
        <q-btn
          v-else
          no-caps
          class="full-width"
          color="secondary"
          label="Cadastrar"
          @click="criarCadastro()"
        />
        <q-btn
          v-if="!cadastrando"
          outline
          no-caps
          class="full-width"
          color="negative"
          label="Google"
          @click="loginGoogle()"
        />
        <q-space />
        <q-btn
          v-if="!cadastrando"
          outline
          no-caps
          class="full-width"
          color="primary"
          label="Não tenho conta"
          @click="cadastrando = !cadastrando"
        />
        <q-btn
          v-else
          outline
          no-caps
          class="full-width"
          color="primary"
          label="Cancelar"
          @click="cadastrando = !cadastrando"
        />
        <q-btn
          v-if="!cadastrando"
          flat
          no-caps
          class="full-width"
          color="primary"
          label="Esqueci a senha"
          @click="esqueciSenha()"
        />
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from 'stores/auth';
import { useRouter } from 'vue-router';
import FundoAnimado from 'src/components/FundoAnimado.vue';
import usuarioService from 'src/services/UsuarioService';

const router = useRouter();
const storeAuth = useAuth();
const isPwd = ref(true);
const form = ref({
  nome: '',
  email: '',
  senha: '',
  celular: '',
  cpf: '',
});

const emailErro = ref(false);
const emailErroMensagem = ref('');
const senhaErro = ref(false);
const senhaErroMensagem = ref('');

const paginaRequerente = router.currentRoute.value.query.to || '/';
const cadastrando = ref(false);

const { cadastrarUsuarioBasico } = usuarioService();

/**
 * Redireciona o usuário autenticado para a página requisitada.
 */
onMounted(() => {
  if (storeAuth.isAuthenticated) {
    router.push(paginaRequerente);
  }
});

/**
 * Autentica o usuário com email e senha.
 * @param {string} email - O email do usuário.
 * @param {string} senha - A senha do usuário.
 * @returns {boolean} - Retorna true se a autenticação for bem-sucedida, caso contrário, false.
 */
const loginEmailSenha = async () => {
  try {
    if (!form.value.email || !form.value.senha) return;

    const autenticado = await storeAuth.loginGoogleEmailSenha(
      form.value.email,
      form.value.senha
    );
    if (autenticado) {
      router.push({ name: 'home' });
    }
  } catch (error) {
    console.error('Erro ao realizar login com email e senha', error);
  }
};

/**
 * Realiza o login com o Google.
 * Obtém o token do Google e valida na API.
 */
const loginGoogle = async () => {
  try {
    const autenticado = await storeAuth.loginGooglePopUp();
    if (autenticado) {
      router.push({ name: 'home' });
    }
  } catch (error) {
    console.error('Erro ao realizar login com o Google', error);
  }
};

/**
 * Cria um novo cadastro de usuário.
 * Redireciona para a página requisitada após o cadastro.
 */
const criarCadastro = async () => {
  await cadastrarUsuarioBasico(form.value);
  //router.push(paginaRequerente);
};

/**
 * Reseta os estados de erro.
 */
const resetarErros = () => {
  emailErro.value = false;
  emailErroMensagem.value = '';
  senhaErro.value = false;
  senhaErroMensagem.value = '';
};

/**
 * Redireciona para a página de recuperação de senha.
 */
const esqueciSenha = () => {
  router.push('/esqueci-senha');
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
.login {
  min-width: 350px;
}
</style>
