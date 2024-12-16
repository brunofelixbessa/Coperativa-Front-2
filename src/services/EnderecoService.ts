import { apiSinaliza } from 'boot/axios';
import { MsgOcupado, MsgErro, MsgAPI } from 'src/util/useMsg';

const BASE_URL = 'v1/Endereco/';

export default function enderecoServices() {
  const buscarPorCEP = async (cep: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get(`${BASE_URL}buscar-por-cep/${cep}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar endereço');
      return null;
    }
  };

  const buscarEnderecoPorCPF = async (cpf: string) => {
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
      MsgErro('Erro ao buscar endereço por CPF');
      return null;
    }
  };

  const buscarPorCNPJ = async (cnpj: string) => {
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
      MsgErro('Erro ao buscar endereço por CNPJ');
      return null;
    }
  };

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
      MsgErro('Erro ao buscar todos os endereços');
      return null;
    }
  };

  const criarEndereco = async (endereco: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post(`${BASE_URL}criar`, endereco)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao criar endereço');
      return null;
    }
  };

  const atualizarEndereco = async (endereco: any) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .put(`${BASE_URL}atualizar`, endereco)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao atualizar endereço');
      return null;
    }
  };

  const deletarEndereco = async (id: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .delete(`${BASE_URL}${id}`)
        .then((res) => {
          if (res) return res.data;
        });
      MsgAPI(dados, erro, mensagem);
      MsgOcupado(false);
      return erro ? null : dados;
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao deletar endereço');
      return null;
    }
  };

  return {
    buscarPorCEP,
    buscarEnderecoPorCPF,
    buscarPorCNPJ,
    buscarTodos,
    criarEndereco,
    atualizarEndereco,
    deletarEndereco,
  };
}
