import * as currency from 'currency.js';

export function toMoney(amount: number | string,precision = 7) {
  return currency(amount,{precision: precision, errorOnInvalid: true});
}