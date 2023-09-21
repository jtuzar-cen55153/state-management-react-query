import axios from 'axios';
import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { STORAGE_KEY } from '../contexts/AuthContext';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  const { setToken } = useAuth();

  const handleClick = () => {
    setToken('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <Container>
      {isRouteErrorResponse(error) && (
        <>
          <h1>Something went wrong</h1>
          <h2>{error.status}</h2>
          <h3>{error.data.sorry}</h3>
        </>
      )}
      {axios.isAxiosError(error) && (
        <>
          <h1>Something went wrong</h1>
          <h2>{error.response?.statusText}</h2>
          <h3>{error.response?.data}</h3>
          {error.response?.status === 401 && <Button onClick={handleClick}>Revoke token</Button>}
        </>
      )}
      {!isRouteErrorResponse(error) && !axios.isAxiosError(error) && <p>Something went wrong</p>}
    </Container>
  );
};
