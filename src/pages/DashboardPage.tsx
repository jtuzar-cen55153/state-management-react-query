import { Link } from 'react-router-dom';
import { useGetTopHeroes } from '../hooks/useHero';
import { Alert, Col, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
// import { Search } from '../components/Dashboard/Search';
import { Suspense, lazy } from 'react';

const Search = lazy(() => import('../components/Dashboard/Search').then(({ Search }) => ({ default: Search })));

export const DashboardPage = () => {
  const { data, isLoading, isError } = useGetTopHeroes();

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
        <ListGroup horizontal>
          {data?.map(({ id, name }) => (
            <ListGroupItem key={id} action tag={Link} to={`/heroes/${id}`}>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
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
