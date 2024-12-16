import { apiSinaliza } from 'boot/axios';
import { MsgAPI, MsgErro, MsgOcupado } from 'src/util/useMsg';

export default function recursoServices() {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const salvarRecurso = async (form: any) => {
    try {
      console.log(form);
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .post('v1/Recursos/criar', form)
        .then((res) => {
          console.log(res);
          if (res) return res.data;
        });
      //Mensagens
      MsgAPI(dados, erro, mensagem);
      // encerraocupado
      MsgOcupado(false);
      // retorna pra quem chamou
      return erro ? false : dados;
      // erros nao pensados
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao salvar Recurso');
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const atualizarRecurso = async (form: any) => {
    try {
      console.log(form);
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .put('v1/Recursos/atualizar', form)
        .then((res) => {
          console.log(res);
          if (res) return res.data;
        });
      //Mensagens
      MsgAPI(dados, erro, mensagem);
      // encerraocupado
      MsgOcupado(false);
      // retorna pra quem chamou
      return erro ? false : dados;
      // erros nao pensados
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao atualizar Recurso');
    }
  };

  const buscarRecursoPorID = async (id: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Recursos/' + id)
        .then((res) => {
          if (res) return res.data;
        });
      //Mensagens
      MsgAPI(dados, erro, mensagem);
      // encerraocupado
      MsgOcupado(false);
      // retorna pra quem chamou
      return erro ? false : dados;
      // erros nao pensados
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar Recurso');
    }
  };

  const buscarRecursoPorCodigo = async (codigo: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Recursos/buscar-por-codigo/' + codigo)
        .then((res) => {
          if (res) return res.data;
        });
      //Mensagens
      MsgAPI(dados, erro, mensagem);
      // encerraocupado
      MsgOcupado(false);
      // retorna pra quem chamou
      return erro ? false : dados;
      // erros nao pensados
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar Recurso');
    }
  };

  const buscarTodosRecursos = async () => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Recursos/buscar-todos')
        .then((res) => {
          if (res) return res.data;
        });
      //Mensagens
      MsgAPI(dados, erro, mensagem);
      // encerraocupado
      MsgOcupado(false);
      // retorna pra quem chamou
      return erro ? false : dados;
      // erros nao pensados
    } catch (e) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar Recurso');
    }
  };

  return {
    buscarRecursoPorCodigo,
    buscarTodosRecursos,
    buscarRecursoPorID,
    atualizarRecurso,
    salvarRecurso,
  };
}
