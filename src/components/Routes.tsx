import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardPage } from '../pages/DashboardPage';
import { HeroesPage, loader } from '../pages/HeroesPage';
import { FC, Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';
import { useQueryClient } from '@tanstack/react-query';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ErrorPage } from '../pages/ErrorPage';
import { NotFound } from '../pages/NotFound';
import { useAuth } from '../hooks/useAuth';
import { Layout } from './Layout';
import { useAxios } from '../hooks/useAxios';

const EditHeroPage = lazy(() =>
  import('../pages/EditHeroPage').then(({ EditHeroPage }) => ({ default: EditHeroPage })),
);

export const Routes: FC = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const axios = useAxios();

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: 'heroes',
          children: [
            {
              index: true,
              loader: loader(queryClient, axios),
              element: <HeroesPage />,
            },
            {
              path: ':id',
              element: (
                <Suspense fallback={<Spinner />}>
                  <EditHeroPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      element: <Layout />,
      children: [
        {
          path: 'register',
          element: <RegisterPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ];

  const routesForPublic = [{ path: '*', element: <NotFound /> }];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...(!token ? routesForNotAuthenticatedOnly : []),
  ]);

  return <RouterProvider router={router} />;
};
