const StartScreen = ({ handleClick }) => {
  
  return (
    <div className="start-screen">
      <h1>Quizzimo</h1>
      <p>Test your knowledge!</p>
      <button onClick={handleClick}>Start quizz</button>
    </div>
  )
}

export default StartScreen
