import { Link } from 'react-router-dom';
import { Alert, Button, Col, Form, Input, Label, ListGroupItem, Row, UncontrolledAlert } from 'reactstrap';
import { FC } from 'react';
import { useHeroes } from './hooks/useHeroes';
import { HeroesList } from '../HeroesList';
import { FormGroup } from '../ui/FormGroup';

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

      {isLoading && (
        <Alert color="info" data-testid="heroes-loading">
          Fetching a character...
        </Alert>
      )}
      {isError && (
        <Alert color="danger" data-testid="heroes-error">
          Ups! it was an error
        </Alert>
      )}

      {isDeleteLoading && (
        <Alert color="info" data-testid="heroes-delete-loading">
          Deleting hero...
        </Alert>
      )}
      {isDeleteSuccess && (
        <UncontrolledAlert color="success" data-testid="heroes-delete-success">
          Hero deleted successfully ✅, go back home
        </UncontrolledAlert>
      )}
      {isDeleteError && (
        <UncontrolledAlert color="danger" data-testid="heroes-delete-error">
          Ups! it was an error 🚨
        </UncontrolledAlert>
      )}

      <Row className="my-3">
        <Form onSubmit={handleSubmit}>
          <FormGroup
            name="hero"
            label="Hero name:"
            inputType="text"
            placeholder="Add new hero"
            required
            isInvalid={!isCreateHeroLoading && !isCreateHeroSuccess && isCreateHeroError}
            errorMessage="Ups! it was an error 🚨"
          />
          <Button>Add Hero</Button>
        </Form>
        <Row className="my-3">
          <Col>
            {isCreateHeroSuccess && (
              <UncontrolledAlert color="success" data-testid="heroes-add-success">
                Hero created successfully ✅
              </UncontrolledAlert>
            )}
          </Col>
        </Row>
      </Row>

      <HeroesList
        items={heroes}
        render={({ id, name }) => (
          <ListGroupItem key={id}>
            <Link to={`/heroes/${id}`}>{name}</Link>
            <Button className="mx-3" onClick={() => onDelete(id)} data-testid={`heroes-delete-button-${id}`}>
              x
            </Button>
          </ListGroupItem>
        )}
      />
    </>
  );
};
