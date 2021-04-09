import { useState, useEffect} from 'react';

import styles from './App.module.css';



function App() {

  const [trivia, setTrivia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questionNum, setQuestionNum] = useState(0);




  useEffect(()=> {
    setLoading(true);
    fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((res) => res.json())
      .then((data) => {
        
        const [...questions] = data.results;
        console.log("questions: ", questions)
        setTrivia(questions);
        console.log("this is state:",trivia);
        setLoading(false); 
        console.log("loading is:",loading);
         
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError('Fetching Trivia Questions Failed')
      });
  }, []);

  

const btnHandler = (answer) => {
  console.log("hello:", answer)
}





  if(loading) {
    console.log(loading);
    return (
    <h2> loading... </h2>
    )
  }

  if(error !== '') {
    return <p> {error}</p>
  }

 
  return (
    <div className={styles.App}>
        
          <div className={styles.container}>
            <div className={styles.heading}>
              
              <div className={styles.headingsub}>Category: </div>
              {trivia && trivia[0].category}
            
            </div>
            
            <div className={styles.card}>
              <div className={styles.question}>
              <span className={styles.questionsubscript}>Q: </span>{trivia && trivia[0].question}
              </div>
            </div>

            <div className={styles.btn_container}>
              <button className={`${styles.btn} ${styles.btn_red}`} onClick={()=>btnHandler(true)}>True</button>
              <button className={`${styles.btn} ${styles.btn_green}`} onClick={()=>btnHandler(false)}>False</button>
              
            </div>


        </div>
  
    </div>
  )
  
};


export default App;
