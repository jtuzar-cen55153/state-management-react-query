import { renderHook, act } from '@testing-library/react-hooks';
import { useRegister } from '../useRegister'; // Import your custom hook
import { useCreateUserMutation } from '../../../../hooks/useUser';
import { useAuth } from '../../../../hooks/useAuth';
import { AxiosError } from 'axios';

jest.mock('../../../../hooks/useUser');
jest.mock('../../../../hooks/useAuth');

describe('useRegister', () => {
  it('should set token if successful', async () => {
    const setToken = jest.fn();
    (useCreateUserMutation as jest.Mock).mockImplementation(() => ({
      mutateAsync: async () => 'token',
    }));
    (useAuth as jest.Mock).mockImplementation(() => ({ setToken }));

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.register({ email: 'test@example.com', password: 'password' });
    });

    expect(setToken).toHaveBeenCalledWith('token');
  });

  it('should not set token if failure', async () => {
    const setToken = jest.fn();
    (useCreateUserMutation as jest.Mock).mockImplementation(() => ({
      mutateAsync: async () => new AxiosError('error'),
    }));
    (useAuth as jest.Mock).mockImplementation(() => ({ setToken }));

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.register({ email: 'test@example.com', password: 'password' });
    });

    expect(setToken).not.toHaveBeenCalledWith('token');
  });
});
