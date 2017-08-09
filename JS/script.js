// +--------------------+
// |  Global variables  |
// +--------------------+
var playerClick = true;
var simonColors = {'top-left-btn':'#7cbd6e','top-right-btn':'#ab3f4f','bottom-left-btn':'#e3e085','bottom-right-btn':'#326e94'};
var audioOn = false;

function playAudio(audio) {
	audio.load();
	audio.play();
};

window.addEventListener("load",function(event) {
	console.log('page loaded');

	var audio1 = document.getElementById('audio1');
	var audio2 = document.getElementById('audio2');
	var audio3 = document.getElementById('audio3');
	var audio4 = document.getElementById('audio4');
	var simonAudio = {'top-left-btn':audio1,'top-right-btn':audio2,'bottom-left-btn':audio3,'bottom-right-btn':audio4};
	var topLeftBtn = document.getElementById("top-left-btn");
	var topRightBtn = document.getElementById("top-right-btn");
	var BottomLeftBtn = document.getElementById("bottom-left-btn");
	var BottomRightBtn = document.getElementById("bottom-right-btn");
	var simonBtns = [topLeftBtn,topRightBtn,BottomLeftBtn,BottomRightBtn];

	for (var i=0;i<simonBtns.length;i++) {
		simonBtns[i].addEventListener("mousedown",function(){
			this.style.backgroundColor = 'white';
			playAudio(simonAudio[this.id]);
		});
		simonBtns[i].addEventListener("mouseup",function(){
			this.style.backgroundColor = simonColors[this.id];
		});
	};

});
