export const StartScreen = ({numQuestion,dispatch}) => {
    return (
        <div className="start">
            <h2>Welcome to React Quiz!</h2>
            <h3>
                {typeof numQuestion === "number" && numQuestion > 0
                    ? `${numQuestion} question${numQuestion > 1 ? "s" : ""} to test your mastery`
                    : "Loading questions..."}
            </h3>
            <button className="btn btn-ui" onClick={() => dispatch({type:"start"})}>Let's Start</button>
        </div>
    )
}
