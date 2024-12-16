export interface PessoaModel {
  id: string; // Identificador único da pessoa
  nome: string; // Nome completo da pessoa
  email: string;
  celular: string;
  tags: string[]; // Uma string separada por vírgulas com as tags da pessoa
  hash: string; // junção dos dados que gera um id
}
