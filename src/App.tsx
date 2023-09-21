import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import { Routes } from './components/Routes';
import AxiosProvider from './contexts/AxiosContext';

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
    <AuthProvider>
      <AxiosProvider>
        <Routes />
      </AxiosProvider>
    </AuthProvider>
  </QueryClientProvider>
);
