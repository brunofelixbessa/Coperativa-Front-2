import { apiSinaliza } from 'boot/axios';
import { MsgOcupado, MsgErro, MsgAPI } from 'src/util/useMsg';

const BASE_URL = 'v1/Empresa/';

export default function empresaServices() {
  const buscarTodos = async () => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-todos`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar todas as empresas');
      return null;
    }
  };

  const buscarEmpresaPorClienteId = async (id: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-usuario-id/${id}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar empresa por ID');
      return null;
    }
  };

  const buscarPorCnpj = async (cnpj: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-cnpj/${cnpj}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar empresa por CNPJ');
      return null;
    }
  };

  const buscarPorNomeFantasia = async (nomeFantasia: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-nome-fantasia/${nomeFantasia}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar empresa por nome fantasia');
      return null;
    }
  };

  const buscarPorUsuarioId = async (usuarioId: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-usuario-id/${usuarioId}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar empresas por ID do usuário');
      return null;
    }
  };

  const criarEmpresa = async (empresa: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}criar`, empresa)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao criar empresa');
      return null;
    }
  };

  const atualizarEmpresa = async (empresa: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .put(`${BASE_URL}atualizar`, empresa)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao atualizar empresa');
      return null;
    }
  };

  const deletarEmpresa = async (id: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .delete(`${BASE_URL}deletar/${id}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao deletar empresa');
      return null;
    }
  };

  return {
    buscarTodos,
    buscarEmpresaPorClienteId,
    buscarPorCnpj,
    buscarPorNomeFantasia,
    buscarPorUsuarioId,
    criarEmpresa,
    atualizarEmpresa,
    deletarEmpresa,
  };
}
