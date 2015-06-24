angular.module('app').controller('ModalInstanceCtrl', ModalInstanceCtrl);

ModalInstanceCtrl.$inject = ["$scope" , "$modalInstance", "events" , "$filter"];

function ModalInstanceCtrl ($scope, $modalInstance, events, $filter) {

  $scope.events = $filter('randomize')(events);
  $scope.selected = {
    event: $scope.events
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.event);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}