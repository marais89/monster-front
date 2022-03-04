export class StringUtils {

  static FILE_MAX_SIZE = 2000000; // max file size is 2MO

  static isNullOrUndefined(value) {
    return (!value || value == undefined || value == '');
  }

  static normalizeAddress(value): string {
    return value.toString().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
