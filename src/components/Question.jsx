import {Options} from "./Options.jsx";

export const Question = ({question,dispatch,answer}) => {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/>
        </div>
    )
}
