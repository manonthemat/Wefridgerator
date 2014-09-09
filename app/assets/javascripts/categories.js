var app = angular.module('WefridgeratorApp', []);
app.controller('dragNdrop', ['$scope', '$http', function($scope, $http) {

angular g module WefridgeratorApp app
angular g controller app dragNdrop $scope $http
angular g factory app Model dragNdrop

  console.log('angular loaded');

  window.onload = function() {
    $scope.page_start = 0
    $scope.page_end = 5
    console.log("items!!" +$scope.all_items.length);
    console.log($scope.cats);
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
      $('.modal').modal({remote: "http://okfridge.herokuapp.com/categories/" + $scope.category +"/items/" + $scope.item + "/edit"});
// turn the first link on for local development
      // console.log("test modal");
      // $('.modal').modal({remote: "http://localhost:3000/categories/" + $scope.category +"/items/" + $scope.item + "/edit"});
    }

    $scope.setCategory = function(category){
       $scope.categorySelected = category;
    }
    console.log("this is the container: " + $scope.group);
// turn the first link on for heroku
    $http.get("http://okfridge.herokuapp.com/groups/" + $scope.group + "/api/items").success(function (data) {
// turn the first link on for local development
    // $http.get("http://localhost:3000/groups/" + $scope.group + "/api/items").success(function (data) {

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
      $scope.dropZoneLink = "http://okfridge.herokuapp.com/categories/"+$scope.categorySelected+"/items/new_item";
// turn the second link on for local development
      // $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_item";
 
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
      $scope.dropZoneLink = "http://okfridge.herokuapp.com/categories/"+$scope.categorySelected+"/items/new_sl";
// turn the first link on for local development
      // $scope.dropZoneLink = "http://localhost:3000/categories/"+$scope.categorySelected+"/items/new_sl";

      $('.modal').modal({remote: $scope.dropZoneLink});
    });

  var langs =
    [['Afrikaans',       ['af-ZA']],
     ['Bahasa Indonesia',['id-ID']],
     ['Bahasa Melayu',   ['ms-MY']],
     ['Català',          ['ca-ES']],
     ['Čeština',         ['cs-CZ']],
     ['Deutsch',         ['de-DE']],
     ['English',         ['en-AU', 'Australia'],
                         ['en-CA', 'Canada'],
                         ['en-IN', 'India'],
                         ['en-NZ', 'New Zealand'],
                         ['en-ZA', 'South Africa'],
                         ['en-GB', 'United Kingdom'],
                         ['en-US', 'United States']],
     ['Español',         ['es-AR', 'Argentina'],
                         ['es-BO', 'Bolivia'],
                         ['es-CL', 'Chile'],
                         ['es-CO', 'Colombia'],
                         ['es-CR', 'Costa Rica'],
                         ['es-EC', 'Ecuador'],
                         ['es-SV', 'El Salvador'],
                         ['es-ES', 'España'],
                         ['es-US', 'Estados Unidos'],
                         ['es-GT', 'Guatemala'],
                         ['es-HN', 'Honduras'],
                         ['es-MX', 'México'],
                         ['es-NI', 'Nicaragua'],
                         ['es-PA', 'Panamá'],
                         ['es-PY', 'Paraguay'],
                         ['es-PE', 'Perú'],
                         ['es-PR', 'Puerto Rico'],
                         ['es-DO', 'República Dominicana'],
                         ['es-UY', 'Uruguay'],
                         ['es-VE', 'Venezuela']],
     ['Euskara',         ['eu-ES']],
     ['Français',        ['fr-FR']],
     ['Galego',          ['gl-ES']],
     ['Hrvatski',        ['hr_HR']],
     ['IsiZulu',         ['zu-ZA']],
     ['Íslenska',        ['is-IS']],
     ['Italiano',        ['it-IT', 'Italia'],
                         ['it-CH', 'Svizzera']],
     ['Magyar',          ['hu-HU']],
     ['Nederlands',      ['nl-NL']],
     ['Norsk bokmål',    ['nb-NO']],
     ['Polski',          ['pl-PL']],
     ['Português',       ['pt-BR', 'Brasil'],
                         ['pt-PT', 'Portugal']],
     ['Română',          ['ro-RO']],
     ['Slovenčina',      ['sk-SK']],
     ['Suomi',           ['fi-FI']],
     ['Svenska',         ['sv-SE']],
     ['Türkçe',          ['tr-TR']],
     ['български',       ['bg-BG']],
     ['Pусский',         ['ru-RU']],
     ['Српски',          ['sr-RS']],
     ['한국어',            ['ko-KR']],
     ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                         ['cmn-Hans-HK', '普通话 (香港)'],
                         ['cmn-Hant-TW', '中文 (台灣)'],
                         ['yue-Hant-HK', '粵語 (香港)']],
     ['日本語',           ['ja-JP']],
     ['Lingua latīna',   ['la']]];

    for (var i = 0; i < langs.length; i++) {
      select_language.options[i] = new Option(langs[i][0], i);
    }
    select_language.selectedIndex = 6;
    updateCountry();
    select_dialect.selectedIndex = 6;
    showInfo('info_start');

    function updateCountry() {
      for (var i = select_dialect.options.length - 1; i >= 0; i--) {
        select_dialect.remove(i);
      }
      var list = langs[select_language.selectedIndex];
      for (var i = 1; i < list.length; i++) {
        select_dialect.options.add(new Option(list[i][1], list[i][0]));
      }
      select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
    }

    var create_email = false;
    var final_transcript = '';
    var recognizing = false;
    var ignore_onend;
    var start_timestamp;
    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      start_button.style.display = 'inline-block';
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function() {
        recognizing = true;
        showInfo('info_speak_now');
        start_img.src = 'assets/mic-animate.gif';
      };

      recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
          start_img.src = 'assets/mic.gif';
          showInfo('info_no_speech');
          ignore_onend = true;
          console.log(event.error);
        }
        if (event.error == 'audio-capture') {
          start_img.src = 'assets/mic.gif';
          showInfo('info_no_microphone');
          ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - start_timestamp < 100) {
            showInfo('info_blocked');
          } else {
            showInfo('info_denied');
          }
          ignore_onend = true;
        }
      };

      recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
          return;
        }
        start_img.src = 'assets/mic.gif';
        if (!final_transcript) {
          showInfo('info_start');
          return;
        }
        showInfo('');
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          var range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }
        if (create_email) {
          create_email = false;
          createEmail();
        }
      };
      var speech_counter = 0;
      var post_counter = 0;
            recognition.onresult = function(event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            interim_transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
          showButtons('inline-block');
        }
        
        var msg = new SpeechSynthesisUtterance('Add what item?');
        var item = interim_transcript.split(' ');
        console.log(item); 
         
        
        for (i = 0; i < item.length - 1; i++){
          var item = interim_transcript.split(' ');
        if (((item[i] === 'Add') || (item[i] === 'add')) && ((item[i+1] === 'Item') || (item[i+1] === 'item'))) break; 
            
          var item = '';
         
          $scope.startButton();
            if (speech_counter < 1){
               window.speechSynthesis.speak(msg);
              ++speech_counter;
            }
          
         

          setTimeout(function(){$scope.startButton();},4000);
          
        var final1 = final_span.innerHTML.split(' ');
        console.log(final1);
       if (post_counter < 1){
         setTimeout(function(){  $http({
            url: "http://okfridge.herokuapp.com/categories/" + $scope.othercat + "/items/speech",
            method: "POST",
            data: { item: { name: final1[0] }}
          })
          .then(function(response) {
                console.log("yay" + response);
            }, 
            function(response) { // optional
                console.log("boo" + response); 
            }
          );
        },10000);
         ++post_counter;
       }
          
      
          
        
        
        

        // else if (((item[i] === 'Many') || (item[i] === 'many')) && ((item[i+1] === 'items') || (item[i+1] === 'Items'))) {
          
        //   $scope.startButton();        
        //   var msg = new SpeechSynthesisUtterance('Add what items?');
        //   window.speechSynthesis.speak(msg);
        //   setTimeout(function(){$scope.startButton();},2000);          
        //   var item3 = final_span.innerHTML;
        
        //   setTimeout(function(){
        //   var item3 = final_span.innerHTML.split(', '); 
        //   console.log(item2);
        //   for (var j = 0; j < item3.length - 1; ++j) {
        //   $http({
        //     url: "http://localhost:3000/categories/" + $scope.othercat + "/items/speech",
        //     method: "POST",
        //     data: { item: { name: item3[j] }}
        //   })
        //   .then(function(response) {
        //         console.log("yay" + response);
        //     }, 
        //     function(response) { // optional
        //         console.log("boo" + response);
        //     }
        //   );
        // }
        // },20000);
        // }
      }   

         
      
      }

    }
    // function posting(final1) {
     
    // $http({
    //         url: "http://okfridge.herokuapp.com/categories/" + $scope.othercat + "/items/speech",
    //         method: "POST",
    //         data: { item: { name: final1 }}
    //       })
    //       .then(function(response) {
    //             console.log("yay" + response);
    //         }, 
    //         function(response) { // optional
    //             console.log("boo" + response); 
    //         }
    //       );
    //     }

    function upgrade() {
      start_button.style.visibility = 'hidden';
      showInfo('info_upgrade');
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {
      return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }

    function createEmail() {
      var n = final_transcript.indexOf('\n');
      if (n < 0 || n >= 80) {
        n = 40 + final_transcript.substring(40).indexOf(' ');
      }
      var subject = encodeURI(final_transcript.substring(0, n));
      var body = encodeURI(final_transcript.substring(n + 1));
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    }

    function copyButton() {
      if (recognizing) {
        recognizing = false;
        recognition.stop();
      }
      copy_button.style.display = 'none';
      copy_info.style.display = 'inline-block';
      showInfo('');
    }

    function emailButton() {
      if (recognizing) {
        create_email = true;
        recognizing = false;
        recognition.stop();
      } else {
        createEmail();
      }
      email_button.style.display = 'none';
      email_info.style.display = 'inline-block';
      showInfo('');
    }

    $scope.startButton = function(event) {
    
      if (recognizing) {
        recognition.stop();
        return;
      }
      final_transcript = '';
      recognition.lang = select_dialect.value;
      recognition.start();
      ignore_onend = false;
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
      start_img.src = 'mic-slash.gif';
      showInfo('info_allow');
      showButtons('none');
      start_timestamp = event.timeStamp;
    }

    function showInfo(s) {
      if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
          if (child.style) {
            child.style.display = child.id == s ? 'inline' : 'none';
          }
        }
        info.style.visibility = 'visible';
      } else {
        info.style.visibility = 'hidden';
      }
    }

    var current_style;
    function showButtons(style) {
      if (style == current_style) {
        return;
      }
      current_style = style;
      copy_button.style.display = style;
      email_button.style.display = style;
      copy_info.style.display = 'none';
      email_info.style.display = 'none';
    }
  };


}]);

