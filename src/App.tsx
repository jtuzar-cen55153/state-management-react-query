import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { HeroesPage } from './pages/HeroesPage';
import { Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';
import { ErrorPage } from './pages/ErrorPage';
import { NotFound } from './pages/NotFound';
import { loader as heroesLoader } from './pages/HeroesPage';

const EditHeroPage = lazy(() => import('./pages/EditHeroPage').then(({ EditHeroPage }) => ({ default: EditHeroPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
      suspense: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
            loader: heroesLoader(queryClient),
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
  { path: '*', element: <NotFound /> },
]);

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
