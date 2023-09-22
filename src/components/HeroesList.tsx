import { FC, ReactNode } from 'react';
import { ListGroup } from 'reactstrap';
import { Hero } from '../interface/hero';

export const HeroesList: FC<{ horizontal?: boolean; items?: Hero[]; render: (item: Hero) => ReactNode }> = ({
  horizontal = false,
  items,
  render,
}) =>
  items && items.length > 0 ? (
    <ListGroup horizontal={horizontal} data-testid="heroes-list">
      {items?.map(item => render(item))}
    </ListGroup>
  ) : null;
