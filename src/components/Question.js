const Question = ({ question }) => {
  
  return (
    <div>
      <h2>How much dollars in hryvna?</h2>
      <div>
        <label htmlFor="question1">A lot</label>
        <input id="question1" name="question1" type="radio" />
      </div>
      <div>
        <label htmlFor="question2">Very little</label>
        <input id="question2" name="question2" type="radio" />
      </div>
      <div>
        <label htmlFor="question3">None</label>
        <input id="question3" name="question3" type="radio" />
      </div>
    </div>
  )
}

export default Question
