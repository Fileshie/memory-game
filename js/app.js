// Create Timer object - modified script from eastytimer.js library : https://albert-gonzalez.github.io/easytimer.js/

let timer = new Timer();
let beginGame = false;
// count Moves
let allCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let numOfStars = 3;
let moves = 0;
let numberOfMoves = $('.moves');
// Array to count open cards
let openCards = [];

function initializeGame() {
  timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
  });

//Restart the game when restart button is clicked

  $(".restart").click(restartGame);


// Shuffle method used to display randomn card positions when a new game is started

  allCards = shuffle(allCards);
  gameCardCssClasses();

  let cardElements = document.getElementsByClassName("card");

//Event listener for a card when a card is clicked

  for (var i = 0; i < cardElements.length; i++) {
      cardElements[i].addEventListener('click', checkCard, false);
  }
}

// Create the HTML for each card */
function gameCardCssClasses() {
  for (var i = 0; i < allCards.length; i++) {
    $("#deck").append('<li class="card"><i class="fa ' + allCards[i] + '"id="' + i + '"></i></li>');
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
  }

    return array;
}

//check to see if a match is found or not and call the appropriate functions

function checkCard (event) {
  var cardElement = event.target;

  openCards.push(cardElement);
  $(cardElement).addClass ("open show");
  showCard();

    if (beginGame === false) {
      beginGame = true;
      timer.start();
  }


  if (openCards.length === 2) {
    var card1 = $(openCards[0].children[0]).attr('class');
    var card2 = $(openCards[1].children[0]).attr('class');


    if (card1 === card2) {
      matchCard(openCards[0]);
      matchCard(openCards[1]);
    }

    else {
      hideCard(openCards[0]);
      hideCard(openCards[1]);
    }
    openCards = [];
    moves++;
    gameStars(moves);
    numberOfMoves.html(moves);

  }

  endGame();
}

// Created functions to add or remove classes on the html

function showCard(cardElement) {
  $(cardElement).addClass ("open show animated infinite flipInY");
}

function hideCard(cardElement) {
  $(cardElement).addClass ("unmatched show animated infinite shake");
  setTimeout(function() {
  $(cardElement).removeClass ("unmatched open show animated infinite shake");
  }, 500);
}

function matchCard(cardElement) {
  $(cardElement).addClass("match animated infinite bounce");
    setTimeout(function() {
  $(cardElement).removeClass ("animated infinite bounce");
}, 700);
}


// Remove stars depending on how many moves were made


function gameStars(moves) {

  if (moves > 8 && moves < 16) {
		$('.fa-star').eq(2).removeClass('fa-star').addClass('fa-star-o');
    numOfStars = 2;
	}

  else if (moves > 16) {
		$('.fa-star').eq(1).removeClass('fa-star').addClass('fa-star-o');
    numOfStars = 1;
	}
}


function restartGame () {
  $('#deck').empty();
  allCards = shuffle(allCards);
  gameCardCssClasses();
  openCards=[];
  $('.card').click(checkCard);
  beginGame = false;

  timer.stop();
  $('#timer').html("00:00:00");

  moves = 0;
  $('.moves').html("0");
  $('.stars').empty();
  resetStars(3);
}

function resetStars() {
    for (var i = 0; i < 3; i++) {
        $('.stars').append('<li><i class="fa fa-star"></i></li>');
    }
}

// End game
function endGame() {
  if ($('.match').length === 16) {
    timer.pause();
    swal({
      title: "Congratulations!",
      text: 'Total Moves: ' + moves + '\n' + 'Total Time: ' + timer.getTimeValues().toString() + '\n'+ 'score: ' + numOfStars + ' Stars',
      icon: "success",
      button: "Play Again",
    }).then(function (playAgain) {
		if (playAgain) {
			restartGame();
		}
	})
  }
}

initializeGame();
