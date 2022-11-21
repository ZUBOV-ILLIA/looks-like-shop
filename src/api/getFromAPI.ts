import { URL } from "./URL";

export const getFromAPI = async (item: string) => {
  const response = await fetch(`${URL}${item}`);

  if (!response.ok) {
    throw new Error('wrong');
  }

  return response.json();
}
