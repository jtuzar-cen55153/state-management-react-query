import { useParams } from 'react-router-dom';
import { FormEvent } from 'react';
import { useEditHeroMutation, useGetHeroesObserver } from '../../../hooks/useHero';

export const useEditHero = () => {
  const { id } = useParams();
  const { mutateAsync, isLoading, isSuccess, isError } = useEditHeroMutation();
  const getHeroes = useGetHeroesObserver();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const { hero } = Object.fromEntries(new FormData(form));

    if (hero && id) {
      await mutateAsync({ name: hero as string, id });

      form.reset();
    }
  };

  const selectedHero = getHeroes.data?.find(hero => hero.id === id);

  return { selectedHero, handleSubmit, isLoading, isSuccess, isError };
};
