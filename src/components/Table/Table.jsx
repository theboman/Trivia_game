import styles from './Table.module.css'
import ReactHtmlParser from 'react-html-parser';


const Table = ({trivia}) => {
  
  return (
    <>
    
    <table>
      <thead>
        <tr>
          <th className={styles.hdnum}>
            #
          </th>
          <th>
            Question
          </th>
          <th>
            Correct Answer
          </th>
          <th>
            Your Answer
          </th>
        </tr>
      </thead>

      <tbody>
        {trivia.map((trivia, index)=> {
          return (
            <tr key={index} className={trivia.users_answer === "correct"? styles.correct: styles.incorrect} >
              <td>
              {index+1}
              
              </td>

              <td className={styles.question}>
                {ReactHtmlParser(trivia.question)}
              </td>

              <td>
                {trivia.correct_answer}
                
              </td>

              <td >
                {trivia.users_answer === "correct"? <div> correct</div>: <div> X</div>}


              </td>
            </tr>
          )
        })}
      </tbody>
      
    </table>
    </>
  )
}

export default Table
