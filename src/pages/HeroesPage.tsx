import { Link } from 'react-router-dom';
import { useDeleteHero, useGetHeroes } from '../hooks/useHero';
import { Alert, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Create } from '../components/Heroes/Create';

export const HeroesPage = () => {
  const { data, isLoading, isError } = useGetHeroes();

  const {
    mutateAsync,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
  } = useDeleteHero();

  const onDelete = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <>
      <h1>Heroes</h1>

      {isLoading && <Alert color="primary">fetching a character...</Alert>}
      {isError && <Alert color="danger">Ups! it was an error 🚨</Alert>}

      {isLoadingDelete && <span>deleting hero...</span>}
      {isSuccessDelete && <span>Hero deleted successfully ✅, go back home</span>}
      {isErrorDelete && <span>Ups! it was an error 🚨</span>}

      <Create />

      <ListGroup>
        {data?.map(({ id, name }) => (
          <ListGroupItem key={id}>
            <Link to={`/${id}`}>{name}</Link>
            <Button className="mx-3" onClick={() => onDelete(id)}>
              x
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
};
