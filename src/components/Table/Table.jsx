

const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            Question
          </th>
          <th>
            correct answer
          </th>
          <th>
            result
          </th>
        </tr>
      </thead>

      <tbody>

        {/* //maps */}
          <tr>
            <td>
            {index}
            </td>

            <td>
              {trivia.question}
            </td>

            <td>
              {trivia.correct_answer}
            </td>

            
            {{ if(trivia.users_answer === "correct") {

                <div> J</div>
              } else {
                <div> X</div>
              }}}
          

          </tr>

      </tbody>
      
    </table>
  )
}

export default Table
