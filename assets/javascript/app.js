$(document).ready(function() {

var initialStart;
var gameHTML;
var counter = 30;

var questionArray = ["Who has the NBA record for career points?", "Who has the most NBA championships in a career?", "How many NBA teams are there in California?"];

var answerArray = [["Kareem Abdul-Jabar", "Michael Jordan", "LeBron James", "Dirk Nowitzki"], ["Michael Jordan", "Shaquille O'Neal", "Bill Russell", "Karl Malone"], ["1", "2", "3", "4"]];

var correctAnswers = ["A. Kareem Abdul-Jabar", "C. Bill Russell", "D. 4"];

var imageArray = ["<img class='center-block img-right' src='assets/images/Kareem-Abdul-Jabar.jpg' />", "<img class='center-block img-right' src='assets/images/Bill-Russell.jpg' />", "<img class='center-block img-right' src='assets/images/Caliteams.png'"];

var questionCounter = 0;
var selectedAnswer;
var timeClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

function initialStart() {
    startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
$(".mainArea").html(startScreen);
}

initialStart();

$("body").on("click", ".start-button", function(event) {
    generateHTML();
    timeWrapper();
});

$("body").on("click", ".answer", function(event) {
    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
        clearInterval(timeClock);
        generateWin();
    } else {
        clearInterval(timeClock);
        generateLoss();
    }
});

$("body").on("click", ".reset-button", function(event) {
    resetGame();
});

function timeoutLoss() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setInterval(wait, 4000);
};

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainArea").html(gameHTML);
    setInterval(wait, 4000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setInterval(wait, 4000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 2) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timeWrapper() {
    timeClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(timeClock);
            timeoutLoss();
        }
        if (counter > 0) {
            counter--;
        };
        $(".timer").html(counter);
    }
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timeWrapper();
}

});