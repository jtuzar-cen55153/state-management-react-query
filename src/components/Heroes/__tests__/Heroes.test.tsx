import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Use MemoryRouter for routing testing
import { useHeroes } from '../hooks/useHeroes';
import { Heroes } from '../Heroes';

const mockHeroes = [
  {
    id: 1,
    name: 'Spiderman',
  },
  {
    id: 2,
    name: 'Wolverine',
  },
];

const onDelete = jest.fn();
const useHeroMock = {
  onDelete,
  heroes: [],
  isLoading: false,
  isError: false,
  isDeleteLoading: false,
  isDeleteError: false,
  isDeleteSuccess: false,
  handleSubmit: jest.fn(),
  isCreateHeroLoading: false,
  isCreateHeroSuccess: false,
  isCreateHeroError: false,
};

jest.mock('../hooks/useHeroes');

describe('<Heroes />', () => {
  describe('#render', () => {
    it('should render heroes', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, heroes: mockHeroes }));

      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-list')).toBeInTheDocument();
    });

    it('should render loading for heroes', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isLoading: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-loading')).toBeInTheDocument();
    });

    it('should render error for heroes', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isError: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-error')).toBeInTheDocument();
    });

    it('should render error for deleting hero', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isDeleteError: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-delete-error')).toBeInTheDocument();
    });

    it('should render loading for deleting hero', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isDeleteLoading: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-delete-loading')).toBeInTheDocument();
    });

    it('should render success for deleting hero', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isDeleteSuccess: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-delete-success')).toBeInTheDocument();
    });

    it('should render success for adding a new hero', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isCreateHeroSuccess: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('heroes-add-success')).toBeInTheDocument();
    });

    it('should render error for adding a new hero', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, isCreateHeroError: true }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      expect(getByTestId('form-group-feedback')).toBeInTheDocument();
    });
  });
  describe('#onDelete', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call onDelete if submit a form', () => {
      (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, heroes: mockHeroes }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Heroes />
        </BrowserRouter>,
      );

      fireEvent.click(getByTestId('heroes-delete-button-1'));

      expect(onDelete).toHaveBeenCalledWith(1);
    });

    describe('#handleSubmit', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should call onDelete if submit a form', () => {
        (useHeroes as jest.Mock).mockImplementation(() => ({ ...useHeroMock, heroes: mockHeroes }));
        const { getByTestId } = render(
          <BrowserRouter>
            <Heroes />
          </BrowserRouter>,
        );

        fireEvent.click(getByTestId('heroes-delete-button-1'));

        expect(onDelete).toHaveBeenCalledWith(1);
      });
    });
  });
});
