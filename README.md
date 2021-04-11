# A simple Trivia Game 

[live example](https://trivia-game-4wuwklnds-boopfer9k9.vercel.app/)

Goals - To make a simple trivia game with True/False answers. Retrive questions from an API endpoint. Project is to demonstrate:

  1. Use of API (using async, superior to promise. async uses generators truly waits for response.)
    * Simple error handling.
    * Correct formating of given data. // using an external NPM package React HTML parser for this. 
    * Mutating this data, adding another field per record.

  2. Modularity of react components
      * Button - props red, green, ?
      * Header - props left / center
      * Card
      * Table - props triva
  
---
## Todos stuff to work on complete. Used to show logic of construction. 
- [ ] 3 screens working intro screen, game, results.
- [ ] Global css reset, boxsizing
- [x] API working, simply get 10 questions.
- [x] Format question correctly 
- [x] State for user response / percentage of questions asked
- [ ] add icons?
- [ ] feedback to correct / incorrect responses. Perhaps an overlay with a big :x: or :+1: checkmark :white_check_mark:?
- [x] Results screen
  - [x] Summery of total questions asked as a table? 
- [x] reset game, a bit hacky using a form with default settings to reset entire game.
- [ ] refactor make everything a component. 
- [ ] add animations?
- [ ] clean up, remove all comments, unused code.

</br>

## Summery of project: 

* Not happy with being able to use react dev tools and view answers. Would correct this with the server and make these another endpoint. 
* Using React HTML parser. Much easier than creating a /regex replace for each of the HTML codes. </p>

