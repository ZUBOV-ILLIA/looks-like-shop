import { en } from '../lang/en';
import { ru } from '../lang/ru';
import { ua } from '../lang/ua';
import { LangType } from './../types/langType';


export const langSetter = (key: keyof LangType) => {
  const lang = localStorage.getItem("lang");
  
  switch (lang) {
    case "ru":
      return ru[key];
    case "ua":
      return ua[key];
    default:
      return en[key];
  }
};
