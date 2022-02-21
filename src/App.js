import { useState } from 'react'
import StartScreen from './components/StartScreen'

const App = () => {
  const [isStarted, setIsStarted] = useState(false)
  return (
    <main className="container">
      <StartScreen />
    </main>
  )
}

export default App;
