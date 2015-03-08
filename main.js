LOG = console.log.bind(console);

var TypingTest = (function() {

  var typingArea = document.getElementById('typing-area'),
      typingInput = document.getElementById('typing-input');

  var currentWord = 0,
      totalWords = 0,
      currentText = null,
      gameActive = false,
      wordElements = [],
      startTime = null;

  function calculateWPM() {
    var timeSpent = (new Date().getTime() - startTime) / 1000,
        timeRatio = 60 / timeSpent,
        cpm = Math.round(currentText.slice(0, currentWord).join(' ').length *
                         timeRatio),
        wpm = Math.round(cpm / 5);
    LOG(wpm, cpm);
  }

  function updateTypingArea() {
    if (currentWord === totalWords) {
      gameActive = false;
      calculateWPM();
      return;
    }
    var activeWord = wordElements[currentWord],
        typedText = typingInput.value;
    if (typedText === activeWord.textContent +
        (currentWord + 1 === totalWords ? '' : ' ')) {
      activeWord.className = 'word';
      ++currentWord;
      typingInput.value = '';
      updateTypingArea();
      calculateWPM();
      return;
    }
    activeWord.className = 'word word-active word-' +
      (activeWord.textContent.indexOf(typedText) === 0 ?
       'correct' : 'incorrect');
  }

  typingInput.onkeydown = function() {
    if (gameActive) {
      if (startTime === null) {
        setTimeout(function() {
          if (typingInput.value !== '') {
            startTime = new Date().getTime();
            updateTypingArea();
          }
        }, 0);
      } else {
        setTimeout(updateTypingArea, 0);
      }
    }
  };

  return function(text) {
    gameActive = true;
    typingArea.innerHTML = '';
    typingInput.value = '';
    currentText = text.split(/[\s\n]+/);
    currentWord = 0;
    wordElements = [];
    startTime = null;
    totalWords = currentText.length;
    currentText.forEach(function(word) {
      var wordElement = document.createElement('span');
      wordElement.textContent = word;
      wordElement.className = 'word';
      wordElements.push(wordElement);
      typingArea.appendChild(wordElement);
    });
  };

})();

TypingTest('If you really want to hear about it, the first thing you\'ll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don\'t feel like going into it. In the first place, that stuff bores me, and in the second place, my parents would have about two hemorrhages apiece if I told anything pretty personal about them.');
