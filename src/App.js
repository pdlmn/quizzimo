import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const App = () => {
  const [isStarted, setStart] = useState(true)

  const startGame = () => {
    setStart(true)
  }

  return (
    <main className="container">
      { !isStarted && <StartScreen handleClick={startGame} /> }
      { isStarted && <Question /> }
    </main>
  )
}

export default App
