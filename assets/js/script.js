var header_card = document.getElementById('header_card');
var start = document.getElementById("Start_Quiz");
var submit = document.getElementById("form_submit");
var go_back = document.getElementById("go_back");
var clear_highscores = document.getElementById("clear_highscores");
var timer = document.getElementById('timer_status');
var question_section = document.getElementById("questions");
var answer_result = document.getElementById("answer_status");
var complete = document.getElementById("completed_card");
var initials = document.getElementById("initials");
var highscores = document.getElementById("highscores");
var hs_list = highscores.querySelector("ul");
var veiw_highscores = document.getElementById("high_scores");


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
    let message;
    if(reason === "timed_out"){
        message = "You Ran out of time!";
    }else if(reason === "finished"){
        message = "All Done!";
    }
    //Display results
    complete.querySelector("h1").textContent = message;
    complete.querySelector("p").textContent = "Your Score is "+timeLeft;
    clearAll(complete);
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
    if(timeLeft == 0){
        stopTimer("timed_out");
    }else if(nextUP) {
        nextUP.setAttribute("style", "display:flex;");
    }else{
        stopTimer("finished");
    }
};

function clearAll(target){
    let all_cards = document.getElementById('questions').querySelectorAll("div"); 
    for(var i = 0; i < all_cards.length; i++){
        all_cards[i].style.display = "none";
    }
    if(target){
        target.setAttribute("style", "display:flex;");
    }
}

function highScores(event){
    event.preventDefault();
/*
    let player_score = [ 
        {num : 1, app:'helloworld',message:'message'}
    ]*/



    
    let player_score = [initials.value.trim(), timeLeft];
    let scores_array = JSON.parse(localStorage.getItem("player_scores"));    
    if (scores_array !== null) {
        scores_array.push(player_score);
    } else {
        scores_array = [player_score];
    }
    localStorage.setItem("player_scores", JSON.stringify(scores_array));
    
    timeLeft = 75; 
    timer.textContent = "Time: "+timeLeft;
    initials.value = "";

    clearAll(highscores);
    render_hs();
}

function render_hs(){    
    var hs = JSON.parse(localStorage.getItem("player_scores"));
    if (hs !== null) {
        hs_list.textContent = "";
        for(i=0; i<hs.length; i++){
            var li = document.createElement("li");
            li.textContent = hs[i][0]+" - "+hs[i][1];
            hs_list.appendChild(li);
        }
    }   
}

start.addEventListener("click", startTimer);
submit.addEventListener("click", highScores);
veiw_highscores.addEventListener("click", function (){clearAll(highscores); render_hs()});
go_back.addEventListener("click", function (){clearAll(header_card);});
clear_highscores.addEventListener("click", function(){localStorage.clear(); hs_list.innerHTML = "";});