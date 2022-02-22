const EndgameButton = ({ handleEndGame, handleRestart, correctAnswers, isEnded }) => (
  <div className="btn-container">
    { isEnded && <p className="result">You answered correctly {correctAnswers}/5 questions.</p> }
    <button 
      className="btn" 
      onClick={isEnded ? handleRestart : handleEndGame}
    >
      { isEnded ? "Play again" : "Check answers" }
    </button>
  </div>
)

export default EndgameButton
