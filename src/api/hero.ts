import { Hero } from '../interface/hero';

const URL_BASE = 'http://localhost:8627/heroes';
const headers = { 'Content-type': 'application/json' };

export const getHeroes = async (): Promise<Hero[]> => {
  return await (await fetch(URL_BASE)).json();
};

export const createHero = async (hero: Omit<Hero, 'id'>): Promise<Hero> => {
  const body = JSON.stringify(hero);
  const method = 'POST';
  return await (await fetch(URL_BASE, { body, method, headers })).json();
};

export const editHero = async (hero: Hero): Promise<Hero> => {
  const body = JSON.stringify(hero);
  const method = 'PUT';

  return await (await fetch(`${URL_BASE}/${hero.id}`, { body, method, headers })).json();
};

export const deleteHero = async (id: string): Promise<string> => {
  const method = 'DELETE';
  await fetch(`${URL_BASE}/${id}`, { method });

  return id;
};
