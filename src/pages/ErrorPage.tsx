import { isAxiosError } from 'axios';
import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useLogoutUser } from '../hooks/useUser';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  const logout = useLogoutUser();

  return (
    <Container>
      {isRouteErrorResponse(error) && (
        <>
          <h1>Something went wrong</h1>
          <h2>{error.status}</h2>
          <h3>{error.data.sorry}</h3>
        </>
      )}
      {isAxiosError(error) && (
        <>
          <h1>Something went wrong</h1>
          <h2>{error.response?.statusText}</h2>
          <h3>{error.response?.data}</h3>
          <h3>{error?.message}</h3>
          {error.response?.status === 401 && <Button onClick={logout}>Revoke token</Button>}
        </>
      )}
      {!isRouteErrorResponse(error) && !isAxiosError(error) && <h1>Something went wrong</h1>}
    </Container>
  );
};
