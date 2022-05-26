const questions_obj = {
    Question_1 : {
        text: "In which HTML tag do we put the JavaScript code?",
        answers: [
            ["The script tag", "Correct"],
            ["The rel tag", "Wrong"],
            ["The javascript tag", "Wrong"],
            ["The js tag", "Wrong"]
        ]
    },
    Question_2 : {
        text: "How would you call a function named “sum”?",
        answers: [
            ["sum()", "Correct"],
            ["call function sum()", "Wrong"],
            ["call sum()", "Wrong"],
            ["None of these", "Wrong"]
        ]
    },
    Question_3 : {
        text: "What is the correct syntax for referring to an external script called “myscript.js”?",
        answers: [
            ["<script href=\"myscript.js\">", "Wrong"],
            ["<script name=\"myscript.js\">", "Wrong"],
            ["<script src=\"myscript.js\">", "Correct"],
            ["All the answers are true", "Wrong"]
        ]
    },
    Question_4 : {
        text: "Where is the right place to insert JavaScript code?",
        answers: [
            ["The two sections <head> and <body> are correct", "Correct"],
            ["<body> section", "Wrong"],
            ["<head> section", "Wrong"],
            ["None of these", "Wrong"]
        ]
    },
    Question_5 : {
        text: "How would you write an IF condition in JavaScript?",
        answers: [
            ["if (a == 2)", "Correct"],
            ["if a == 2 else", "Wrong"],
            ["if a = 2", "Wrong"],
            ["if a = 2 then", "Wrong"]
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
    var i=1;
    answers_array.forEach(keys => {
        var btns = document.createElement("button");
        btns.setAttribute("class", "answers_btn");
        btns.textContent = i+") "+keys[0];
        btns.setAttribute("data-answer", keys[1]);        
        card.appendChild(btns);
    i++;
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