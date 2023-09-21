import { QueryObserver, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { createHero, deleteHero, editHero, getHeroes } from '../api/hero';
import { Hero } from '../interface/hero';
import { CACHE_KEY } from '../constants/api';
import { useAxios } from './useAxios';

export const useEditHeroMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation(editHero(axios), {
    onSuccess: (updatedHero: Hero) => {
      // Optimistic update
      // queryClient.setQueryData([CACHE_KEY], (prevHeroes: Hero[] | undefined) => {
      //   if (prevHeroes) {
      //     prevHeroes.map(hero => {
      //       if (hero.id === updatedHero.id) {
      //         hero.name = updatedHero.name;
      //       }
      //       return hero;
      //     });
      //   }
      //   return prevHeroes;
      // });
      queryClient.invalidateQueries([CACHE_KEY]);
    },
  });
};

export const useCreateHeroMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation(createHero(axios), {
    onSuccess: (hero: Hero) => {
      // Optimistic update
      // queryClient.setQueryData([CACHE_KEY], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? [hero, ...prevHeroes] : [hero],
      // );
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY], refetchType: 'all' });
    },
  });
};

export const useDeleteHeroMutation = () => {
  const queryClient = useQueryClient();
  const axios = useAxios();

  return useMutation(deleteHero(axios), {
    onSuccess: deletedHeroId => {
      // Optimistic update
      // queryClient.setQueryData([CACHE_KEY], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? prevHeroes.filter(hero => hero.id !== deletedHeroId) : prevHeroes,
      // );
      queryClient.invalidateQueries([CACHE_KEY]);
    },
  });
};

export const useGetHeroesQuery = () => {
  const axios = useAxios();

  return useQuery([CACHE_KEY], () => getHeroes(axios));
};
export const useGetTopHeroesQuery = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: [CACHE_KEY],
    queryFn: () => getHeroes(axios),
    select: useCallback((data: Hero[]) => data?.slice(0, 4) ?? [], []),
  });
};

export const useGetHeroesObserver = () => {
  const getHeroes = useGetHeroesQuery();
  const queryClient = useQueryClient();

  const [heroes, setHeroes] = useState<Hero[]>(() => {
    // get data from cache
    const data = queryClient.getQueryData<Hero[]>([CACHE_KEY]);

    return data ?? [];
  });

  useEffect(() => {
    const observer = new QueryObserver<Hero[]>(queryClient, { queryKey: [CACHE_KEY] });

    const unsubscribe = observer.subscribe(result => {
      if (result.data) {
        setHeroes(result.data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  return {
    ...getHeroes,
    data: heroes,
  };
};
