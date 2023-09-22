import { render } from '@testing-library/react';
import { HeroesList } from '../HeroesList';

const mockHeroes = [
  { id: '1', name: 'Hero 1' },
  { id: '2', name: 'Hero 2' },
  { id: '3', name: 'Hero 3' },
];

describe('<HeroesList />', () => {
  it('should render null', () => {
    const { container } = render(
      <HeroesList horizontal items={[]} render={item => <div key={item.id}>{item.name}</div>} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render for horizontal layout', () => {
    const { container } = render(
      <HeroesList horizontal items={mockHeroes} render={item => <div key={item.id}>{item.name}</div>} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render for vertical layout', () => {
    const { container } = render(
      <HeroesList items={mockHeroes} render={item => <div key={item.id}>{item.name}</div>} />,
    );

    expect(container).toMatchSnapshot();
  });
});
