import { QueryObserver, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { createHero, deleteHero, editHero, getHeroes } from '../api/hero';
import { Hero } from '../interface/hero';

const key = 'heroes';

export const useEditHero = () => {
  const queryClient = useQueryClient();

  return useMutation(editHero, {
    onSuccess: (updatedHero: Hero) => {
      // Optimistic update
      // queryClient.setQueryData([key], (prevHeroes: Hero[] | undefined) => {
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
      queryClient.invalidateQueries([key]);
    },
  });
};

export const useCreateHero = () => {
  const queryClient = useQueryClient();

  return useMutation(createHero, {
    onSuccess: (hero: Hero) => {
      // Optimistic update
      // queryClient.setQueryData([key], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? [hero, ...prevHeroes] : [hero],
      // );
      queryClient.invalidateQueries({ queryKey: [key], refetchType: 'all' });
    },
  });
};

export const useDeleteHero = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteHero, {
    onSuccess: deletedHeroId => {
      // Optimistic update
      // queryClient.setQueryData([key], (prevHeroes: Hero[] | undefined) =>
      //   prevHeroes ? prevHeroes.filter(hero => hero.id !== deletedHeroId) : prevHeroes,
      // );
      queryClient.invalidateQueries([key]);
    },
  });
};

export const useGetHeroes = () => useQuery([key], getHeroes);
export const useGetTopHeroes = () =>
  useQuery({
    queryKey: [key],
    queryFn: getHeroes,
    select: useCallback((data: Hero[]) => data?.slice(0, 4) ?? [], []),
  });

export const useGetHeroesObserver = () => {
  const getHeroes = useGetHeroes();
  const queryClient = useQueryClient();

  const [heroes, setHeroes] = useState<Hero[]>(() => {
    // get data from cache
    const data = queryClient.getQueryData<Hero[]>([key]);

    return data ?? [];
  });

  useEffect(() => {
    const observer = new QueryObserver<Hero[]>(queryClient, { queryKey: [key] });

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
