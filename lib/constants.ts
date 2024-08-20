export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-";

export const UNAVAILABLE_USERNAME = ["master", "admin", "fgfg", "sex"];
export const DATE_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
export const TIME_30_MIN_REGEX = new RegExp(/^([01]\d|2[0-3]):(00|30)$/);
