/**
 * Obtiene la fecha y hora actual en UTC como un objeto Date.
 * @returns {Date} Fecha y hora actual en UTC.
 */
export const getCurrentUTCDate = (): Date => {
    return new Date();
};

/**
 * Obtiene una cadena ISO 8601 en UTC para la fecha y hora actual.
 * @returns {string} Fecha y hora actual en formato ISO 8601 UTC.
 */
export const getCurrentISODateUTC = (): string => {
    return new Date().toISOString();
};

/**
 * Convierte un objeto Date a Unix timestamp en segundos.
 * @param {Date} date Objeto Date a convertir.
 * @returns {number} Unix timestamp en segundos.
 */
export const convertDateToUnixTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
};

/**
 * Convierte una cadena ISO 8601 en UTC a Unix timestamp en segundos.
 * @param {string} isoDate Cadena ISO 8601 en UTC.
 * @returns {number} Unix timestamp en segundos.
 */
export const convertISODateToUnixTimestamp = (isoDate: string): number => {
    return Math.floor(new Date(isoDate).getTime() / 1000);
};

/**
 * dateUtils.ts
 * 
 * Este módulo proporciona funciones utilitarias para manejar fechas en UTC.
 */

/**
 * Obtiene la marca de tiempo Unix actual en segundos en UTC.
 * @returns {number} Marca de tiempo Unix actual en segundos.
 */
export const getCurrentUnixTimestampUTC = (): number => {
    return Math.floor(Date.now() / 1000);
};

/**
 * Obtiene la marca de tiempo Unix al final del día actual (23:59:59 UTC).
 * @returns {number} Marca de tiempo Unix al final del día en segundos.
 */
export const getEndOfDayUnixTimestampUTC = (): number => {
    const now = new Date();

    // Crear una nueva fecha al final del día en UTC
    const endOfDayUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23, 59, 59, 999 // 23:59:59.999 UTC
    ));

    return Math.floor(endOfDayUTC.getTime() / 1000);
};

/**
 * Obtiene la marca de tiempo Unix para una fecha específica en UTC.
 * @param {Date} date Objeto Date representando la fecha deseada.
 * @returns {number} Marca de tiempo Unix para la fecha especificada en segundos.
 */
export const getUnixTimestampUTC = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
};