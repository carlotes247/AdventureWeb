angular.module('app').controller('CarouselCtrl', CarouselCtrl);

//CarouselDemoCtrl.$inject = [ "$scope" ];


function CarouselCtrl ($scope) {
  $scope.myInterval = 3500;
  var slides = $scope.slides = [];
  $scope.addSlide = function(source, text) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: source,
      text: text
    });
  };

  
  $scope.addSlide("http://digital-art-gallery.com/oid/38/1200x600_8004_Medieval_interlude_4_2d_fantasy_landscape_adventure_picture_image_digital_art.jpg", "Have amazing adventures!");
  $scope.addSlide("https://ajcarlisle.files.wordpress.com/2014/03/stevenss-epic-fantasy-criteria-transformative-tales-whendell-deviant-art1.jpg", "Explore misterious lands!");
  $scope.addSlide("https://allthingsmundane.files.wordpress.com/2010/04/treasure.jpg", "Find incredible treasures!");
}