import { QueryObserver, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { createHero, deleteHero, editHero, getHeroes } from '../api/hero';
import { Hero } from '../interface/hero';
import { CACHE_KEY } from '../constants/api';

export const useEditHero = () => {
  const queryClient = useQueryClient();

  return useMutation(editHero, {
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

export const useCreateHero = () => {
  const queryClient = useQueryClient();

  return useMutation(createHero, {
    onSuccess: (hero: Hero) => {
      // Optimistic update
      // queryClient.setQueryData([CACHE_KEY], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? [hero, ...prevHeroes] : [hero],
      // );
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY], refetchType: 'all' });
    },
  });
};

export const useDeleteHero = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteHero, {
    onSuccess: deletedHeroId => {
      // Optimistic update
      // queryClient.setQueryData([CACHE_KEY], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? prevHeroes.filter(hero => hero.id !== deletedHeroId) : prevHeroes,
      // );
      queryClient.invalidateQueries([CACHE_KEY]);
    },
  });
};

export const useGetHeroes = () => useQuery([CACHE_KEY], getHeroes);
export const useGetTopHeroes = () =>
  useQuery({
    queryKey: [CACHE_KEY],
    queryFn: getHeroes,
    select: useCallback((data: Hero[]) => data?.slice(0, 4) ?? [], []),
  });

export const useGetHeroesObserver = () => {
  const getHeroes = useGetHeroes();
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
