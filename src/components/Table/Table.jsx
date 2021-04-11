import styles from './Table.module.css'
import ReactHtmlParser from 'react-html-parser';


const Table = (props) => {


  const trivia = [
      {
        category: "Entertainment: Video Games",
        type: "boolean",
        difficulty: "hard",
        question: "The first &quot;Metal Gear&quot; game was released for the PlayStation 1.",
        correct_answer: "False",
        users_answer:"correct",
        incorrect_answers: [
            "correct"
        ],
        
    },
    {
      category: "Science: Mathematics",
      type: "boolean",
      difficulty: "hard",
      question: "The binary number &quot;101001101&quot; is equivalent to the Decimal number &quot;334&quot;",
      correct_answer: "False",
      users_answer:"incorrect",
      incorrect_answers: [
          "incorrect"
      ],
      
    },
    {
      category: "Science: Mathematics",
      type: "boolean",
      difficulty: "hard",
      question: "The binary number &quot;101001101&quot; is equivalent to the Decimal number &quot;334&quot;",
      correct_answer: "False",
      users_answer:"incorrect",
      incorrect_answers: [
          "incorrect"
      ],
      
    },
    {
      category: "Science: Mathematics",
      type: "boolean",
      difficulty: "hard",
      question: "The binary number &quot;101001101&quot; is equivalent to the Decimal number &quot;334&quot;",
      correct_answer: "False",
      users_answer:"correct",
      incorrect_answers: [
          "incorrect"
      ],
      
    }
  ];

  console.log(trivia);



  return (
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
            Result
          </th>
        </tr>
      </thead>

      <tbody>

      {trivia.map((trivia, index)=> {
        return (
          <tr key={index} className={trivia.users_answer === "correct"? styles.correct: styles.incorrect} >
            <td>
            {index}
            
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
  } )}

      </tbody>
      
    </table>
  )
}

export default Table
