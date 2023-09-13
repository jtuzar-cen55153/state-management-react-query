import { Link } from 'react-router-dom';
import { useGetTopHeroes } from '../hooks/useHero';
import { Alert, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Search } from '../components/Dashboard/Search';

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
            <ListGroupItem key={id} action tag={Link} to={`/${id}`}>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Row>
      <Row className="mt-4">
        <Col sm={4}>
          <Search />
        </Col>
      </Row>
    </>
  );
};
