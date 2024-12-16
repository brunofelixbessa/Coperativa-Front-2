import { date, exportFile } from 'quasar';

// Metodos de Data e Hora
const Hoje = () => {
  const timeStamp = Date.now();
  const formatado = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

  return formatado;
};
const OutroDia = (dias: number) => {
  const timeStamp = Date.now();
  const outrodia = date.addToDate(timeStamp, { days: dias });
  const formatado = date.formatDate(outrodia, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
  return formatado;
};
const Datado = (data: Date) => {
  const resultado = date.formatDate(data, 'DD/MM/YYYY');
  //console.log(resultado);
  return resultado;
};
const Horas = (data: Date) => {
  const resultado = date.formatDate(data, 'HH:mm:ss');
  return resultado;
};
const DatadoUTC = (data: string) => {
  try {
    const dt = date.extractDate(data, 'DD/MM/YYYY');
    const resultado = date.formatDate(dt, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    return resultado;
  } catch (error) {
    return 'Erro - Formato aceito DD/MM/YYYY';
  }
};
const TimestampParaDatadoHoras = (timestamp: {
  seconds: number;
  nanoseconds: number;
}) => {
  const dataHora = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
  );
  //const datado = new Date(data * 1000).toLocaleString();
  const resultado = date.formatDate(dataHora, 'DD/MM/YYYY HH:mm:ss');
  return resultado;
};
const DatadoHoras = (data: string | number | Date | undefined) => {
  const resultado = date.formatDate(data, 'DD/MM/YYYY HH:mm:ss');
  return resultado;
};
const CalculaDiasEntreDuasDatas = (data1: string, data2: string) => {
  //console.log(data1, data2);
  const dt1 = date.extractDate(data1, 'DD/MM/YYYY');
  const dt2 = date.extractDate(data2, 'DD/MM/YYYY');

  const diferencaEmDias = date.getDateDiff(dt1, dt2, 'days');
  //console.log(diferencaEmDias);
  return diferencaEmDias;
};
// Criado por Natan - 19/06/2023
const PrimeiroDiaDoMes = (data: string) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  const inicio = date.startOfDate(dt, 'month');
  // const resultado = date.formatDate(inicio, "DD/MM/YYYY");
  return inicio;
};
// Criado por Natan - 19/06/2023
const UltimoDiaDoMes = (data: string) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  const fim = date.endOfDate(dt, 'month');
  //const resultado = date.formatDate(fim, "DD/MM/YYYY");
  return fim;
};

const AnoDaData = (data: string) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  const resultado = dt.getFullYear();
  return resultado;
};

const NomeDoMes = (data: string) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  let resultado = date.formatDate(dt, 'MM');
  //console.log(resultado);
  if (resultado == '01') {
    resultado = 'JAN';
  } else if (resultado == '02') {
    resultado = 'FEV';
  } else if (resultado == '03') {
    resultado = 'MAR';
  } else if (resultado == '04') {
    resultado = 'ABR';
  } else if (resultado == '05') {
    resultado = 'MAI';
  } else if (resultado == '06') {
    resultado = 'JUN';
  } else if (resultado == '07') {
    resultado = 'JUL';
  } else if (resultado == '08') {
    resultado = 'AGO';
  } else if (resultado == '09') {
    resultado = 'SET';
  } else if (resultado == '10') {
    resultado = 'OUT';
  } else if (resultado == '11') {
    resultado = 'NOV';
  } else if (resultado == '12') {
    resultado = 'DEZ';
  }
  return resultado;
};
// Criada por Natan - 21/06/2023
const AdicionaOuRemoveDias = (data: string, qtd: any) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  const proximoMes = date.addToDate(dt, { days: qtd });
  const resultado = date.formatDate(proximoMes, 'DD/MM/YYYY');
  return resultado;
};
// Criado por Natan - 19/06/2023
const AdicionaOuRemoveMeses = (data: string, qtd: any) => {
  const dt = date.extractDate(data, 'DD/MM/YYYY');
  const proximoMes = date.addToDate(dt, { months: qtd });
  const resultado = date.formatDate(proximoMes, 'DD/MM/YYYY');

  return resultado;
};

const gerarCodigoApartirDeDataEHora = (data: string) => {
  let dt = data.replace('-', '');
  dt = dt.replace('-', '');
  dt = dt.replace('T', '');
  dt = dt.replace(':', '');
  dt = dt.replace(':', '');
  dt = dt.substring(8, 14);

  return dt;
};

// Metodos de MOEDA
const MoedaBR = (valor: {
  toString: () => string;
  toLocaleString: (
    arg0: string,
    arg1: { style: string; currency: string }
  ) => any;
}) => {
  //console.log(valor);
  const aux = valor.toString().indexOf(',');
  if (aux > -1) {
    // Aqui devolve como numero caso venha formatado
    const aux = valor.toString().replace('R$', '');
    //console.log(aux);
    const aux1 = aux.toString().replace('.', '');
    //console.log(aux1);
    const aux2 = aux1.toString().replace(',', '.');
    //console.log(aux2);
    return parseFloat(aux2);
  } else {
    // Aqui devolve fomatado caso venha como numero
    const resultado = valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
    //console.log(resultado);
    return resultado;
  }
};

// Metodos de Texto ou Strings
const SubString15 = (data: {
  toString: () => {
    (): any;
    new (): any;
    length: number;
    substring: { (arg0: number, arg1: number): string; new (): any };
  };
}) => {
  if (data) {
    if (data.toString().length > 15) {
      return data.toString().substring(0, 15) + '...';
    }
  }
  return data;
};
const SubString30 = (data: {
  toString: () => {
    (): any;
    new (): any;
    length: number;
    substring: { (arg0: number, arg1: number): string; new (): any };
  };
}) => {
  if (data) {
    if (data.toString().length > 30) {
      return data.toString().substring(0, 30) + '...';
    }
  }
  return data;
};

const ajustaLinhasCSV = (
  val: any,
  formatFn: ((arg0: any, arg1: any) => any) | undefined,
  row: any
) => {
  let formatted = formatFn ? formatFn(val, row) : val; // Usa a função de formatação se disponível
  formatted =
    formatted === undefined || formatted === null ? '' : String(formatted); // Trata valores indefinidos ou nulos
  formatted = formatted.split('"').join('""'); // Escapa aspas duplas

  return `"${formatted}"`; // Retorna o valor formatado e cercado por aspas
};

const exportarTabela = (linhas: any[], colunas: any[]) => {
  // Verificar se as colunas e as linhas estão definidas e são arrays
  if (!Array.isArray(colunas) || colunas.length === 0) {
    console.error('Colunas indefinidas ou vazias');
    return;
  }

  if (!Array.isArray(linhas) || linhas.length === 0) {
    console.error('Linhas indefinidas ou vazias');
    return;
  }

  // Se passar pelas verificações, prossegue com a exportação
  const cabecalho = colunas
    .map((col: { label: any }) => ajustaLinhasCSV(col.label, undefined, null))
    .join(';'); // Concatena os rótulos das colunas

  const linhasFormatadas = linhas
    .map((row: { [x: string]: any }) =>
      colunas
        .map((col: { field?: (arg0: any) => any; name: any; format?: any }) =>
          ajustaLinhasCSV(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field || col.name],
            col.format,
            row
          )
        )
        .join(';')
    )
    .join('\r\n');

  const content = `${cabecalho}\r\n${linhasFormatadas}`;
  const status = exportFile(
    'TabelaExportada.csv',
    '\ufeff' + content,
    'text/csv'
  );

  if (status !== true) {
    console.log('Não foi possível fazer o download...');
  }
};

function validarCPF(cpf: string) {
  // Remover caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verificar se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais (caso contrário, o CPF é inválido)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Validar os dígitos verificadores
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}
function validarEmail(email: string) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

export {
  SubString15,
  SubString30,
  MoedaBR,
  Hoje,
  Datado,
  DatadoUTC,
  ajustaLinhasCSV,
  exportarTabela,
  CalculaDiasEntreDuasDatas,
  gerarCodigoApartirDeDataEHora,
  NomeDoMes,
  PrimeiroDiaDoMes,
  UltimoDiaDoMes,
  AdicionaOuRemoveMeses,
  AdicionaOuRemoveDias,
  OutroDia,
  Horas,
  AnoDaData,
  DatadoHoras,
  validarCPF,
  validarEmail,
  TimestampParaDatadoHoras,
};
