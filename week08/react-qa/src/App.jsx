import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";

import { Answer, Question } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";
import Questions from "./components/Questions";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm";
import DefaultLayout from "./components/DefaultLayout";
import NotFound from "./components/NotFound";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [questions, setQuestions] = useState([fakeQuestion]);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if (ans.id === answerId) {
          return new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score + 1);
        }
        else
          return ans;
      });
    })
  };

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if (ans.id === answer.id) {
          return new Answer(answer.id, answer.text, answer.email, answer.userId, answer.date, answer.score);
        }
        else
          return ans;
      });
    })
  };


  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter(ans => ans.id !== answerId);
    });
  }

  /* ROUTER EXAMPLE
    
  - /questions => tutte le domande
  - /question/:qid => domanda con id
  
  OPZIONE 1
  - /question/:qid/answers/new => nuova domanda
  - /question/:qid/answers/:aid/edit => modifica riposta
  
  OPZIONE 2
  -/answers/:aid/edit => modifica risposta
  
  - * => pagina not found
  */
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Questions questions={questions} />} />
        <Route path="/questions/:questionId" element={<QuestionDescription questions={questions} />} >
          <Route index element={<Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} updateAnswer={updateAnswer} deleteAnswer={deleteAnswer} />} />
          <Route path="answers/new" element={<AnswerForm addAnswer={addAnswer} />} />
          <Route path="answers/:answerId/edit" element={<EditAnswerForm updateAnswer={updateAnswer} answers={answers} />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Route>
    </Routes>
  );
}

export default App;