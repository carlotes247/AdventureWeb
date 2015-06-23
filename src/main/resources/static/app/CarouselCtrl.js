angular.module('app').controller('CarouselCtrl', CarouselCtrl);

CarouselCtrl.$inject = [ "$scope", "imagesService","$timeout"];


function CarouselCtrl ($scope, imagesService, $timeout) {
  $scope.myInterval = 3500;
  //var images = testResolve.images;
  $scope.images;
  var slides = $scope.slides = [];
  $scope.addSlide = function(source, text) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: source,
      text: text
    });
  };

  getImagesFromService = function() {
    timeout1 = $timeout(function() {
      $scope.images = imagesService.images;
      console.log("getImagesFromService called! The images are: ");
      console.log($scope.images);

    }, 500);
  }

  addImagesToSlides = function() {
    timeout2 = $timeout(function() {
     
      var image0 = $scope.images[0];
      var image1 = $scope.images[1];
      var image2 = $scope.images[2];
      
      console.log("addImagesToSlides called!");
      console.log("Images to add are: ");
      console.log(image0.image);

      $scope.addSlide(image0.image, image0.imageDescription);
      $scope.addSlide(image1.image, image1.imageDescription);
      $scope.addSlide(image2.image, image2.imageDescription);
      
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
  }

  getImagesFromService();
  //console.log(imagesService.getImages());

  addImagesToSlides();

  $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      stopTimeOuts();
  });

  /*$scope.addSlide(images[0].image, image[0].imageDescription);
  $scope.addSlide(images[1].image, image[1].imageDescription);
  $scope.addSlide(images[2].image, image[3].imageDescription);
  */
  /*$scope.addSlide("http://digital-art-gallery.com/oid/38/1200x600_8004_Medieval_interlude_4_2d_fantasy_landscape_adventure_picture_image_digital_art.jpg", "Have amazing adventures!");
  $scope.addSlide("https://ajcarlisle.files.wordpress.com/2014/03/stevenss-epic-fantasy-criteria-transformative-tales-whendell-deviant-art1.jpg", "Explore misterious lands!");
  $scope.addSlide("https://allthingsmundane.files.wordpress.com/2010/04/treasure.jpg", "Find incredible treasures!");*/
}