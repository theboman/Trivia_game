import { useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';
import { motion, AnimatePresence } from 'framer-motion';

import {FiThumbsUp} from 'react-icons/fi'
import {FiThumbsDown} from 'react-icons/fi'

import './App.css';
import Table from './components/Table/Table';



function App() {

  const [game, setGame] = useState({
    trivia: [], //trivia questions put here
    loading: true,
    error: '',
    start: false, //trigger to start game
    score: 0, //users current score
    questionNum: 0, //current question
    btnDisabled: false //disable btns while given feedback
  }); 
  const [reset, setReset] = useState(false); //resets game


  
  useEffect(()=> {
    setReset(false)
    const temp = {...game};
    
    async function fetchData(){
      //setGame.loading=true;
      try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
      const data = await response.json()
      const [...questions] = data.results;
      questions.forEach(question => question.users_answer="" ) //adds the users response to the returned questions
      temp.trivia = questions;
      temp.loading = false; 
      setGame(temp);
      console.log("data done fetching!")
      } catch (err) {
        console.log(err);
        temp.error = err;
  
      }
    }
    console.log("fetching data!")
    fetchData();
    
  }, [reset]);


//disabled btns after answer to give feedback correct or wrong answer
useEffect(()=>{
  if(game.btnDisabled) {
    setTimeout(() => {
      const temp = {...game}
      temp.btnDisabled = false;
      setGame(temp);
    
    }, 1000);
  } 

},[game.btnDisabled])


const scoreHandler = (answer) => {
  
  const temp = {...game};
  if(answer === game.trivia[game.questionNum].correct_answer.toLowerCase()) {
    temp.score++;
    temp.trivia[game.questionNum].users_answer="Correct"; 
  }
  else {
    temp.trivia[game.questionNum].users_answer="Wrong";
  } 
  temp.questionNum++
  temp.btnDisabled = true;
  
  setGame(temp);
}

const startHandler = () => {
  const temp = {...game};
  temp.start = true;
  setGame(temp);
}

const resetHandler = () => {
  setReset(true);
  setGame({
    trivia: [],
    loading: true,
    error: '',
    start: false,
    score: 0,
    questionNum: 0,
    btnDisabled: false
  })
  console.log("value of reset", reset);
  debugger
}

// loading screen
// need to pass error message if there is one

if (!game.start) {
  return (
    
    <div className="App">
          <div className="container">
            
            {game.loading ? <div className="heading">Loading...</div> : (
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


function color_feedback () {
  
  if(game.trivia[game.questionNum-1].users_answer === 'Correct') {
    console.log("Correct");
    const fb_Class = "feedback fb_green";
    return fb_Class;
  } else {
    console.log("wrong, wrong and wrong!")
    const fb_Class = "feedback fb_red";
    return fb_Class;
  }
}

// screen 2
if(game.questionNum < game.trivia.length) {
  return (
    <div className="App" key={game.questionNum}>
        
          <div className="container">

            <div className="score">
                <div className="score_box">

                  <div className="score_heading">
                    Question:
                  </div>

                  <div className="score_results">
                    {game.questionNum+1} of {game.trivia.length}
                  </div>

                </div>

                <div className="score_box">

                    <div className="score_heading">
                      Score: 
                    </div>

                    <div className="score_results">
                        {game.score}/{game.trivia.length}
                    </div>

                </div> 
                
            </div>
            
            <div className="heading_container">
              
              <div className="heading">
                Category: 
              </div>

              <div className="heading_sub">
                {game.trivia && game.trivia[game.questionNum].category}
              </div>
            
            </div>
            
            <motion.div className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5, duration: .5 }}
            >
              <div className="question">
                Q: {game.trivia && ReactHtmlParser(game.trivia[game.questionNum].question)}
              </div>
            </motion.div>

            <div className="btn_container">
                            {game.btnDisabled?<AnimatePresence><motion.div
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: .2 }}
                                 key={game.questionNum-1}
                              className={`feedback ${color_feedback()}`} >{game.trivia[game.questionNum-1].users_answer}</motion.div></AnimatePresence> :""}

              <button 
                className={game.btnDisabled ? "btn btn_green disabled" : "btn btn_green"}
                onClick={()=>scoreHandler("true")}>
                  <FiThumbsUp/> True
              </button>

              <button 
                className={game.btnDisabled ? "btn btn_red disabled" : "btn btn_red"}
               
                onClick={()=>scoreHandler("false")}
                disabled={game.btnDisabled}>
                  <FiThumbsDown/> False
              </button>

            </div>


        </div>
        <div className="answer">
                This is the answer:{game.trivia && game.trivia[game.questionNum].correct_answer}
        </div>
  
    </div>
  )
 }

// screen 03 final results & reset

if (game.questionNum === game.trivia.length) {
  return (
  
    <div className="App">
      <div className="container">
        <div className="heading_container">
          <div className="heading center">
            Results: {game.score} / {game.trivia.length}
          </div>
        </div>
        <Table trivia={game.trivia}/>
        <button className="btn btn_green" onClick={resetHandler}>Play Again?</button>
      </div>
  </div>

  )
}
  
};


export default App;
