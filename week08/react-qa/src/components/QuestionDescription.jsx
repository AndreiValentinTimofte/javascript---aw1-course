import { Col, Row } from 'react-bootstrap';
import { Outlet, useParams } from 'react-router';

function QuestionDescription (props) {

  // const params = useParams();
  const { questionId } = useParams();

  const question = props.questions[questionId-1];

  return(
    <>
      {question ?
    <>
      <Row>
        <Col md={6} as='p'>
          <strong>Question #{question.id}:</strong>
        </Col>
        <Col md={6} as='p' className='text-end'>
          Asked by <span className='badge rounded-pill text-bg-secondary'>{question.email}</span>
        </Col>
      </Row>
      <Row>
        <Col as='p' className='lead'>{question.text}</Col>
      </Row>
      <Outlet/>
    </>:
      <p>Domanda non esistente!</p>}
    </>
  );
}

export default QuestionDescription;