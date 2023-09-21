import { FormEvent } from 'react';
import { useCreateHeroMutation, useDeleteHeroMutation, useGetHeroesQuery } from '../../../hooks/useHero';

export const useHeroes = () => {
  const { data: heroes, isLoading, isError } = useGetHeroesQuery();
  const {
    mutateAsync: createHeroMutateAsync,
    isLoading: isCreateHeroLoading,
    isSuccess: isCreateHeroSuccess,
    isError: isCreateHeroError,
  } = useCreateHeroMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    if (data) {
      await createHeroMutateAsync({ name: data.hero as string });

      form.reset();
    }
  };

  const {
    mutateAsync,
    isLoading: isDeleteLoading,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteHeroMutation();

  const onDelete = async (id: string) => {
    await mutateAsync(id);
  };

  return {
    heroes,
    isLoading,
    isError,
    isDeleteLoading,
    isDeleteSuccess,
    isDeleteError,
    onDelete,
    handleSubmit,
    isCreateHeroLoading,
    isCreateHeroSuccess,
    isCreateHeroError,
  };
};
