export const REGEXP: Readonly<{ [key: string]: RegExp }> = {
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  PHONE: /^[0-9]{10}$/,
  NAME: /^[A-Za-z\s]+$/,
  NUMBER: /^[0-9]+$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^\d{2}:\d{2}$/,
  URL: /^(ftp|http|https):\/\/[^ "]+$/,
  TEXT: /^[A-Za-z\s]+$/,
  TEXT_NUMBER: /^[A-Za-z0-9\s]+$/,
};
