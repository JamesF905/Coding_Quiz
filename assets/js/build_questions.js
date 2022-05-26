const questions_obj = {
    Question_1 : {
        text: "Question 1 text",
        answers: [
            ["TEXT-c", "Correct"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"]
        ]
    },
    Question_2 : {
        text: "Question 2 text",
        answers: [
            ["TEXT-c", "Correct"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"]
        ]
    },
    Question_3 : {
        text: "Question 3 text",
        answers: [
            ["TEXT-c", "Correct"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"]
        ]
    },
    Question_4 : {
        text: "Question 4 text",
        answers: [
            ["TEXT-c", "Correct"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"]
        ]
    },
    Question_5 : {
        text: "Question 5 text",
        answers: [
            ["TEXT-c", "Correct"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"],
            ["TEXT", "Wrong"]
        ]
    }
};


for (var key in questions_obj) {
    //this creates the div tag, to hold the question, and the multiple choice answers, it also sets a data-variable and gives it a class
    var card = document.createElement("div");
    card.setAttribute("class", "questionCards");
    card.setAttribute("data-status", "Unanswered");

    //this creates the h1 tag in the card with the main question text from the questions_obj object 
    var q_text = document.createElement("h1");
    q_text.textContent = questions_obj[key].text;

    card.appendChild(q_text);
    
    var answers_array = questions_obj[key].answers;
    answers_array = shuffle(answers_array);
    
    answers_array.forEach(keys => {
        var btns = document.createElement("button");
        btns.setAttribute("class", "answers_btn");
        btns.textContent = keys[0];
        btns.setAttribute("data-answer", keys[1]);
        
        card.appendChild(btns);
    });

    question_section.appendChild(card);
}

  //shuffle the answers array using the Fisher-Yates (aka Knuth) Shuffle.

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  //set event listeners for all the multiple choice buttons, run the get_info function if they're clicked
  var buttons = document.querySelectorAll(".answers_btn");
  for(i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", get_info);
  }