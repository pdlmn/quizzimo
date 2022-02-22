import { useState, useEffect } from 'react'
import uniqid from 'uniqid'
import he from 'he' // decodes html entities like &#60;
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const App = () => {
  const [isStarted, setStart] = useState(true)
  const [questions, setQuestions] = useState([])

  const startGame = () => {
    setStart(true)
  }

  const mixAnswers = (corrAnswer, incorrAnswers) => {
    const randomSpot = Math.floor(Math.random() * questions.length)
    const answers = [...incorrAnswers]
    answers.splice(randomSpot, 0, corrAnswer)
    return answers
  }

  const createQuestions = () => 
    questions.map((questionObj, i) => {
      const {question, correct_answer, incorrect_answers} = questionObj
      const answers = mixAnswers(correct_answer, incorrect_answers)
      return (
        <Question 
          key={uniqid()}
          question={he.decode(question)}
          number={i}
          answers={answers.map(ans => he.decode(ans))}
        />
      )
    })

  createQuestions()

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(json => setQuestions(json.results))
  }, [])

  return (
    <main className="container">
      { !isStarted && <StartScreen handleClick={startGame} /> }
      { isStarted && createQuestions() }
    </main>
  )
}

export default App
