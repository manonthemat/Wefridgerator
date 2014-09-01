var app = angular.module('WefridgeratorApp', []);
app.controller('dragNdrop', ['$scope', '$http', function($scope, $http) {
  console.log('angular loaded');

  window.onload = function() {

    $scope.setCategory = function(category){
      $scope.categorySelected = category;
    }
    console.log("this is the container: " + $scope.container);
    $http.get('http://localhost:3000/containers/{{container}}/categories/api/items').success(function (data) {
    //Convert data to array.
      $scope.itemData = angular.fromJson(angular.fromJson(data));
    });

    var dropZoneOne = document.querySelector('#drop-target-one');
    var dragElements = document.querySelectorAll('#drag-elements li');
    var elementDragged = null;

    for (var i = 0; i < dragElements.length; i++) {
      // Event Listener for when the drag interaction starts.
      dragElements[i].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        elementDragged = this;
      });
      // Event Listener for when the drag interaction finishes.
      dragElements[i].addEventListener('dragend', function(e) {
        elementDragged = null;
      });
    };

    // Event Listener for when the dragged element is over the drop zone.
    dropZoneOne.addEventListener('dragover', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';

      return false;
    });

    // Event Listener for when the dragged element enters the drop zone.
    dropZoneOne.addEventListener('dragenter', function(e) {
      this.className = "over";
    });

    // Event Listener for when the dragged element leaves the drop zone.
    dropZoneOne.addEventListener('dragleave', function(e) {
      this.className = "";
    });

    // Event Listener for when the dragged element dropped in the drop zone.
    dropZoneOne.addEventListener('drop', function(e) {
    var data = e.dataTransfer.getData('text');
      if (e.preventDefault) e.preventDefault(); 
      if (e.stopPropagation) e.stopPropagation(); 

      this.className = "";
      
      // $scope.dropZoneLink = "<%#= new_category_item_path($scope.category) %>";
      $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_item";
      console.log("dropped " + data);
      console.log($scope.dropZoneLink);
      //window.location.href = e.dataTransfer.getData('text');
      // window.location.href = $scope.dropZoneLink;
      $('.modal').modal({remote: $scope.dropZoneLink});
      });

    var dropZoneTwo = document.querySelector('#drop-target-two');
    var dragElements = document.querySelectorAll('#drag-elements li');
    var elementDragged = null;

    for (var i = 0; i < dragElements.length; i++) {
      // Event Listener for when the drag interaction starts.
      dragElements[i].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'move';
        elementDragged = this;
      });
      // Event Listener for when the drag interaction finishes.
      dragElements[i].addEventListener('dragend', function(e) {
        elementDragged = null;
      });
    };

    // Event Listener for when the dragged element is over the drop zone.
    dropZoneTwo.addEventListener('dragover', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.dataTransfer.dropEffect = 'move';

      return false;
    });

    // Event Listener for when the dragged element enters the drop zone.
    dropZoneTwo.addEventListener('dragenter', function(e) {
      this.className = "over";
    });

    // Event Listener for when the dragged element leaves the drop zone.
    dropZoneTwo.addEventListener('dragleave', function(e) {
      this.className = "";
    });

    // Event Listener for when the dragged element dropped in the drop zone.
    dropZoneTwo.addEventListener('drop', function(e) {
    var data = e.dataTransfer.getData('text');
      if (e.preventDefault) e.preventDefault(); 
      if (e.stopPropagation) e.stopPropagation(); 

      this.className = "";
      
      // $scope.dropZoneLink = "<%#= new_category_item_path($scope.category) %>";
      $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_sl";
      console.log("dropped " + data);
      console.log($scope.dropZoneLink);
      //window.location.href = e.dataTransfer.getData('text');
      // window.location.href = $scope.dropZoneLink;
      $('.modal').modal({remote: $scope.dropZoneLink});
    });
  };
}]);

