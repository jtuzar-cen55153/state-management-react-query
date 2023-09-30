import { QueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { AxiosInstance } from 'axios';
import { getHeroesQuery } from '../api/hero';
import { Hero } from '../interface/hero';
import { Heroes } from '../components/Heroes/Heroes';

export const loader = (queryClient: QueryClient, axios: AxiosInstance) => async (): Promise<Hero[]> => {
  const query = getHeroesQuery(axios);

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const HeroesPage: FC = () => <Heroes />;
