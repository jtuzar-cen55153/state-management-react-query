import React, { FC, ReactNode } from 'react';
import { ListGroup } from 'reactstrap';
import { Hero } from '../interface/hero';

export const HeroesList: FC<{ horizontal?: boolean; items?: Hero[]; render: (item: Hero) => ReactNode }> = ({
  horizontal = false,
  items,
  render,
}) => <ListGroup horizontal={horizontal}>{items?.map(item => render(item))}</ListGroup>;
