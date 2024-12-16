import { Timestamp } from '@firebase/firestore';
export interface ContatoModel {
  id: string;
  nome: string;
  tags: string;
  datado: Timestamp;
}
