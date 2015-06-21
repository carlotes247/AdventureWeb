angular.module("app").controller("AudioCtrl", AudioCtrl);

Controller.$inject = [ "ngAudio" ];

function AudioCtrl ($scope, ngAudio) {
	var audio = ngAudio.load('audio/song2_long.mp3');
    var audio2 = ngAudio.load('audio/song2.mp3');
    $scope.audio3 = ngAudio.load('audio/song3.mp3');
    $scope.audio1 = audio;
    $scope.audio2 = audio2;

    var playSong = function (source) {
    	source.play();
    }

    //$scope.playSong() = playSong();
    //audio.play();
    audio.loop = true;
   	//playSong(audio2);
   	//$scope.playSong(audio2);
}
