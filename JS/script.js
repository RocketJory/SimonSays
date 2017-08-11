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
var numSeq = 0;

function genSequence() {
	numSeq += 1;
	nextNum = Math.floor(Math.random()*(4));
	sequence.push(nextNum);
	console.log(sequence);
}

function doTimeout( i, seqLen ) {
	var bNum = sequence[i];
	var btnStr = simonBtns[bNum].substring(1);
	var btn = document.getElementById(btnStr);
	pressBtn( btn );
	var handle = setTimeout(function(){
		depressBtn( btn );
		i += 1;
		if ( i == seqLen ) {return false}
		doTimeout( i, seqLen );
	}, 500);
}

function showSequence() {
	doTimeout( 0, sequence.length );
}

function driveSequence() {
	playerClick = false;
	genSequence();
	showSequence();
}

function playAudio(audioID) {
	audio = document.getElementById(audioID.substring(1));
	audio.load();
	audio.play();
};

function pressBtn(btn) {
	console.log('pressed ' + btn.id);
	$(btn).css({'background-color':'white'});
	playAudio(audioClips['#'+btn.id]);
}
function depressBtn(btn) {
	console.log('depressed ' + btn.id);
	$(btn).css({'background-color':simonColors[btn.id]});
}

function playButton(el) {
	// Start game
	if (!gameOn) {
		$(el).removeClass('fa-play-circle');
		$(el).addClass('fa-pause-circle');
		driveSequence();
	// Pause game
	} else {
		$(el).removeClass('fa-pause-circle');
		$(el).addClass('fa-play-circle');
	}
	gameOn = !gameOn;
	console.log('gameOn = ' + gameOn)
}

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
			pressBtn(this);
		});
		$(simonBtns[i]).mouseup(function(){
			depressBtn(this);
		});
	};

	// play btn
	$('#start-btn').click(function(){
		playButton(this);
	});


});
