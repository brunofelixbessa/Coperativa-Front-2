export interface Cliente {
  id: string;
  cpf: string;
  nome: string;
  admin: boolean; // Novo campo
  ativo: boolean; // Novo campo
  celular: string;
  login: string;
  datado: string;
  celular_Verificado: boolean; // Novo campo
  email: string;
  email_Verificado: boolean; // Novo campo
  senha: string; // Novo campo
  grupos: string[];
  tags: string[];
  usuario_Cadastrador: string;
  atualizado: string;
}
