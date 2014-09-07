var app = angular.module('WefridgeratorApp', []);
app.controller('dragNdrop', ['$scope', '$http', function($scope, $http) {
  console.log('angular loaded');

  window.onload = function() {
    $scope.page_start = 0
    $scope.page_end = 5
    console.log("items!!" +$scope.all_items.length);
    
    $scope.active_cats = function() {
      return $scope.cats.slice($scope.page_start, $scope.page_end);
    }

    // $scope.cat_length = $scope.cats.length
    $scope.end_button = true;
    $scope.start_button = false;
    
    $scope.page_move = function(direction) {
      $scope.page_start += direction;
      console.log("start: " + $scope.page_start);
      $scope.page_end += direction;
      if ($scope.page_end >= $scope.cats.length) {
        $scope.end_button = false;
      }
      else {
        $scope.end_button = true;
      }
      if ($scope.page_start <= 0) {
        $scope.start_button = false;
      }
      else {
        $scope.start_button = true;
      }


      console.log("end: " + $scope.page_end);
    }

    // filter items
    $scope.filter_view = "All";
    $scope.item_count = $scope.all_items.length;
    // default view is All
    $scope.filter = function(filter) {
      $scope.filter_view = filter;

      // sets item count for filter
      switch(filter) {
        case "All":
          $scope.item_count = $scope.all_items.length;
          break;
        case "Refridgerator":
          $scope.item_count = $scope.refridgerator_items.length;
          break;
        case "Freezer":
          $scope.item_count = $scope.freezer_items.length;
          break;
        case "Pantry":
          $scope.item_count = $scope.pantry_items.length;
          break;
        case "Shopping List":
          $scope.item_count = $scope.shopping_list_items.length;
          break;
      }
    }

    $scope.editModal = function(category, item) {
      $scope.item = item;
      console.log("item: "+ $scope.item);
      $scope.category = category;
// turn the first link on for heroku
      // $('.modal').modal({remote: "http://okfridge.herokuapp.com/categories/" + $scope.category +"/items/" + $scope.item + "/edit"});
// turn the first link on for local development
      console.log("test modal");
      $('.modal').modal({remote: "http://localhost:3000/categories/" + $scope.category +"/items/" + $scope.item + "/edit"});
    }

    $scope.setCategory = function(category){
       $scope.categorySelected = category;
    }
    console.log("this is the container: " + $scope.group);
// turn the first link on for heroku
    // $http.get("http://okfridge.herokuapp.com/groups/" + $scope.group + "/api/items").success(function (data) {
// turn the first link on for local development
    $http.get("http:/localhost:3000.com/groups/" + $scope.group + "/api/items").success(function (data) {

    //Convert data to array.
      $scope.itemData = angular.fromJson(angular.fromJson(data));
      console.log($scope.itemData);
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
    // When it leaves the drop zone, do nothing
      this.className = "";
    });

    // Event Listener for when the dragged element dropped in the drop zone.
    dropZoneOne.addEventListener('drop', function(e) {
      // dataTransfer obtains the data
    var data = e.dataTransfer.getData('text');
      // not sure if needed, but will leave just in case
      if (e.preventDefault) e.preventDefault(); 
      if (e.stopPropagation) e.stopPropagation(); 

      this.className = "";
      
      // sets the path to add new item to container
// turn the first link on for heroku
      // $scope.dropZoneLink = "http://okfridge.herokuapp.com/categories/"+$scope.categorySelected+"/items/new_item";
// turn the second link on for local development
      $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_item";
 
      console.log($scope.dropZoneLink);
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
      // sets the path to add new item to shopping list
// turn the first link on for heroku
      // $scope.dropZoneLink = "http://okfridge.herokuapp.com/categories/"+$scope.categorySelected+"/items/new_sl";
// turn the first link on for local development
      $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_sl";

      $('.modal').modal({remote: $scope.dropZoneLink});
    });
  };

}]);

