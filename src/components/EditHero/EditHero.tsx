import { FC } from 'react';
import { Alert, Button, Col, Form, Row, UncontrolledAlert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useEditHero } from './hooks/useEditHero';
import { FormGroup } from '../ui/FormGroup';

export const EditHero: FC = () => {
  const { selectedHero, handleSubmit, isLoading, isSuccess, isError } = useEditHero();
  const navigate = useNavigate();

  if (!selectedHero) {
    return <h1>No hero found!</h1>;
  }

  return (
    <>
      <Row className="my-3">
        <Col>
          <h1>Edit hero: {selectedHero.name}</h1>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup
              name="hero"
              label="Update name:"
              placeholder="Update this Hero"
              required
              isInvalid={isError}
              errorMessage="Ups! it was an error 🚨"
            />
            {isLoading && <Alert color="info">Updating hero...</Alert>}
          </Col>
        </Row>
        <Row className="my-3">
          {isSuccess && <UncontrolledAlert color="success">Hero Hero successfully ✅</UncontrolledAlert>}
          <Col sm={2}>
            <Button color="secondary" outline onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Col>
          <Col sm={2}>
            <Button>Update Hero</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
