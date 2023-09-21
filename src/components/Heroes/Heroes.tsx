import { Link } from 'react-router-dom';
import { Alert, Button, Col, Form, FormGroup, Input, Label, ListGroupItem, Row, UncontrolledAlert } from 'reactstrap';
import { FC } from 'react';
import { useHeroes } from './hooks/useHeroes';
import { HeroesList } from '../HeroesList';

export const Heroes: FC = () => {
  const {
    onDelete,
    heroes,
    isLoading,
    isError,
    isDeleteLoading,
    isDeleteError,
    isDeleteSuccess,
    handleSubmit,
    isCreateHeroLoading,
    isCreateHeroSuccess,
    isCreateHeroError,
  } = useHeroes();

  return (
    <>
      <h1>Heroes</h1>

      {isLoading && <Alert color="info">Fetching a character...</Alert>}
      {isError && <Alert color="danger">Ups! it was an error</Alert>}

      {isDeleteLoading && <Alert color="info">Deleting hero...</Alert>}
      {isDeleteSuccess && (
        <UncontrolledAlert color="success">Hero deleted successfully ✅, go back home</UncontrolledAlert>
      )}
      {isDeleteError && <UncontrolledAlert color="danger">Ups! it was an error 🚨</UncontrolledAlert>}

      <Row className="my-3">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="hero">Hero name:</Label>
            <Input id="hero" name="hero" type="text" placeholder="Add new hero" required />
          </FormGroup>
          <Button>Add Hero</Button>
        </Form>
        <Row className="my-3">
          <Col>
            {isCreateHeroLoading && <Alert color="info">Creating hero...</Alert>}
            {isCreateHeroSuccess && <UncontrolledAlert color="success">Hero created successfully ✅</UncontrolledAlert>}
            {isCreateHeroError && <UncontrolledAlert color="danger">Ups! it was an error 🚨</UncontrolledAlert>}
          </Col>
        </Row>
      </Row>

      <HeroesList
        items={heroes}
        render={({ id, name }) => (
          <ListGroupItem key={id}>
            <Link to={`/heroes/${id}`}>{name}</Link>
            <Button className="mx-3" onClick={() => onDelete(id)}>
              x
            </Button>
          </ListGroupItem>
        )}
      />
    </>
  );
};
