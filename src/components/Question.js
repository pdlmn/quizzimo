import uniqid from 'uniqid'

const Question = ({
  name,
  questionText,
  answers,
  correctAnswer,
  handleChange,
  selectedAnswer,
  isEnded
}) => {
  const answerElements = answers.map((ans, i) => {
    const id = `${name}-${i}`

    const isCorrect = ans === correctAnswer
    const isChecked = ans === selectedAnswer

    const colorCorrect = (isCorrect && "rgba(200, 230, 130, .7)")
    const colorCorrectSelected = (isCorrect && isChecked && "rgba(130, 250, 130, .9)")
    const colorIncorrect = (!isCorrect && isChecked && "rgba(250, 150, 150, .7)")
    console.log(ans)
    console.log(correctAnswer)

    const styles = {
      background: (colorIncorrect || colorCorrectSelected || colorCorrect),
    }

    if (isCorrect) console.log(styles)
    return (
      <div key={uniqid()}>
        <input 
          type="radio" 
          id={id} 
          name={name} 
          value={ans}
          onChange={!isEnded && handleChange} 
          checked={isChecked}
        />
        <label 
          htmlFor={id}
          style={styles}
        >
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
