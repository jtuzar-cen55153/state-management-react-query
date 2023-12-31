import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useUserFormSubmit } from '../useUserFormSubmit';
import { useAuth } from '../useAuth';

jest.mock('../useAuth');
jest.mock('react-router-dom');

describe('useUserFormSubmit', () => {
  const setToken = jest.fn();
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockImplementation(() => navigate);
  (useAuth as jest.Mock).mockImplementation(() => ({ setToken }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set token if successful', async () => {
    const mutateAsync = jest.fn().mockResolvedValue('token');

    const { result } = renderHook(() => useUserFormSubmit(mutateAsync));

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com', password: 'password' });
    });

    expect(setToken).toHaveBeenCalledWith('token');
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('should not set token if failure', async () => {
    const mutateAsync = jest.fn().mockRejectedValue(new AxiosError('error'));

    const { result } = renderHook(() => useUserFormSubmit(mutateAsync));

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com', password: 'password' });
    });

    expect(setToken).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
