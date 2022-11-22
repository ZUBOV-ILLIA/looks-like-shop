import { getFromAPI } from "./getFromAPI";

export const getProductsFromAPI = (arg: string) => getFromAPI(`products${arg}`);