import { AxiosInstance } from 'axios';
import { CACHE_KEY, URL_BASE } from '../constants/api';
import { Hero } from '../interface/hero';

export const getHeroes = async (axios: AxiosInstance) => {
  const response = await axios.get<Hero[]>(`${URL_BASE}heroes`);

  return response.data;
};

export const createHero = (axios: AxiosInstance) => async (hero: Omit<Hero, 'id'>) => {
  const response = await axios.post<Hero>(`${URL_BASE}heroes`, hero);

  return response.data;
};

export const editHero = (axios: AxiosInstance) => async (hero: Hero) => {
  const response = await axios.put<Hero>(`${URL_BASE}heroes/${hero.id}`, hero);

  return response.data;
};

export const deleteHero = (axios: AxiosInstance) => async (id: string) => {
  const response = await axios.delete<string>(`${URL_BASE}heroes/${id}`);

  return response.data;
};

export const getHeroesQuery = (axios: AxiosInstance) => ({
  queryKey: [CACHE_KEY],
  queryFn: async () => getHeroes(axios),
});
