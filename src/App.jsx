import { useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import { motion } from 'framer-motion';

import {FiThumbsUp} from 'react-icons/fi'
import {FiThumbsDown} from 'react-icons/fi'

import './App.css';
import Table from './components/Table/Table';



function App() {

  const [trivia, setTrivia] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questionNum, setQuestionNum] = useState(0); //users current question number
  const [score, setScore] = useState(0); //users current score
  const [start, setStart] = useState(false); // trigger start of game
  const [reset, setReset] = useState(false); //resets game
  const [btnDisabled, setBtnDisabled] = useState(false); // disable btns, when user clicks
  

  useEffect(()=> {
    
    async function fetchData(){
      setLoading(true);
      try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
      const data = await response.json()
      const [...questions] = data.results;
      questions.forEach(question => question.users_answer="" ) //adds the users response to the returned questions
      setTrivia(questions);
      setLoading(false); 
      console.log("data done fetching!")
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
    if(reset){
      setReset(false)
    }
    console.log("fetching data!")
    
    if(trivia) {
    fetchData();
    }
    
  }, [reset]);


//disabled btns after answer to give feedback correct or wrong answer
useEffect(()=>{
  if(btnDisabled) {
    setTimeout(() => {
      setBtnDisabled(false);
    
    }, 2500);
  } 

},[btnDisabled])


const scoreHandler = (answer) => {
  console.log("button triggered:", answer);
  const temp = [...trivia];
  if(answer === trivia[questionNum].correct_answer.toLowerCase()) {
    setScore(score+1);

    temp[questionNum].users_answer="Correct"; 
    // debugger
  }
  else {
    temp[questionNum].users_answer="Wrong";
  } 
  setTrivia(temp);
  
  setQuestionNum(questionNum+1);
  console.log(trivia)
  setBtnDisabled(true);
}

const startHandler = () => {
  setStart(true);
}

const resetHandler = () => {
  setTrivia([]);
  setQuestionNum(0);
  setScore(0);
  setStart(false);
  setLoading(true);
  setReset(true);
}

// loading screen
// need to pass error message if there is one

if (!start) {
  return (
    
    <div className="App">
          <div className="container">
            
            {loading ? <div className="heading">Loading...</div> : (
              <>
              <div className="heading">Instructions:</div>
              <div className="card">
                <div className="question">
                <p> Play a game. A simple True/False challenge! 
                See if you can get all ten correct! </p>
                </div>
              </div>
              <button className="btn btn_green" onClick={startHandler} >Start Game!</button>
              </>
            )}
          </div>
    </div>

  )
}


// screen 2
if(questionNum < trivia.length) {
  return (
    <div className="App" key={questionNum}>
        
          <div className="container">

            <div className="score">
                <div className="score_box">

                  <div className="score_heading">
                    Question:
                  </div>

                  <div className="score_results">
                    {questionNum+1} of {trivia.length}
                  </div>

                </div>

                <div className="score_box">

                    <div className="score_heading">
                      Score: 
                    </div>

                    <div className="score_results">
                        {score}/{trivia.length}
                    </div>

                </div> 
                
            </div>
            
            <div className="heading_container">
              
              <div className="heading">
                Category: 
              </div>

              <div className="heading_sub">
                {trivia && trivia[questionNum].category}
              </div>
            
            </div>
            
            <motion.div className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5, duration: 1 }}
            >
              <div className="question">
                Q: {trivia && ReactHtmlParser(trivia[questionNum].question)}
              </div>

              
            </motion.div>

            <div className="btn_container">
              {btnDisabled? <div className="feedback">{trivia[questionNum].users_answer}</div>:""}
              <button 
                className={btnDisabled ? "btn btn_green disabled" : "btn btn_green"}
                onClick={()=>scoreHandler("true")}>
                  <FiThumbsUp/> True
              </button>

              <button 
                className={btnDisabled ? "btn btn_red disabled" : "btn btn_red"}
               
                onClick={()=>scoreHandler("false")}
                disabled={btnDisabled}>
                  <FiThumbsDown/> False
              </button>

            </div>


        </div>
        <div className="answer">

                This is the answer:{trivia && trivia[questionNum].correct_answer}
        </div>
  
    </div>
  )
 }

// screen 03 final results & reset

if (questionNum === trivia.length) {
  return (
  
    <div className="App">
      <div className="container">
        <div className="heading_container">
          <div className="heading">
            Results: {score} / {trivia.length}
          </div>
        </div>
        <Table trivia={trivia}/>
        <button className="btn btn_green" onClick={resetHandler}>Play Again?</button>
      </div>
  </div>

  )
}
  
};


export default App;
