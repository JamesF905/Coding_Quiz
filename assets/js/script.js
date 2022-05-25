var start = document.querySelector("#Start_Quiz");

var timer = document.getElementById('timer_status');
var question_section = document.querySelector("#questions");
var answer_result = document.querySelector("#answer_status");

// Timer that counts down from 75
var timeLeft = 75;

function countdown() {
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timer` to show the remaining seconds
        timer.textContent = "Time: "+timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timer` to an empty string
        timer.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000);
  }


 
start.addEventListener("click", countdown);
/*
function questions(correct){
    alert("triggered!!!!!");
    if (correct == true){
        question_section.innerHTML = "Correct!";
    }else{
        timeLeft = timeLeft-15;
        question_section.innerHTML = "Wrong!"; 
    }
}*/



wrong.addEventListener("click", function (){
    timeLeft = timeLeft-15;
    question_section.innerHTML = "Wrong!";
});






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
    var card = document.createElement("div");
    card.setAttribute("class", "questionCards");
    card.setAttribute("data-status", "Unanswered");

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

  var buttons = document.querySelectorAll(".answers_btn");
  for(i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", get_info);
  }
  
  function get_info(evt){
    this.parentElement.setAttribute("data-status", "Answered");
    this.parentElement.setAttribute("style", "display:none;");
    //this.currentNode.nextElementSibling.setAttribute("style", "display:block;");
    var toot = evt.target.getAttribute("data-answer");    
    answer_result.innerHTML = toot+"!";
    if(toot === "Correct"){   
    //close this one and open the next
    }else{
    timeLeft = timeLeft-15;    
    }   
    
};