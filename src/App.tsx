import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EditHeroPage } from './pages/EditHeroPage';
import { DashboardPage } from './pages/DashboardPage';
// import { HeroesPage } from './pages/HeroesPage';
import { Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';
import { ErrorPage } from './pages/ErrorPage';
import { NotFound } from './pages/NotFound';

const HeroesPage = lazy(() => import('./pages/HeroesPage').then(({ HeroesPage }) => ({ default: HeroesPage })));

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
            element: (
              <Suspense fallback={<Spinner />}>
                <HeroesPage />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: <EditHeroPage />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

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

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </QueryClientProvider>
);
