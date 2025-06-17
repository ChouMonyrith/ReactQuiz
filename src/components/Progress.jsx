

export const Progress = ({index,numQuestion,points,maxPossiblePoints}) => {
    return (
        <header className="progress">

            <progress className="progress-bar" value={points} max={maxPossiblePoints}/>

            <p>
                Question <strong>{index + 1}</strong> {numQuestion}
            </p>
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>

        </header>
    )
}
