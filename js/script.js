    $(function() {
      var clip = new ZeroClipboard($("#copybutton"), {
        moviePath: "/js/ZeroClipboard.swf"
      });

      

      clip.on( 'complete', function(client, args) {
        $.ambiance({message: "Password it copied to your clipboard!", 
            title: "Success!",
            type: "success"});
      });

      var settings = {
        number_of_words: 4, 
        seperator: " "
      }

      function initialize() {
        setNewWordCount();

        $('#seperator').keyup(function() {
          setNewWordCount();
          notifyChangeInWords();
        });
        $('#number_of_words').change(setNewWordCount);
        
        
        $('.refreshAll').click(refreshAll);
        
        $('.copy').click(function() {
          window.prompt ("Copy to clipboard: Ctrl+C, Enter", $('#password').val());
        });
      }

      function setNewWordCount() {
        settings.number_of_words = parseInt($('#number_of_words').val());
        settings.seperator = $('#seperator').val();


        if ($(".wordbox").length>settings.number_of_words) {
          var to_remove = $(".wordbox").length-settings.number_of_words
          while (to_remove!=0) {
            $(".wordbox:last-child").remove();
            to_remove--;
          }
		  notifyChangeInWords();
        }
        if ($(".wordbox").length<settings.number_of_words) {
          var to_add = settings.number_of_words-$(".wordbox").length;
          for (var i = 0; i<to_add; i++) {
           add_word();
          }
        }

        
        $( "#editor" ).sortable({
			update:notifyChangeInWords, 
			helper : 'clone'
		});
      }

      function add_word() {

        var wordbox = $('<div class="wordbox"><span class="word"></span></div>');
        $("#editor").append(wordbox);

        var word = wordbox.find('.word');
        updateWord(word)();
     

        wordbox.click(updateWord(word));
      }
      
      function setNewText(element) {
        return function (theNewWord) {
          element.text(theNewWord);
          notifyChangeInWords();
        }
      }
      
      function refreshAll() {
        $('.word').each(function() {
          updateWord(this)();
        });
      }
      
      function updateWord(element) {
        return function() {
          $.get('/api.php?_' + Math.random(), setNewText($(element)));
        }
      }
      
      function notifyChangeInWords() {
        var result = "";
        var first = true;

        $('.word').each(function() {
          if (first) {
            first = false;
          } else {
            result += settings.seperator;
          }
          result += $(this).text();
        });
        $('#password').val(result)
      }

      initialize();
      
    });
