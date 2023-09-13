import { useParams } from 'react-router-dom';
import { View } from '../components/Edit/View';
import { Edit } from '../components/Edit/Edit';
import { Col, Row } from 'reactstrap';

export const EditHeroPage = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <View id={id} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Edit id={id} />
        </Col>
      </Row>
    </>
  );
};
