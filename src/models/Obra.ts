import { Timestamp } from '@firebase/firestore';

export interface ObraModel {
  id: string;
  nome: string;
  descricao: string;
  datado: Timestamp;
  imagemUrl: string;
  cidade: string;
  uf: string;
  status: string;
  classeId: string;
  criadorId: string;
  compradorId: string;
}
