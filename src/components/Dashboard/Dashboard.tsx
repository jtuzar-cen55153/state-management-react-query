import { FC, Suspense, lazy } from 'react';
import { Alert, Col, ListGroupItem, Row, Spinner } from 'reactstrap';
import { useGetTopHeroesQuery } from '../../hooks/useHero';
import { HeroesList } from '../HeroesList';
import { Link } from 'react-router-dom';

const Search = lazy(() => import('./Search').then(({ Search }) => ({ default: Search })));

export const Dashboard: FC = () => {
  const { data, isLoading, isError } = useGetTopHeroesQuery();

  return (
    <>
      <Row className="mb-3">
        <Col>
          <h1>Dashboard</h1>

          {isLoading && <Alert color="primary">fetching a character...</Alert>}
          {isError && <Alert color="danger">Ups! it was an error 🚨</Alert>}
        </Col>
      </Row>
      <Row>
        <HeroesList
          horizontal
          items={data}
          render={({ id, name }) => (
            <ListGroupItem key={id} action tag={Link} to={`/heroes/${id}`}>
              {name}
            </ListGroupItem>
          )}
        />
      </Row>
      <Row className="mt-4">
        <Col sm={4}>
          <Suspense fallback={<Spinner />}>
            <Search />
          </Suspense>
        </Col>
      </Row>
    </>
  );
};
