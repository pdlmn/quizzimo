import uniqid from 'uniqid'

const Question = ({ question, number, answers }) => {
  const answerElements = answers.map((ans, i) => {
    const id = `answer${number}-${i}`
    const name = `question${number}`
    return (
      <div key={uniqid()}>
        <input id={id} name={name} type="radio" />
        <label htmlFor={id}>{ans}</label>
      </div>
    )
  })
  
  return (
    <div>
      <h2>{question}</h2>
      <div className="answers">
        {answerElements}
      </div>
    </div>
  )
}

export default Question
