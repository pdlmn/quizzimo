const EndgameButton = ({ handleEndGame, handleRestart, correctAnswers, isEnded }) => {
    if (!isEnded) {
      return (
        <div className="btn-container">
          <button 
            className="btn" 
            onClick={handleEndGame}
          >
            Check answers
          </button>
        </div>
      )}
    else {
      return (
        <div className="btn-container">
          <p className="result">You answered correctly {correctAnswers}/5 questions.</p>
          <button 
            className="btn" 
            onClick={handleRestart}
          >
            Play again
          </button>
        </div>
      )}
}

export default EndgameButton
