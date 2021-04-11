# A simple Trivia Game 

Goals - To make a simple trivia game with True/False answers. Retrive questions from an API endpoint. Project is to demonstrate:

  1. Use of API (using async, superior to promise. async uses generators truly waits for response.)
    * Simple error handling.
    * Correct formating of given data. // using an external NPM package React HTML parser for this. 
    * Mutating this data, adding another field per record.

  2. Modularity of react components
      * Button
      * Header
      * Card
      * Table?

  
---
## Todos stuff to work on complete. Used to show logic of construction. 
- [ ] 3 screens working intro screen, game, results.
- [x] API working, simply get 10 questions.
- [x] Format question correctly 
- [x] State for user response / percentage of questions asked
- [ ] feedback to correct / incorrect responses. Perhaps an overlay with a big :x: or :+1: checkmark :white_check_mark:?
- [ ] Results screen
  - [ ] Summery of total questions asked as a table? 
- [x] reset game, a bit hacky using a form with default settings to reset entire game.
- [ ] refactor make everything a component. 
- [ ] add animations?

</br>

## Summery of project: 
<p>
Not happy with being able to use react dev tools and view the state / answers. Would correct this with the server side and make these another endpoint in a real world situation. </p>
<p>Was thinking of creating a /regex replace for each of the HTML codes but easiter to use React HTML parser :). </p>

