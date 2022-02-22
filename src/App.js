import { useState, useEffect } from 'react'
import uniqid from 'uniqid'
import he from 'he' // decodes html entities like &#60;
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const App = () => {
  const [isStarted, setStart] = useState(true)
  const [isEnded, setEnd] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({
    question0: "",
    question1: "",
    question2: "",
    question3: "",
    question4: ""
  })

  const startGame = () => { setStart(true) }

  const endGame = () => { setEnd(true) }

  const restartGame = () => { setEnd(false) }

  const mixAnswers = (corrAnswer, incorrAnswers) => {
    const randomSpot = Math.floor(Math.random() * questions.length)
    const answers = [...incorrAnswers]
    answers.splice(randomSpot, 0, corrAnswer)
    return answers
  }

  const createQuestions = (questionsData) => { 
    return questionsData.map((questionObj, i) => {
      const {question, correct_answer, incorrect_answers} = questionObj
      const answers = mixAnswers(correct_answer, incorrect_answers)
      const name = `question${i}`
      return {
        id: uniqid(),
        name,
        questionText: he.decode(question),
        answers,
        correctAnswer: correct_answer
      }
    })}

  const handleAnswerSelection = (e) => {
    const {name, value} = e.target
    setSelectedAnswers(prevSelectedAnswers => ({
      ...prevSelectedAnswers,
      [name]: value
    }))
  }

  const questionElements = questions.map(question => {
    const {id, name, questionText, answers, correctAnswer} = question
    return (
      <Question 
        key={id}
        name={name}
        questionText={questionText}
        answers={answers.map(ans => he.decode(ans))}
        correctAnswer={correctAnswer}
        handleChange={handleAnswerSelection}
        selectedAnswer={selectedAnswers[name]}
        isEnded={isEnded}
      />
  )})

  const countCorrectAnswers = () => {
    const correctAnswers = questions.map(question => question.correctAnswer)
    const playerAnswers = Object.values(selectedAnswers)
    let correctAnswersCount = 0
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers.includes(playerAnswers[i])) {
        correctAnswersCount++
      }
    }
    return correctAnswersCount
  }

  const renderButton = () => {
    if (!isEnded) {
      return (
        <div className="btn-container">
          <button 
            className="btn" 
            onClick={endGame}
          >
            Check answers
          </button>
        </div>
      )}
    else {
      return (
        <div className="btn-container">
          <button 
            className="btn" 
            onClick={restartGame}
          >
            Play again
          </button>
          <p className="result">You answered correctly {countCorrectAnswers()}/5 questions</p>
        </div>
      )}
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(json => setQuestions(createQuestions(json.results)))
  }, [])
  console.log(questions)

  return (
    <main className="container">
      { !isStarted && <StartScreen handleClick={startGame} /> }
      { isStarted && questionElements }
      { isStarted && renderButton() }
    </main>
  )
}

export default App
