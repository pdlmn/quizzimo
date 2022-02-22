import uniqid from 'uniqid'

const Question = ({ name, questionText, answers, correctAnswer, handleChange, selectedAnswer }) => {
  const answerElements = answers.map((ans, i) => {
    const id = `${name}-${i}`
    return (
      <div key={uniqid()}>
        <input 
          type="radio" 
          id={id} 
          name={name} 
          value={ans}
          onChange={handleChange} 
          checked={ans === selectedAnswer}
        />
        <label htmlFor={id}>
          {ans}
        </label>
      </div>
    )
  })
  
  return (
    <div>
      <h2>{questionText}</h2>
      <div className="answers">
        {answerElements}
      </div>
    </div>
  )
}

export default Question
