import { LocalModel } from './../models/Local';
import { PessoaModel } from './../models/Pessoa';
import { MsgErro, MsgOcupado, MsgSucesso } from 'src/util/useMsg';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  arrayUnion,
  query,
  where,
} from 'firebase/firestore';
import { db, Timestamp } from 'boot/firebase';

import { UsuarioModel } from 'src/models/Usuario';
import { ObraModel } from 'src/models/Obra';

const noteDate = Timestamp.fromDate(new Date());

export default function firestoreService() {
  const buscarDash = async (idMarca: string) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'usuarios', idMarca);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Verifica se esta ativo
        const completo = docSnap.data();
        if (completo.ativo === true) {
          MsgSucesso('Conta ativa');
          return completo;
        } else {
          MsgErro('Conta desativada');
          return false;
        }
      }
    } catch (error: any) {
      MsgErro('Erro ao buscar dash: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const buscarLocalDeEntrada = async (local: LocalModel) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'checkins', local.idLocal);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const completo = docSnap.data();
        local.nomeLocal = completo.nome; // Mapeamento
        local.descricaoLocal = completo.descricao; // Mapeamento
        local.emailLocal = completo.email; // Mapeamento
        local.idMarca = completo.marcaId; // Mapeamento

        const retorno = await buscarMarca(local);
        return retorno;
      }
    } catch (error: any) {
      MsgErro('Erro ao buscar local: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const buscarMarca = async (local: LocalModel) => {
    //console.log(local);
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'marcas', local.idMarca);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const completo = docSnap.data();
        local.tagsMarca = completo.tags; // Mapeamento
        local.nomeMarca = completo.nome; // Mapeamento
        local.logoMarca = completo.logo; // Mapeamento
        MsgOcupado(false);
        return local;
      }
    } catch (error: any) {
      MsgErro('Erro ao buscar marca: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const buscarPessoa = async (pessoa: PessoaModel) => {
    try {
      if (!pessoa.id) return false;
      MsgOcupado(true);
      const docRef = doc(db, 'pessoas', pessoa.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const completo = docSnap.data();
        if (completo.hash === pessoa.hash) {
          MsgSucesso('Cadastro encontrado');
          MsgOcupado(false);
          return completo;
        }
      } else {
        MsgErro('Cadastro desconhecido');
        return false;
      }
    } catch (error: any) {
      MsgErro('Erro ao buscar: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  // const buscarPessoasDaMarca = async (
  //   marcaId: string
  // ): Promise<ContatoModel[]> => {
  //   const listaContatos: ContatoModel[] = [];
  //   try {
  //     MsgOcupado(true);
  //     const docRef = doc(db, 'marcas', marcaId);
  //     const contatos = collection(docRef, 'contatos'); // Sub Coleção
  //     // Obtenha todos os documentos da coleção "contatos"
  //     const querySnapshot = await getDocs(contatos);

  //     querySnapshot.forEach((doc) => {
  //       listaContatos.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       } as ContatoModel);
  //     });
  //     //
  //     MsgOcupado(false);
  //     return listaContatos;
  //   } catch (error: any) {
  //     MsgErro('Erro ao buscar: ' + error);
  //     console.error('Código de erro Firestore:', error);
  //     return listaContatos;
  //   } finally {
  //     MsgOcupado(false);
  //   }
  // };
  const buscarObras = async (status: string): Promise<ObraModel[]> => {
    const listaContatos: ObraModel[] = [];
    try {
      MsgOcupado(true);
      const checkinsRef = query(
        collection(db, 'obras'),
        where('status', '==', status)
      );
      const querySnapshot = await getDocs(checkinsRef);

      querySnapshot.forEach((doc) => {
        listaContatos.push({
          id: doc.id,
          ...doc.data(),
        } as ObraModel);
      });
      //
      MsgOcupado(false);
      return listaContatos;
    } catch (error: any) {
      MsgErro('Erro ao buscar obra: ' + error);
      console.error('Código de erro Firestore:', error);
      return listaContatos;
    } finally {
      MsgOcupado(false);
    }
  };
  const salvarPessoasDaMarca = async (
    pessoaId: string,
    pessoa: PessoaModel,
    marcaId: string
  ) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'marcas', marcaId);
      const contatos = collection(docRef, 'contatos'); // Sub Coleção
      const contatoRef = doc(contatos, pessoaId);
      const contato = {
        id: pessoaId,
        nome: pessoa.nome,
        email: pessoa.email,
        celular: pessoa.celular,
        tags: pessoa.tags.join(','),
        datado: noteDate,
      };

      setDoc(contatoRef, contato, { merge: true });

      MsgOcupado(false);
      return true;
    } catch (error: any) {
      MsgErro('Erro ao salvar pessoa da marca: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const salvarPessoa = async (pessoa: PessoaModel) => {
    try {
      MsgOcupado(true);
      // Trava para nunca ir sem nenhum tag
      if (pessoa.tags.length <= 0) {
        pessoa.tags.push('Me represento');
      }
      const docRef = doc(db, 'pessoas', pessoa.id);
      // const docSnap = await getDoc(docRef);
      // // Se a pessoa ja tinha cadastro adiciona novas tags
      // if (docSnap.exists()) {
      //   const completo = docSnap.data();
      //   const novoArray = [...pessoa.tags, ...completo.tags]; // Inifica os arrays
      //   pessoa.tags = Array.from(new Set(novoArray)); // limpa itens duplicados
      // }
      //
      setDoc(docRef, pessoa, { merge: true });
      MsgOcupado(false);
      return true;
    } catch (error: any) {
      MsgErro('Erro ao salvar pessoa: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const salvarCheckin = async (pessoaId: string, checkinId: string) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'checkins', checkinId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return false;

      const completo = docSnap.data();
      setDoc(
        docRef,
        {
          contador: completo.contador + 1,
          descricao: completo.descricao,
          marcaId: completo.marcaId,
          nome: completo.nome,
          visitas: arrayUnion({
            datado: noteDate,
            pessoa: pessoaId,
          }),
        },
        { merge: true }
      );
      //
      MsgOcupado(false);
      MsgSucesso('Seja bem vindo');
      return true;
      //
    } catch (error: any) {
      MsgErro('Erro ao salvar check-in: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };
  const salvarEmail = async (email: any) => {
    try {
      MsgOcupado(true);
      const docRef = doc(collection(db, 'mail'));
      await setDoc(docRef, email);
      //
      MsgOcupado(false);
      //MsgSucesso('Email enviado');
      return true;
      //
    } catch (error: any) {
      MsgErro('Erro ao enviar email: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return false;
    } finally {
      MsgOcupado(false);
    }
  };

  // Metodos de Usuarios - Revisado 28-08-24
  const buscarUsuario = async (
    usuarioId: string
  ): Promise<UsuarioModel | null> => {
    try {
      MsgOcupado(true);
      if (!usuarioId) return null;
      const docRef = doc(db, 'usuarios', usuarioId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Retorna os dados do usuário se ele existe
        const usuarioData = docSnap.data();
        return usuarioData as UsuarioModel;
      } else {
        MsgErro('Usuário desconhecido');
        return null;
      }
    } catch (error: any) {
      MsgErro('Erro ao buscar usuario: ' + error.message);
      console.error('Código de erro Firestore:', error.code);
      return null;
    } finally {
      MsgOcupado(false);
    }
  };
  const salvarUsuario = async (pessoa: UsuarioModel) => {
    try {
      MsgOcupado(true);
      const docRef = doc(db, 'usuarios', pessoa.Uid);
      setDoc(docRef, pessoa, { merge: true });
      MsgSucesso('Entre no seu email e confirme o recebimento');
      MsgOcupado(false);
      return true;
    } catch (error) {
      return false;
      // MsgErro('Erro ao salvar usuario: ' + error.message);
      // console.error('Código de erro Firestore:', error.code);
    } finally {
      MsgOcupado(false);
    }
  };

  return {
    buscarLocalDeEntrada,
    buscarDash,
    buscarPessoa,
    salvarPessoa,
    salvarCheckin,
    salvarEmail,
    salvarPessoasDaMarca,
    //buscarPessoasDaMarca,
    buscarObras,
    buscarUsuario,
    salvarUsuario,
  };
}
