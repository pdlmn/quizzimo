const Question = ({ question, answers }) => {
  
  return (
    <div>
      <h2>How much dollars in hryvna?</h2>
      <div className="answers">
        <input id="answer1-1" name="question1" type="radio" />
        <label htmlFor="answer1-1">A lot</label>

        <input id="answer1-2" name="question1" type="radio" />
        <label htmlFor="answer1-2">Very little</label>

        <input id="answer1-3" name="question1" type="radio" />
        <label htmlFor="answer1-3">None</label>
      </div>
    </div>
  )
}

export default Question
