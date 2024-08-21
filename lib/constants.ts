export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_SPACE_REGEX = new RegExp(/^\S*$/);
export const PASSWORD_SPECIAL_REGEX = new RegExp(/[\W_]/);

export const UNAVAILABLE_USERNAME = ["master", "admin", "fgfg", "sex"];
export const DATE_REGEX = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
export const TIME_30_MIN_REGEX = new RegExp(/^([01]\d|2[0-4]):(00|30)$/);
