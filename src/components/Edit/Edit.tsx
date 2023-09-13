import { Hero } from '../../interface/hero';
import { useEditHero } from '../../hooks/useHero';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export const Edit = ({ id }: Pick<Hero, 'id'>) => {
  const { mutateAsync, isLoading, isSuccess, isError } = useEditHero();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const { hero } = Object.fromEntries(new FormData(form));

    if (hero) {
      await mutateAsync({ name: hero as string, id });

      form.reset();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Input name="hero" type="text" placeholder="Update this Hero" required />
            {isLoading && <span>updating Hero...</span>}
          </Col>
        </Row>
        <Row className="my-3">
          {isSuccess && <span>Hero updated successfully ✅</span>}
          {isError && <span>Ups! it was an error 🚨</span>}
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
