import React, { useReducer, useEffect, useState, createContext, useContext } from 'react';


const AppContext = createContext();


const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John Doe', score: 0 });
  const value = {
    user,
    setUser,
    quizSettings: { timePerQuestion: 30, totalQuestions: 5 },
  };
  return <AppContext.Provider value={value}>
           {children}
         </AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);
const initialState = {
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  timeLeft: 30,
  isQuizComplete: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      const isCorrect = action.payload.isCorrect;
      return {
        ...state,
        answers: [...state.answers, action.payload.answer],
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeLeft: 30,
      };
    case 'TICK':
      return { ...state, timeLeft: state.timeLeft - 1 };
    case 'TIME_UP':
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, timeLeft: 30 };
    case 'QUIZ_COMPLETE':
      return { ...state, isQuizComplete: true };
    default:
      return state;
  }
};


const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Shakespeare', 'Dickens', 'Tolstoy', 'Hemingway'],
    correctAnswer: 'Shakespeare',
  },
];

const Quiz = () => {
  const { quizSettings } = useAppContext();
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    timeLeft: quizSettings.timePerQuestion,
  });

  const { currentQuestionIndex, timeLeft, isQuizComplete } = state;
  const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        dispatch({ type: 'TICK' });
      } else {
        dispatch({ type: 'TIME_UP' });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    } else {
      dispatch({ type: 'QUIZ_COMPLETE' });
    }
  }, [currentQuestionIndex]);


  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    dispatch({ type: 'ANSWER_QUESTION', payload: { answer, isCorrect } });
  };
  if (isQuizComplete) {
    return <div>Your score: {state.score}</div>;
  }

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div>
        {currentQuestion.options.map((option) => (
          <button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p>Time left: {timeLeft} seconds</p>
    </div>
  );
};


const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <h1>Quiz App</h1>
        <Quiz />
      </div>
    </AppProvider>
  );
};
export default App;