var header_card = document.getElementById('header_card');
var start = document.querySelector("#Start_Quiz");

var timer = document.getElementById('timer_status');
var question_section = document.querySelector("#questions");
var answer_result = document.querySelector("#answer_status");
var complete = document.querySelector("#completed_card");

// Timer that counts down from 75
var timeLeft = 75;
timer.textContent = "Time: "+timeLeft;
var timeInterval;

function startTimer() { 
    header_card.setAttribute("style", "display:none;");
    document.querySelector(".questionCards").setAttribute("style", "display:flex;");
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1        
        if (timeLeft > 0) {
            // Decrement `timeLeft` by 1
            timeLeft--;
         } else {
            stopTimer("timed_out");                      
        }
        // Set the `textContent` of `timer` to show the remaining seconds
        timer.textContent = "Time: "+timeLeft;
    }, 1000);
}

function stopTimer(reason){
    clearInterval(timeInterval);
    let message;
    if(reason === "timed_out"){
        message = "You Ran out of time!";
    }else if(reason === "finished"){
        message = "All Done!";
    }
    //Display results
    complete.querySelector("h1").textContent = message;
    complete.querySelector("p").textContent = "Your Score is "+timeLeft;
    complete.setAttribute("style", "display:flex;");
}

function adjustTimer(num){
    if(timeLeft > num){
        timeLeft = timeLeft-num;
    }else{
        timeLeft = 0;
    }    
}
 
start.addEventListener("click", startTimer);




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
            ["None of the above", "Wrong"]
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
            ["None of the above", "Wrong"]
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
  
  //
  function get_info(){
    let current_question = this.parentElement;
    
    current_question.setAttribute("data-status", "Answered");
    current_question.setAttribute("style", "display:none;");
        
    var res = this.getAttribute("data-answer");
    // if wrong reduce time by 15 seconds
    if(res === "Wrong") adjustTimer(15);
    //send the result message to the answer_result element  
    answer_result.innerHTML = "<hr />"+res+"!";
    setTimeout(function (){answer_result.innerHTML = ""}, 500);
    //Open the next question if it exists, if there are no more questions, stop the countdown (clear the interval)
    var nextUP = current_question.nextElementSibling;
    if(nextUP) {
        nextUP.setAttribute("style", "display:flex;");
    }else{
        stopTimer("finished");
    }
};