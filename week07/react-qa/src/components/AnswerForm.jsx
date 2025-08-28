import dayjs from 'dayjs';
import { useActionState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import { Answer } from '../models/QAModels.mjs';


function AnswerForm(props) {
  
  const initialState = {
    text: props.answer?.text,
    email: props.answer?.email,
    date: props.answer?.date ?? dayjs()
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
    // ritorno lo stato del form
    return initialState;
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
        <Form.Control name="date" type="date" required={true} min={dayjs().format('YYYY-MM-DD')} defaultValue={state.date.format('YYYY-MM-DD')}></Form.Control>
      </Form.Group>
      {props.addAnswer && <Button variant='primary' type='submit'> Add </Button>}
      {props.updateAnswer && <Button variant='success' type='submit'> Update  </Button>}
      {" "}
      <Button variant='danger' type="button" onClick={props.cancel}> Cancel </Button>
    </Form>
    </>
  );
}


export default AnswerForm;