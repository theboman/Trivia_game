import './Table.css'
import ReactHtmlParser from 'react-html-parser';
import { motion } from 'framer-motion';


const Table = ({trivia}) => {
  
  return (
    <>
    
    <table>
      <thead>
        <tr>
          <th className="table--row--num">
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
            <motion.tr 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .2, duration: .4 }}
              key={index} 
              className={trivia.users_answer === "Correct"? "table--correct": "table--incorrect"} >
              <td>
              {index+1}
              
              </td>

              <td className="table--question">
                {ReactHtmlParser(trivia.question)}
              </td>

              <td>
                {trivia.correct_answer}
                
              </td>

              <td >
                {trivia.users_answer}


              </td>
            </motion.tr>
          )
        })}
      </tbody>
      
    </table>
    </>
  )
}

export default Table
