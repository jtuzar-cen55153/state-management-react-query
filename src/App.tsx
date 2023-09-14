import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { EditHeroPage } from './pages/EditHeroPage';
import { DashboardPage } from './pages/DashboardPage';
// import { HeroesPage } from './pages/HeroesPage';
import { Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';

const HeroesPage = lazy(() => import('./pages/HeroesPage').then(({ HeroesPage }) => ({ default: HeroesPage })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/heroes',
        element: (
          <Suspense fallback={<Spinner />}>
            <HeroesPage />
          </Suspense>
        ),
      },
      {
        path: '/:id',
        element: <EditHeroPage />,
      },
    ],
  },
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
