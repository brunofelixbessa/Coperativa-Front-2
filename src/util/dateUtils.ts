/**
 * Verifica se uma data é válida.
 * @param {Date} date - A data a ser verificada.
 * @returns {boolean} - True se a data for válida, caso contrário, false.
 */
const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

/**
 * Formata uma data para o formato local.
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
export const formatarData = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toLocaleDateString();
};

/**
 * Formata uma data para o formato ISO (YYYY-MM-DD).
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
export const formatarDataISO = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toISOString().split('T')[0];
};

/**
 * Formata uma data para o formato longo (ex: 5 de Outubro de 2023).
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
export const formatarDataLonga = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Formata uma data para o formato curto (ex: 05/10/2023).
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data formatada.
 */
export const formatarDataCurta = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formata uma data e hora para o formato local.
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data e hora formatada.
 */
export const formatarDataHora = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toLocaleString();
};

/**
 * Formata uma data e hora para o formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ).
 * @param {string | Date} data - A data a ser formatada.
 * @returns {string} - A data e hora formatada.
 */
export const formatarDataHoraISO = (data: string | Date): string => {
  if (!data) return '';
  const date = new Date(data);
  if (!isValidDate(date)) return '';
  return date.toISOString();
};
