// +--------------------+
// |  Global variables  |
// +--------------------+
var playerClick = false;
var simonColors = {'top-left-btn':'#7cbd6e','top-right-btn':'#ab3f4f','bottom-left-btn':'#e3e085','bottom-right-btn':'#326e94'};
var simonBtns = ["#top-left-btn","#top-right-btn","#bottom-left-btn","#bottom-right-btn"];
var audioClips = {"#top-left-btn":"#audio1","#top-right-btn":"#audio2","#bottom-left-btn":"#audio3","#bottom-right-btn":"#audio4"};
var audioOn = false;
var gameOn = false;
var sequence = [];
var playerSequence = [];
var playerScore = 0;
var numSeq = 0;
var sliderVal = 50;
var timing = 1000;
var strictMode = true;


// ADD TO SEQUENCE
function genSequence() {
	numSeq += 1;
	nextNum = Math.floor(Math.random()*(4));
	sequence.push(nextNum);
	console.log(sequence);
}


// PLAYER SEQUENCE
function doTimeout( i, seqLen ) {
	var bNum = sequence[i];
	var btnStr = simonBtns[bNum].substring(1);
	var btn = document.getElementById(btnStr);
	pressBtn( btn );
	var handle = setTimeout(function(){
		depressBtn( btn );
		i += 1;
		if ( i == seqLen ) {
			playerClick = true
			return false
		};
		doTimeout( i, seqLen );
	}, timing);
}


// PLAY THE SEQUENCE
function showSequence() {
	playerClick = false;
	doTimeout( 0, sequence.length );
}


// DRIVER FOR GAME
function driveSequence() {
	// set timing
	sliderVal = document.getElementById("slider").value;
	timing = 250+(sliderVal/100)*1250;

	// initialize stuff
	playerClick = false;
	playerSequence = [];
	genSequence();
	// play sequence
	showSequence();
}


// PLAY AUDIO
function playAudio(audioID) {
	audio = document.getElementById(audioID.substring(1));
	audio.load();
	audio.play();
};


// HANDLE MISTAKE
function mistake() {
	playerClick = false;
	document.getElementById('center-btn').style.background = 'red';
	var handle = setTimeout(function(){

		document.getElementById('center-btn').style.background = 'grey';
		clearColors()

		// stop game if strict
		if ( strictMode ) {
			playButton('#start-btn');
		} else {
			// set timing
			sliderVal = document.getElementById("slider").value;
			timing = 250+(sliderVal/100)*1250;
			// update score
			playerScore = sequence.length - 1;
			updateScore(playerScore);
			// initialize stuff
			playerClick = false;
			playerSequence = [];
			showSequence();
		}

		// start again if not strict
	}, 1500);
};


function correct() {
	document.getElementById('center-btn').style.background = 'green';
	var handle = setTimeout(function(){
		document.getElementById('center-btn').style.background = 'grey';
		// continue game
		playerScore += 1;
		updateScore(playerScore);

		// check for win
		if (playerScore >= 20) {
			winner();
			return
		}
		driveSequence();
	}, 1500);
}


// BUTTON CONTROLLERS
function pressBtn(btn) {
	$(btn).css({'background-color':'white'});
	playAudio(audioClips['#'+btn.id]);

	bnum = simonBtns.indexOf('#'+btn.id);

	console.log(sliderVal);

	// if player has pressed button:
	if (playerClick) {
		// Add to player sequence
		playerSequence.push(bnum);
		console.log("player seq = " + playerSequence);
		console.log("game seq = " + sequence);

		// if all numbers
		mistakes = false;
		for (var i=0;i<playerSequence.length;i++) {
			// check if a mistake has been made
			if ( playerSequence[i] != sequence[i] ) {
				console.log("MISTAKE");
				mistakes = true;
				mistake();
			}
		}
		// Good sequence
		if ( playerSequence.length == sequence.length) {
			if ( !mistakes ) {
				correct();
			}
		}
	}
}


// WINNING
function winner() {
	$('#scoreboard').text("WIN");
	playButton('#start-btn');
}

function depressBtn(btn) {
	$(btn).css({'background-color':simonColors[btn.id]});
}


function updateScore(score) {
	$('#scoreboard').text(playerScore);
}


function newGame() {
	playerScore = 0;
	updateScore(playerScore);
	sequence = [];
	playerSequence = [];
}


function clearColors() {
	var bNum;
	var btnStr;
	var btn;
	for (var i=0; i<simonBtns.length; i++) {
		bNum = i;
		btnStr = simonBtns[bNum].substring(1);
		btn = document.getElementById(btnStr);
		depressBtn(btn);
	}
}


// PLAY BUTTON
function playButton(el) {
	// Start game
	if (!gameOn) {
		$(el).removeClass('fa-play-circle');
		$(el).addClass('fa-stop-circle');
		$('#start-btn').css({'color':'green'});
		newGame();
		driveSequence();
	// Stop game
	} else {
		$(el).removeClass('fa-stop-circle');
		$(el).addClass('fa-play-circle');
		clearColors();
		$('#start-btn').css({'color':'#565656'});
		playerClick = false
	}
	gameOn = !gameOn;
	console.log('gameOn = ' + gameOn)
}


// STRICT BUTTON
function strictButton(btn) {
	// turn strict mode off
	if ( strictMode ) {
		$('#strict-btn').css({'color':'#565656'});
	// turn strict mode on
	} else {
		$('#strict-btn').css({'color':'red'});
	}
	strictMode = !strictMode;
}


// MAIN STUFF
window.addEventListener("load",function(event) {
	console.log('page loaded');

	// create objects
	var audio1 = document.getElementById('audio1');
	var audio2 = document.getElementById('audio2');
	var audio3 = document.getElementById('audio3');
	var audio4 = document.getElementById('audio4');

	// button listeners
	// Simon btns
	for (var i=0;i<simonBtns.length;i++) {
		$(simonBtns[i]).mousedown(function(){
			if (playerClick===true) {
				pressBtn(this);
			};
		});
		$(simonBtns[i]).mouseup(function(){
			if (playerClick===true) {
				depressBtn(this);
			};
		});
	};

	sliderVal = document.getElementById("slider").value;

	// play btn
	$('#start-btn').click(function(){
		playButton(this);
	});

	// strict btn
	$('#strict-btn').click(function(){
		strictButton(this);
	});


});
