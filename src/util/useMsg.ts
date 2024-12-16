import { Notify, Loading, QSpinnerGears, copyToClipboard } from 'quasar';

const MsgSucesso = (message: string) => {
  Notify.create({
    icon: 'announcement',
    type: 'positive',
    progress: true,
    multiLine: true,
    html: true,
    position: 'top-right',
    message: message || 'Tudo certo !',
  });
};

const MsgErro = (message: string) => {
  Notify.create({
    icon: 'announcement',
    type: 'negative',
    multiLine: true,
    progress: true,
    position: 'top-right',
    message: message || 'Falha !',
  });
};
const MsgAtencao = (message: string) => {
  Notify.create({
    icon: 'announcement',
    type: 'warning',
    multiLine: true,
    progress: true,
    html: true,
    position: 'top-right',
    message: message || 'Atenção !',
  });
};
const MsgCopia = (message: string) => {
  copyToClipboard(message);
  Notify.create({
    icon: 'announcement',
    color: 'purple',
    multiLine: true,
    progress: true,
    html: true,
    position: 'top-right',
    message: 'Copiado para a área de transferência',
  });
};
const MsgPermissao = (message: any) => {
  Notify.create({
    icon: 'lock',
    multiLine: true,
    progress: true,
    position: 'top-right',
    message: message || 'Sem permissão !',
  });
};
const MsgOcupado = (status: boolean) => {
  if (status) {
    Loading.show({
      message: 'Aguarde...',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'secondary',
      spinner: QSpinnerGears,
    });
  } else {
    Loading.hide();
  }
};

const MsgAPI = (dados: any, erro: boolean, mensagem: string) => {
  try {
    // Se o campo erro tiver falso sempre mostra como sucesso
    if (erro == false) {
      MsgSucesso(mensagem);
      return;
    }
    //console.log(data, erro, message);
    // Se erro for true sempre mostra a mensagem
    if (erro == true) MsgAtencao(mensagem);
    // Se tiver algo no DATA
    if (dados?.notifications) {
      //let lista = MontaLista(data.notifications);
      //if (lista) MsgAtencao(lista);
    }
  } catch (e) {
    MsgErro('Erro desconhecido MsgAPI - Falar com Gestor de TI.');
  }
};

export {
  MsgSucesso,
  MsgErro,
  MsgAtencao,
  MsgPermissao,
  MsgOcupado,
  MsgCopia,
  MsgAPI,
};
