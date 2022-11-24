import { getFromAPI } from './getFromAPI';

export const getCommentsFromAPI = (arg: string) => getFromAPI(`comments${arg}`);
