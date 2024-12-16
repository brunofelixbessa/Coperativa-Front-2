import { UsuarioModel } from './../models/Usuario';

import { defineStore } from 'pinia';
import { MsgOcupado, MsgErro, MsgAtencao, MsgSucesso } from 'src/util/useMsg';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
//
import { auth, provider } from 'boot/firebase';
//
import firestoreService from 'src/services/FireStoreService';
import usuarioService from 'src/services/UsuarioService';
import { apiSinaliza } from 'src/boot/axios';
import { data } from 'autoprefixer';

const { buscarUsuario, salvarUsuario } = firestoreService();
const { validarTokenNaAPI, buscarGenerica } = usuarioService();
export const useAuth = defineStore('useAuthStore', {
  state: () => ({
    usuario: <UsuarioModel>{
      Uid: '',
      Email: '',
      Email_Verificado: false,
      Nome: '',
      Foto: '',
      MarcaId: '',
      Ativo: false,
      Admin: false,
      Pagamento: null,
      Grupos: ['cliente'],
      Tags: [],
      Criacao: new Date(),
      Celular: '',
      Celular_Verificado: false,
      Cpf: '',
      Atualizado: new Date(),
      Datado: new Date(),
      Id: '',
      Login: '',
      Senha: '',
      Usuario_Cadastrador: '',
    },
    isAuthenticated: false,
    primeiroAcesso: true,
  }),
  getters: {
    //
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async loginEmail(email: string, senha: string) {
      MsgOcupado(true); // Loading
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          senha
        );
        // Signed in
        this.isAuthenticated = true;
        await this.buscarUsuarioNoFirestore();
        MsgSucesso('Logado com sucesso');
      } catch (error) {
        const err = error as { code: string };
        if (err.code === 'auth/invalid-email')
          MsgErro('E-mail ou senha inválidos 1.');
        else MsgErro('E-mail ou senha inválidos 2.');
      } finally {
        MsgOcupado(false);
      }
    },

    // Cadastra usuario no Firebase atenticated - revisado 08-08-24
    async cadastrarUsuario(form: any) {
      MsgOcupado(true);
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        // Cadastra e já loga
        if (result) {
          // Ja guarda dados do form
          this.usuario.Nome = form.nome;
          this.usuario.Celular = form.celular;

          if (await this.SalvaUsuarioFireStore(result.user))
            MsgSucesso('Logado com sucesso');
          else MsgErro('Erro ao salvar usuario informar ao setor resposavel.');
        }
      } catch (error) {
        const err = error as { code: string };
        switch (err.code) {
          case 'auth/email-already-in-use':
            MsgAtencao('Email já está cadastrado.');
            break;
          case 'auth/invalid-email':
            MsgAtencao('Invalid email');
            break;
          case 'auth/operation-not-allowed':
            MsgAtencao('Operation not allowed');
            break;
          case 'auth/weak-password':
            MsgAtencao('Weak password');
            break;
          default:
            MsgErro('Erro desconhecido.');
        }
      } finally {
        MsgOcupado(false);
      }
    },
    // salvar no firestorage o usuario completo - revisado 08-08-24
    async SalvaUsuarioFireStore(usuarioCriado: any) {
      this.usuario.Uid = usuarioCriado.uid;
      this.usuario.Email = usuarioCriado.email;
      const usuarioFS = await salvarUsuario(this.usuario);
      return !!usuarioFS;
    },

    async buscarUsuarioNoFirestore() {
      const usuarioFS = await buscarUsuario(this.usuario.Uid);
      if (usuarioFS?.Ativo && usuarioFS?.Email_Verificado) {
        //
      }
    },

    verificaStatus() {
      onAuthStateChanged(auth, (userLoged) => {
        if (userLoged) {
          this.isAuthenticated = true;
          //this.hidrataUsuario(userLoged);
          //this.buscaUsuario(user);
          // const result = window.localStorage.getItem('usuario');
          // if (result) {
          //   this.usuario = JSON.parse(result); // Busca localstorage
          // }
        } else {
          //console.log('verifica Status Usuario deslogado ');
          this.removeUsuario();
        }
      });
      //console.log(this.usuario);
    },

    hidrataUsuario(userHidratado: any, idToken: string) {
      this.usuario.Uid = userHidratado.uid;
      this.usuario.Email = userHidratado.email;
      this.usuario.Nome = userHidratado.displayName || 'Nome';

      window.localStorage.setItem('usuario', JSON.stringify(this.usuario)); // TODO
      // Aqui coloca o token no header
      //console.log(idToken);
      apiSinaliza.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${idToken}`;
      //aqui vamos validar na api para buscar o novo token
      const novoToken = validarTokenNaAPI(idToken);
      return novoToken;
    },

    removeUsuario() {
      //console.log('remover');
      signOut(auth)
        .then(() => {
          //this.usuario = {()};
          this.isAuthenticated = false;
          window.localStorage.removeItem('usuario');
          //console.log('Usuario deslogado...');
        })
        .catch((error) => {
          //console.log(error.message);
        });
    },
    // google
    async loginGooglePopUp() {
      MsgOcupado(true); // Loading
      try {
        const userCredential = await signInWithPopup(auth, provider);
        //// Aqui busca o token no firebase
        const idToken = await auth.currentUser?.getIdToken();
        if (idToken) {
          this.isAuthenticated = true;
          const retorno = await this.hidrataUsuario(
            userCredential.user,
            idToken
          );

          if (retorno != null) {
            const usuarioEncontrado = await buscarGenerica(retorno.email);
            const usuarioFiltrado = usuarioEncontrado[0];
            if (usuarioEncontrado) {
              this.usuario = { ...usuarioFiltrado };
              console.log(this.usuario, 'usuario encontrado');
            }
          }
        }
        MsgSucesso('Logado com sucesso');
        return true;
      } catch (error) {
        console.log(error);
      } finally {
        MsgOcupado(false);
      }
    },

    // teste valida token
    validatokenTeste() {
      // //console.log(idToken);
      // const idToken2 =
      //   'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjNWU0MTg0M2M1ZDUyZTY4ZWY1M2UyYmVjOTgxNDNkYTE0NDkwNWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQnJ1bm8gRmVsaXgiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWJOanV6ZWpBN3pjYVJBbEo5S0hUS1N2MnJaaFFNek8weGFwcXJLWnVmdDY5ZVJlcWN4QT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9lbXByZWl0ZWlyby03YmI0ZCIsImF1ZCI6ImVtcHJlaXRlaXJvLTdiYjRkIiwiYXV0aF90aW1lIjoxNzI1NDA5MzYxLCJ1c2VyX2lkIjoiQVEwT3RoMnN0alVLcEZFaUMwcFVxUnpYZEpyMiIsInN1YiI6IkFRME90aDJzdGpVS3BGRWlDMHBVcVJ6WGRKcjIiLCJpYXQiOjE3MjU0MDkzNjEsImV4cCI6MTcyNTQxMjk2MSwiZW1haWwiOiJicnVub2ZlbGl4YmVzc2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTEyOTU2MzQ1OTIxODI4MTI1ODMiXSwiZW1haWwiOlsiYnJ1bm9mZWxpeGJlc3NhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.M8T7ZiPdgSqSTskp-i9BXUjxs9NCNz9YGJgfvtoGOdEIpiV9Sa0onj2Y21qnqbUXf662wggKRL8ryxO95l8Uh6PadOpmMJVe5Mww0G25dX49IcitophW27nU0Qjvk016qqYt15J1EewPpCzxLlmQBNHvuZNSVkY2ZgrVKT4Zl-hFpribXQiRbEXTy3gLbNsYSEeSkoh6HqVrFfu_n6o2VNKOwaCTRyORsh8qnWB5sGyraqzQyaCGbiqBBJ3mPZdvgKgQzSAeiSJtks4JKh7VUyEi0bVRVEiirogEOsF85FijuJyPxrxC0lXaOqoYdj3I-6yUylJgkxltDdI3QIe2zA';
      // //aqui vamos validar na api para buscar o novo token
      // const novoToken = ValidarTokenNaAPI(idToken2);
      // console.log(novoToken);
    },
  },
});
