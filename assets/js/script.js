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

function adjustTimer(num){
    if(timeLeft > num){
        timeLeft = timeLeft-num;
    }else{
        timeLeft = 0;
    }
    timer.textContent = "Time: "+timeLeft;    
}

function stopTimer(reason){
    clearInterval(timeInterval);
    clearAll();
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
    if(nextUP && timeLeft !=0) {
        nextUP.setAttribute("style", "display:flex;");
    }else{
        stopTimer("finished");
    }
};

function clearAll(){
    let all_questions = document.getElementsByClassName("questionCards"); 
    for(var i = 0; i < all_questions.length; i++){
        all_questions[i].style.display = "none";
    }
}

start.addEventListener("click", startTimer);