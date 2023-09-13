import { Button, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useCreateHero } from '../../hooks/useHero';

export const Create = () => {
  const { mutateAsync, isLoading, isSuccess, isError } = useCreateHero();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));

    await mutateAsync({ name: data.hero as string });

    form.reset();
  };

  return (
    <Row className="my-3">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="hero">Hero name:</Label>
          <Input id="hero" name="hero" type="text" placeholder="Add new hero" />
        </FormGroup>
        <Button>Add Hero</Button>
        {isLoading && <span>creating hero...</span>}
        {isSuccess && <span>Hero created successfully ✅</span>}
        {isError && <span>Ups! it was an error 🚨</span>}
      </Form>
    </Row>
  );
};
