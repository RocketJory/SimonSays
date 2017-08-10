// +--------------------+
// |  Global variables  |
// +--------------------+
var playerClick = true;
var simonColors = {'top-left-btn':'#7cbd6e','top-right-btn':'#ab3f4f','bottom-left-btn':'#e3e085','bottom-right-btn':'#326e94'};
var audioOn = false;
var toggleUp = true;
var gameOn = false;

function playAudio(audio) {
	audio.load();
	audio.play();
};

window.addEventListener("load",function(event) {
	console.log('page loaded');

	// create objects
	var audio1 = document.getElementById('audio1');
	var audio2 = document.getElementById('audio2');
	var audio3 = document.getElementById('audio3');
	var audio4 = document.getElementById('audio4');
	var simonAudio = {'top-left-btn':audio1,'top-right-btn':audio2,'bottom-left-btn':audio3,'bottom-right-btn':audio4};
	var simonBtns = ["#top-left-btn","#top-right-btn","#bottom-left-btn","#bottom-right-btn"];

	// button listeners
	// Simon btns
	for (var i=0;i<simonBtns.length;i++) {
		$(simonBtns[i]).mousedown(function(){
			console.log(this.id);
			this.style.backgroundColor = 'white';
			playAudio(simonAudio[this.id]);
		});
		$(simonBtns[i]).mouseup(function(){
			this.style.backgroundColor = simonColors[this.id];
		});
	};

	// play btn
	$('#start-btn').click(function(){
		if (!gameOn) {
			$(this).removeClass('fa-play-circle');
			$(this).addClass('fa-pause-circle');
		} else {
			$(this).removeClass('fa-pause-circle');
			$(this).addClass('fa-play-circle');
		}
		gameOn = !gameOn;
		console.log('gameOn = ' + gameOn)
	});


});
