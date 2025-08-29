import dayjs from 'dayjs';
import { useActionState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import { Link } from 'react-router';
import { useNavigate, useParams } from 'react-router';

export function EditAnswerForm(props){
  // useParam
  const params = useParams();
  const aId = parseInt(params.answerId); // è una stringa

  const answer = props.answers.find(ans => ans.id === aId); 

  return (
    <AnswerForm  answer={answer} updateAnswer={props.updateAnswer}/>
  );
}


export function AnswerForm(props) {
  
  const { questionId } = useParams();
  const navigate = useNavigate();


  const initialState = {
    text: props.answer?.text,
    email: props.answer?.email,
    date: props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
  }
  
  
  const handleSubmit = async(prevState, formData) =>{
    const answer = Object.fromEntries(formData.entries());
    
    // esempio validazione
    if (answer.text.trim() === ""){
      // errore
      answer.error = "La risposta non può essere vuota, perfavore sistemala";
      return answer;
    }
    // aggiungo uno risposta allo stato in App
    if (props.addAnswer)
      props.addAnswer(answer);
    else
      props.updateAnswer({id: props.answer.id, ...answer});

    navigate(`/questions/${questionId}`);
  };
  
  
  const [state, formAction] = useActionState(handleSubmit, initialState);

  return(
    <>    
    {state.error && <Alert variant="secondary">{state.error}</Alert>}  {/* se error eiste stampa l'errore */}
    <Form action={formAction} >
      <Form.Group className='mb-3'>
        <Form.Label>Text</Form.Label>
        <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text} ></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>E-mail</Form.Label>
        <Form.Control name="email" type="email" required={true} defaultValue={state.email}></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Date</Form.Label>
        <Form.Control name="date" type="date" required={true} min={dayjs()} defaultValue={state.date}></Form.Control>
      </Form.Group>
      {props.addAnswer && <Button variant='primary' type='submit'> Add </Button>}
      {props.updateAnswer && <Button variant='success' type='submit'> Update  </Button>}
      {" "}
      <Link className='btn btn-danger' to={`/questions/${questionId}`}>Cancel</Link>
    </Form>
    </>
  );
}

