document.addEventListener("DOMContentLoaded", function() {
    
    var possibleWords = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", 
    "Republic of the Congo", "Costa Rica", "Croatia", "Cyprus", "Czechia","Denmark", "Djibouti", "Dominica", "Dominican Republic","Ecuador", 
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Finland", "France", "Gabon", "Gambia", 
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", 
    "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", 
    "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
    "Malawi", "Malaysia", "Maldives", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", 
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", 
    "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
    "Paraguay", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", 
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", 
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tonga", "Trinidad and Tobago", 
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

    const maxGuess = 12;
    var pauseGame = false;
    
    var guessedLetters = [];
    var currentWord = [];     
    var wordToMatch;
    var guessesLeft;
    var wins = 0;
    var losses = 0;
    
    resetGame();
    
    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure the key pressed is in the alphabet
        if (isAlpha(event.key) && !pauseGame) {
                checkForLetter(event.key.toUpperCase())
        }
    }
    
    // Game Functions
    // Check if letter is in word
    function checkForLetter(letter) {
    var foundLetter = false
        // Search for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
            currentWord[i] = letter;
            foundLetter = true;
                // If current matches random word
                if (currentWord.join("") === wordToMatch) {
                    wins++;                       
                    pauseGame = true;
                    updateDisplay();
                    setTimeout(resetGame,1000);
                    }
                    
            }
        }
    
        if (!foundLetter) {
            // Check if letter has already been guessed
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter);
                // Decrease remaining guesses
                guessesLeft--;
            }
            if (guessesLeft === 0) {
                // Display word before reseting game
                losses++;
                currentWord = wordToMatch.split();
                pauseGame = true;
                setTimeout(resetGame, 1000);
            }
        }
    
        updateDisplay();
    
    }
    // Check if keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }
    
    function resetGame() {
        guessesLeft = maxGuess
        pauseGame = false
    
        // Get a new word
        wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
        console.log(wordToMatch)
    
        // Reset word arrays
        guessedLetters = [];
        currentWord = [];
    
        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
        // Put a space instead of an underscore between multi word "words"
            if (wordToMatch[i] === " ") {
                currentWord.push(" ");
            } else {
            currentWord.push("_");
            }
        }
    
        // Update the Display
        updateDisplay();
    }
    
    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins;
        document.getElementById("currentWord").innerText = currentWord.join("");
        document.getElementById("remainingGuesses").innerText = guessesLeft;
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ");
        document.getElementById("totalLosses").innerText = losses;
    }
});

