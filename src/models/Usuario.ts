export interface UsuarioModel {
  Uid: string;
  Email: string;
  Email_Verificado: boolean;
  Nome: string;
  Foto: string;
  MarcaId: string;
  Ativo: boolean;
  Admin: boolean;
  Pagamento: Date | null;
  Grupos: string[];
  Tags: string[];
  Criacao: Date | null;
  Celular: string;
  Celular_Verificado: boolean;
  Cpf: string;
  Atualizado: Date | null;
  Datado: Date | null;
  Id: string;
  Login: string;
  Senha: string;
  Usuario_Cadastrador: string;
}

function Novo(): UsuarioModel {
  return {
    Uid: '',
    Email: '',
    Email_Verificado: false,
    Nome: '',
    Foto: '',
    MarcaId: '',
    Ativo: false,
    Admin: false,
    Pagamento: null,
    Grupos: [],
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
  };
}

export default Novo;
