import { useState, useEffect} from 'react';

import styles from './App.module.css';



function App() {

  const [trivia, setTrivia] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questionNum, setQuestionNum] = useState(0); //users current question number
  const [score, setScore] = useState(0); //users current score




  useEffect(()=> {
    setLoading(true);
    const fetchTrivia = () => {
      return fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    
      .then((res) => res.json())
      .then((data) => {
        
        const [...questions] = data.results;
        questions.forEach(question => question.users_answer="" )
        //console.log("questions: ", questions)
        setTrivia(questions);
        //console.log("this is state:",trivia);
        setLoading(false); 
        //console.log("loading is:",loading);
         
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError('Fetching Trivia Questions Failed')
      });
    }
    fetchTrivia();
  }, []);

  

const btnHandler = (answer) => {
  
  setQuestionNum(questionNum+1);

  if(answer === trivia[questionNum].correct_answer.toLowerCase()) {
    console.log("thats correct jack");
    setScore(score+1);
    trivia[questionNum].users_answer="correct";
  }
  else {
    console.log("Sorry thats wrong")
    trivia[questionNum].users_answer="wrong";
  }
    
}

//console.log("after increment:",questionNum);





  if(loading) {
    //console.log(loading);
    return (
    <h2> loading... </h2>
    )
  }

  if(error !== '') {
    return <p> {error}</p>
  }


 for(;questionNum < trivia.length;) 
 {
  return (
    <div className={styles.App}>
        
          <div className={styles.container}>
            
            <div className={styles.heading}>
              
              <div className={styles.headingsub}>
                Question {questionNum+1} of {trivia.length} Your Score is: {score}/{trivia.length}
                <br/> <br/>
                Category---: 
              </div>
              {trivia && trivia[questionNum].category}
            
            </div>
            
            <div className={styles.card}>
              <div className={styles.question}>
                <span className={styles.questionsubscript}>Q: </span>
                {trivia && trivia[questionNum].question}
                This is the answer:{trivia && trivia[questionNum].correct_answer}
              </div>
            </div>

            <div className={styles.btn_container}>
              <button className={`${styles.btn} ${styles.btn_red}`} onClick={()=>btnHandler("true")}>True</button>
              <button className={`${styles.btn} ${styles.btn_green}`} onClick={()=>btnHandler("false")}>False</button>
              
            </div>


        </div>
  
    </div>
  )
 }
  
};


export default App;
