import { useState, useEffect} from 'react';
import ReactHtmlParser from 'react-html-parser';

import {FiThumbsUp} from 'react-icons/fi'
import {FiThumbsDown} from 'react-icons/fi'

import styles from './App.module.css';
import Table from './components/Table/Table';



function App() {

  const [trivia, setTrivia] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questionNum, setQuestionNum] = useState(0); //users current question number
  const [score, setScore] = useState(0); //users current score
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false); //resets game
  

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
      }
    }
    if(reset){
      console.log("Reset was True, now set false");
      setReset(false)
    }
    console.log("fetching data!")
    
    
    fetchData();
    
  }, [reset]);

const scoreHandler = (answer) => {
  
  setQuestionNum(questionNum+1);

  if(answer === trivia[questionNum].correct_answer.toLowerCase()) {
    setScore(score+1);
    trivia[questionNum].users_answer="Correct"; 
  }
  else {
    trivia[questionNum].users_answer="Wrong";
  } 
}

const startHandler = () => {
  console.log("started");
  setStart(true);
}

const resetHandler = () => {
  console.log("reset!");
  setTrivia([]);
  setQuestionNum(0);
  setScore(0);
  setStart(false);
  setLoading(true);
  setReset(true);
}

// loading screen
// some sort of welcome / intro screen

  if (!start) {
    return (
      
      <div className={styles.App}>
           <div className={styles.container}>
            {loading ? <h2>Loading...</h2> : <h2>{error}</h2> }
            {!loading && (
              <>
            <p> these are the instructions </p>
              <button className={`${styles.btn} ${styles.btn_green}`} onClick={startHandler} >Start Game!</button>
              </>
            )}
           </div>

      </div>
      
    )
  }


  // screen 2


 for(;questionNum < trivia.length;) 
 {
  return (
    <div className={styles.App}>
        
          <div className={styles.container}>

            <div className={styles.score}>
                <div className={styles.score_box}>

                  <div className={styles.score_heading}>
                    Question:
                  </div>

                  <div className={styles.score_results}>
                    {questionNum+1} of {trivia.length}
                  </div>

                </div>

                <div className={styles.score_box}>

                    <div className={styles.score_heading}>
                      Score: 
                    </div>

                    <div className={styles.score_results}>
                        {score}/{trivia.length}
                    </div>

                </div> 
                
            </div>
            
            <div className={styles.heading_container}>
              
              <div className={styles.heading}>
                Category: 
              </div>

              <div className={styles.heading_sub}>
                {trivia && trivia[questionNum].category}
              </div>
            
            </div>
            
            <div className={styles.card}>
              <div className={styles.question}>
                Q: {trivia && ReactHtmlParser(trivia[questionNum].question)}
              </div>

              <p>
                This is the answer:{trivia && trivia[questionNum].correct_answer}
              </p>
            </div>

            <div className={styles.btn_container}>
              <button className={`${styles.btn} ${styles.btn_green}`} onClick={()=>scoreHandler("true")}><FiThumbsUp/> True</button>
              <button className={`${styles.btn} ${styles.btn_red}`} onClick={()=>scoreHandler("false")}><FiThumbsDown/> False</button>
            </div>


        </div>
  
    </div>
  )
 }

// screen 03 final results & reset

if (questionNum === trivia.length) {
  return (
  
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.heading_container}>
          <div className={styles.heading}>
            Results: {score} / {trivia.length}
          </div>
        </div>
        <Table trivia={trivia}/>
        <button className={`${styles.btn} ${styles.btn_green}`} onClick={resetHandler}>Play Again?</button>
        
      </div>
  </div>

  )
}
  
};


export default App;
