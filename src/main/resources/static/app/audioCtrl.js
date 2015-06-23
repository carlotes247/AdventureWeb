angular.module("app").controller("AudioCtrl", AudioCtrl);

AudioCtrl.$inject = [ "$scope" , "ngAudio" , "$timeout" , "audiosService" , "$interval"];

function AudioCtrl ($scope, ngAudio, $timeout, audiosService, $interval) {
    var audios = [];
	var audio = ngAudio.load('audio/song2_long.mp3');
    var audio2; //= ngAudio.load('audio/song2.mp3');
    $scope.audio3 = ngAudio.load('audio/song3.mp3');
    $scope.audio1 = audio;
    $scope.audio2 = audio2;

    var playSong = function (source) {
    	source.play();
    }

    getAudiosFromService = function() {
        timeout1 = $timeout(function() {
          audios = audiosService.audios;
          console.log("getAudiosFromService called! The audios are: ");
          console.log(audios);

        }, 500);
      }

      addAudiosToSlides = function() {
        timeout2 = $timeout(function() {
         
            var audio0 = audios[0];
            var audio1 = audios[1];
            var audio2 = audios[2];

            console.log("addAudiosToSlides called!");
            console.log("Audios to add are: ");
            console.log(audio0.audio);

            //audio = ngAudio.load(audio0.audio);
            //$scope.audio1 = ngAudio.load(audio0.audio);
            audio2 = ngAudio.load(audio1.audio);
            //$scope.audio3 = ngAudio.load(audio2.audio);

            /*$scope.addSlide(audio0.audio, audio0.audioDescription);
            $scope.addSlide(audio1.audio, audio1.audioDescription);
            $scope.addSlide(audio2.audio, audio2.audioDescription);
            */

            //audio.loop = true;
            //audio.play();
            //$scope.audio1.play()

        }, 1000);
      }

      stopTimeOuts = function(){
        if (angular.isDefined(timeout1)) {
          $timeout.cancel(timeout1);
          timeout1 = undefined;
        }
        if (angular.isDefined(timeout2)) {
          $timeout.cancel(timeout2);
          timeout2 = undefined;
        }
        if (angular.isDefined(audioInterval)) {
            $interval.cancel(audioInterval);
            audioInterval = undefined;
        }
      }

      playAudioInterval = function() {
        audioInterval = $interval(function() {$scope.audio1.play()}, 500);

    }

      getAudiosFromService();
      //console.log(audiosService.getAudios());

      addAudiosToSlides();

      //playAudioInterval();

      $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          stopTimeOuts();
      });

    //$scope.playSong() = playSong();
    //audio.play();
    audio.loop = true;
   	//playSong(audio2);
   	//$scope.playSong(audio2);
}
