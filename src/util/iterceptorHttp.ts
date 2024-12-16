import { apiSinaliza } from 'boot/axios';
import { useAuth } from 'stores/auth';
import { MsgPermissao } from 'src/util/useMsg';

export const addInterceptors = (Router: any) => {
  const store = useAuth();

  apiSinaliza.interceptors.response.use(
    (response) => {
      //commonStore.REMOVE_REQUEST();
      return response;
    },
    async (error) => {
      //commonStore.REMOVE_REQUEST();
      //console.log(error);
      if (!error.response) {
        //'Error 1', error.response;
        MsgPermissao(
          'Falha de conexão com a API. Informe o setor responsavel.'
        );
        return Promise.reject(
          new Error('Falha de conexão, tente novamente mais tarde!')
        );
      }

      // Apenas para erros de falta de permissão
      if (error.response.status === 403) {
        MsgPermissao(
          '403 - Usuário sem permissão nessa rota! => ' + error.config.url
        );
      }

      // Apenas para erros de falta de autorização
      if (error.response.status === 401) {
        MsgPermissao(
          '401 - Usuário não autorizado! Verifique seu login e senha.'
        );

        // Aqui deloga e vai pra login
        store.removeUsuario();
        Router.push('/login');

        if (Router.currentRoute.value.path.includes('lock'))
          return Promise.resolve();

        return Promise.reject(error);
      } else return Promise.reject(error);
    }
  );
};
