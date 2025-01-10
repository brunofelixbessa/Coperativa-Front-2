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

    // verificaStatus() {
    //   onAuthStateChanged(auth, (userLoged) => {
    //     if (userLoged) {
    //       this.isAuthenticated = true;
    //       console.log(this.usuario);
    //     } else {
    //       this.removeUsuario();
    //     }
    //   });
    // },

    async init() {
      this.getUsuario();
      if (this.isAuthenticated) {
        // apiGrupovab.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${this.token}`;
        //console.log("com token");
      } else {
        //console.log("sem token");
        this.removeUsuario();
      }
    },

    getUsuario() {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        this.usuario = JSON.parse(storedUser);
        this.isAuthenticated = true;
      } else {
        this.removeUsuario();
      }
    },

    setUsuario(userHidratado: any) {
      //console.log(userHidratado);
      this.usuario.Uid = userHidratado.usuario.id;
      this.usuario.Email = userHidratado.usuario.email;
      this.usuario.Nome = userHidratado.usuario.nome || 'Nome';

      window.localStorage.setItem('usuario', JSON.stringify(this.usuario)); // TODO
      // Aqui coloca o token no header
      apiSinaliza.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${userHidratado.token}`;
    },

    removeUsuario() {
      //console.log('remover');
      signOut(auth)
        .then(() => {
          this.isAuthenticated = false;
          window.localStorage.removeItem('usuario');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // google
    async loginGooglePopUp() {
      MsgOcupado(true); // Loading
      try {
        await signInWithPopup(auth, provider);

        const idToken = await auth.currentUser?.getIdToken();
        if (idToken) {
          this.isAuthenticated = true;
          const retorno = await this.validatokenGoogleNoBackEnd(idToken);
          if (retorno) {
            MsgSucesso('Logado com sucesso');
            return true;
          } else {
            MsgErro('Erro ao logar');
            return false;
          }
        }
        return false;
      } catch (error) {
        console.log(error);
      } finally {
        MsgOcupado(false);
      }
    },

    async loginGoogleEmailSenha(email: string, senha: string) {
      MsgOcupado(true); // Loading
      try {
        await signInWithEmailAndPassword(auth, email, senha);

        const idToken = await auth.currentUser?.getIdToken();
        if (idToken) {
          this.isAuthenticated = true;
          const retorno = await this.validatokenGoogleNoBackEnd(idToken);
          if (retorno) {
            MsgSucesso('Logado com sucesso');
            return true;
          } else {
            MsgErro('Erro ao logar');
            return false;
          }
        }
        return false;
      } catch (error) {
        MsgErro('Usuário ou senha inválidos');
        console.log(error);
      } finally {
        MsgOcupado(false);
      }
    },

    // valida token
    async validatokenGoogleNoBackEnd(idToken: string) {
      // Aqui coloca o token no header
      apiSinaliza.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${idToken}`;
      //aqui vamos validar na api para buscar o novo token
      const retorno = await validarTokenNaAPI(idToken);

      if (retorno) {
        this.setUsuario(retorno);
        return true;
      } else {
        this.removeUsuario();
        return false;
      }
    },
  },
});
