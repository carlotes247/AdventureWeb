angular.module('app').controller('ModalCtrl', ModalCtrl);

ModalCtrl.$inject = ["$scope" , "$modal", "$log" ];

function ModalCtrl ($scope, $modal, $log) {

  //$scope.items = ['item1', 'item2', 'item3'];

  $scope.events = [
    {"eventName" : "Event Lady",
      "eventContent" : "A lady attacks you!",
      "eventGold" : 50
    },
    {"eventName" : "Event Monster",
      "eventContent" : "A monster attacks you!",
      "eventGold" : -20
    },
    {"eventName" : "Event Rabbit",
      "eventContent" : "A rabbit attacks you!",
      "eventGold" : 10
    },
    {"eventName" : "Event treasure",
      "eventContent" : "You found a treasure in the middle of the woods!",
      "eventGold" : 250
    },
    {"eventName" : "Event Talking Tree",
      "eventContent" : "You found a talking tree! They can be quite unpredictable...",
      "eventGold" : -33
    },
    {"eventName" : "Event Talking Tree 2",
      "eventContent" : "You found a talking tree! They can be quite unpredictable...",
      "eventGold" : 150
    },
    {"eventName" : "Event beautiful elf",
      "eventContent" : "You found a beautiful elf! Looks like she will is looking at your wallet...",
      "eventGold" : -69
    },
    {"eventName" : "Event Teacher",
      "eventContent" : "You found your teacher from the sword school!",
      "eventGold" : 70
    },
    {"eventName" : "Event Goblin Camp",
      "eventContent" : "You found a goblin camp! They seem to be hiding something, but it's risking to go... ",
      "eventGold" : -250
    },
    {"eventName" : "Event Goblin Camp 2",
      "eventContent" : "You found a goblin camp! They seem to be hiding something, but it's risking to go... ",
      "eventGold" : 500
    }
  ]

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        events: function () {
          return $scope.events;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.clear = function(x) {
    return x = "";
  }

  getEventsFromService = function() {
    timeout1 = $timeout(function() {
      $scope.events = eventsService.events;
      console.log("getEventsFromService called! The events are: ");
      console.log($scope.events);

    }, 500);
  }

}