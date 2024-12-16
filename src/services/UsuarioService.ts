import { apiSinaliza } from 'boot/axios';
import {
  MsgAtencao,
  MsgErro,
  MsgOcupado,
  MsgSucesso,
  MsgAPI,
} from 'src/util/useMsg';

const BASE_URL = 'v1/Usuario/';

export default function usuarioServices() {
  //#region Busca
  const validarTokenNaAPI = async (idToken: string) => {
    try {
      MsgOcupado(true);
      apiSinaliza.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${idToken}`;
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}validar-token/${idToken}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? false : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao ValidarTokenNaAPI');
    }
  };

  const buscarPorCPF = async (cpf: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-cpf/${cpf}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar usuário por CPF');
      return null;
    }
  };

  const buscarGenerica = async (valor: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-generica/${valor}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar usuário genericamente');
      return null;
    }
  };

  const buscarGenericaComValor = async (valor: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-generica-com-valor/${valor}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar usuário genericamente com valor');
      return null;
    }
  };
  //#endregion

  //#region Criação
  const criarUsuario = async (usuario: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}criar`, usuario)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao criar usuário');
      return null;
    }
  };

  const cadastrarUsuarioBasico = async (usuario: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}cadastrar-usuario-basico`, usuario)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e: any) {
      MsgOcupado(false);
      const errorMessage =
        e.response?.data?.mensagem || 'Erro ao cadastrar usuário';
      MsgErro(errorMessage);
      return null;
    }
  };
  //#endregion

  //#region Atualização
  const atualizarUsuario = async (usuario: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .put(`${BASE_URL}atualizar`, usuario)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao atualizar usuário');
      return null;
    }
  };
  //#endregion

  //#region Login
  const loginUsuario = async (login: string, senha: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}validar-login-senha`, { login, senha })
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao autenticar usuário');
      return null;
    }
  };
  //#endregion

  //#region Recuperação de Senha
  const enviarEmailRecuperacao = async (email: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}enviar-email-recuperacao`, { email })
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao enviar email de recuperação');
      return null;
    }
  };

  const confirmarPin = async (email: string, pin: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}confirmar-pin`, { email, pin })
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao confirmar PIN');
      return null;
    }
  };

  const alterarSenha = async (email: string, novaSenha: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}alterar-senha`, { email, novaSenha })
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao alterar senha');
      return null;
    }
  };
  //#endregion

  return {
    validarTokenNaAPI,
    buscarPorCPF,
    buscarGenerica,
    buscarGenericaComValor,
    criarUsuario,
    atualizarUsuario,
    loginUsuario,
    enviarEmailRecuperacao,
    confirmarPin,
    alterarSenha,
    cadastrarUsuarioBasico,
  };
}
