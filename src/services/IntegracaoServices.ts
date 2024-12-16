import { apiSinaliza } from 'boot/axios';
import { MsgOcupado, MsgErro, MsgAPI } from 'src/util/useMsg';

const BASE_URL = 'v1/Integracao/';

export default function integracaoServices() {
  const buscarCepCorreio = async (cep: string, token_id: string) => {
    try {
      console.log(`${BASE_URL}buscar-cep-correio/${cep}/${token_id}`, 'cep');
      MsgOcupado(true);
      const response = await apiSinaliza.get(
        `${BASE_URL}buscar-cep-correio/${cep}/${token_id}`
      );
      MsgOcupado(false);
      return response.data;
    } catch (error) {
      MsgOcupado(false);
      MsgErro('Erro ao buscar CEP no correio');
      console.error('Erro ao buscar CEP no correio:', error);
      return null;
    }
  };

  return {
    buscarCepCorreio,
  };
}
