import { Col, Row } from 'reactstrap';
import { useGetHeroes, useGetHeroesObserver } from '../../hooks/useHero';
import { Hero } from '../../interface/hero';

export const View = ({ id }: Pick<Hero, 'id'>) => {
  // const getHeroes = useGetHeroes();
  const getHeroes = useGetHeroesObserver();

  const selectedHero = getHeroes.data?.find(hero => hero.id === id);

  if (!selectedHero) {
    return null;
  }

  return (
    <Row className="my-3">
      <Col>
        <h1>Edit hero: {selectedHero?.name}</h1>
        <span>
          Hero name: <b>{selectedHero?.name}</b>
        </span>
      </Col>
    </Row>
  );
};
