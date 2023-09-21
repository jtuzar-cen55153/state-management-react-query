import { FC } from 'react';
import { Alert, Button, Col, Form, Input, Row, UncontrolledAlert } from 'reactstrap';
import { useEditHero } from './hooks/useEditHero';
import { useNavigate } from 'react-router-dom';

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
          <span>
            Hero name: <b>{selectedHero.name}</b>
          </span>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Input name="hero" type="text" placeholder="Update this Hero" required />
            {isLoading && <Alert color="info">Updating hero...</Alert>}
          </Col>
        </Row>
        <Row className="my-3">
          {isSuccess && <UncontrolledAlert color="success">Hero Hero successfully ✅</UncontrolledAlert>}
          {isError && <UncontrolledAlert color="danger">Ups! it was an error 🚨</UncontrolledAlert>}
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
