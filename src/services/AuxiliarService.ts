import { apiSinaliza } from 'boot/axios';
import { MsgAPI, MsgErro, MsgOcupado } from 'src/util/useMsg';

export default function auxiliarServices() {
  const buscarTags = async () => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Auxiliar/buscar-tags')
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
      MsgErro('Erro ao buscar Tags');
    }
  };

  const buscarClasses = async () => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Auxiliar/buscar-classes')
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
      MsgErro('Erro ao buscar Classes');
    }
  };

  const buscarParametros = async () => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Auxiliar/buscar-parametros')
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
      MsgErro('Erro ao buscar Classes');
    }
  };

  const buscarPorMae = async (mae_id: string) => {
    try {
      MsgOcupado(true);
      const { dados, erro, mensagem } = await apiSinaliza
        .get('v1/Auxiliar/buscar-por-mae/' + mae_id)
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
      MsgErro('Erro ao buscar por mãe');
    }
  };

  return {
    buscarTags,
    buscarPorMae,
    buscarClasses,
    buscarParametros,
  };
}
