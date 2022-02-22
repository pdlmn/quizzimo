import { useState, useEffect } from 'react'
import uniqid from 'uniqid'
import he from 'he' // decodes html entities like &#60;
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import EndgameButton from './components/EndgameButton'

const App = () => {
  const [isStarted, setStart] = useState(false)
  const [isEnded, setEnd] = useState(false)
  const [restartCount, setRestartCount] = useState(0)
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

  const restartGame = () => { 
    setEnd(false) 
    setRestartCount(prevRestartCount => prevRestartCount + 1)
  }

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
        correctAnswer: he.decode(correct_answer)
      }
    })}

  const handleAnswerSelection = (e) => {
    if (isEnded) return
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

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=17&type=multiple')
      .then(res => res.json())
      .then(json => setQuestions(createQuestions(json.results)))
  }, [restartCount])

  return (
    <main className="container">
      { !isStarted && <StartScreen handleClick={startGame} /> }
      { isStarted && questionElements }
      { isStarted && 
        <EndgameButton 
          handleEndGame={endGame}
          handleRestart={restartGame}
          correctAnswers={countCorrectAnswers()}
          isEnded={isEnded}
          /> }
    </main>
  )
}

export default App
