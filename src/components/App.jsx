import React, {useEffect, useReducer} from 'react';
// import DateCounter from "./DateCounter.jsx";
import Header from "./Header.jsx";
import {Content} from "./Content.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import {StartScreen} from "./StartScreen.jsx";
import {Question} from "./Question.jsx";
import {NextButton} from "./NextButton.jsx";
import {Progress} from "./Progress.jsx";
import {FinishedScreen} from "./FinishedScreen.jsx";
import {Footer} from "./Footer.jsx";
import {Timer} from "./Timer.jsx";

const initialState ={
    questions: [],
    status: "loading",
    index: 0,
    answer:null,
    points: 0,
    highScore: 0,
    secondRemaining: 600
}

function reducer(state,action){
    switch(action.type){
        case "dataReceived":
            return {...state,
                questions: action.payload,
                status: "ready",

        }
        case "dataFailed":
            return {...state,
                    status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active",


            }
        case "newAnswer":

            { const question = state.questions.at(state.index);

            return {...state,
                answer: action.payload,
                points: action.payload === question.correctOption ?  state.points + question.points : state.points
            }; }
        case 'nextQuestion':
            return {...state,
                index: state.index + 1,
                answer: null
            }
        case 'finished':
            return {...state,
                status: "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case 'restart':
            return {...initialState,
                questions: state.questions,
                status: "ready"
            }
        case 'tick':
            return {...state,
                secondRemaining: state.secondRemaining - 1,
                status: state.secondRemaining === 0 ? 'finished' : state.status};
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

function App() {

    const [{questions,status,index,answer,points,highScore,secondRemaining}, dispatch] = useReducer(reducer, initialState);
    const maxPossiblePoints = questions.reduce((acc, cur) =>
        acc + cur.points, 0
    )
    useEffect(() => {
        fetch(`http://localhost:8000/questions`)
            .then(res => res.json())
            .then(data => {
                dispatch({type: "dataReceived", payload: data});
            }).catch(dispatch({type:"dataFailed"}));
    }, []);

    return (
        <div className="app">
            <Header/>
            <Content>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen numQuestion={questions.length} dispatch={dispatch}/>}
                {status === "active" &&
                    <>
                        <Progress index={index} numQuestion={questions.length} points={points} maxPossiblePoints={maxPossiblePoints} />
                        <Question question={questions[index]}
                                  dispatch={dispatch}
                                  answer={answer}
                        />
                        <Footer>
                            <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
                            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={questions.length}/>
                        </Footer>

                    </>
                }
                {status === "finished" && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch}/>}

            </Content>

        </div>
    );
}

export default App;