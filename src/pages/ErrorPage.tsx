import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>Something went wrong</p>
      </>
    );
  }
  return <p>Something went wrong</p>;
};
