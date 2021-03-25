let wordList = [ "other", "aussie broadband", "new", "good", "high", "old", "great", "big", "American", "small", "large", "national", "young", "different", "black", "long", "little", "important", "political", "bad", "white", "real", "best", "right", "social", "only", "public", "sure", "low", "early", "able", "human", "local", "late", "hard", "major", "better", "economic", "strong", "possible", "whole", "free", "military", "true", "federal", "international", "full", "special", "easy", "clear", "recent", "certain", "personal", "open", "red", "difficult", "available", "likely", "short", "single", "medical", "current", "wrong", "private", "past", "foreign", "fine", "common", "poor", "natural", "significant", "similar", "hot", "dead", "central", "happy", "serious", "ready", "simple", "left", "physical", "general", "environmental", "financial", "blue", "democratic", "dark", "various", "entire", "close", "legal", "religious", "cold", "final", "main", "green", "nice", "huge", "popular", "traditional", "cultural" ];
wordlist = ["aussie broadband"];
let chances = 6;

let score = 0;
let allGuesses, wrongGuesses, finish, guessCount, currentWord, currentArray;

let newGame = () => {
    //Get new word and setup array
    currentWord = "Aussie Broadband";//wordList[Math.floor(Math.random()*wordList.length)];
    currentArray = [];
    for(let index in currentWord){
        currentArray[index] = (validKey(currentWord[index]))?"":currentWord[index];
    }
    guessCount = 0;
    allGuesses = "";
    wrongGuesses = "";
    finish = "";

    //Show new word on screen
    updateDOM();
}

let checkOutcome = () => {

    if(guessCount == chances){
        finish = "loser";
        score = 0;
        return;
    }
    if(finish == "winner"){
        score += (chances - guessCount) * 100;
        return;
    }

}

let triggerInput = _letter => {
    let letter = _letter.toLowerCase();
    //check we have not won, or lost.
    if(finish !== "") return;
    //Ensure guess was not previously used.
    if(allGuesses.indexOf(letter) !== -1) return;
    //Add to guess list.
    allGuesses += letter;

    //check the letter in the word
    if(currentWord.indexOf(letter) !== -1){
        //letter in word
        correctGuess(letter);
    } else {
        //letter not in word
        guessCount++;
        wrongGuesses += letter;
    }

    checkOutcome();
    updateDOM();
}

let validKey = (_key)=>{
    if(typeof _key !== "string" || _key.length !== 1) return false;
    return (_key.charCodeAt() >= 97 && _key.charCodeAt() <= 122) || (_key.charCodeAt() >= 65 && _key.charCodeAt() <= 90);
}

let updateDOM = () => {
    //Show the visuals
    let guess = document.querySelector(".guess");
    guess.innerHTML = '';
    for(let index in currentArray){
        let newLetter = document.createElement('span');
        newLetter.innerHTML = (currentArray[index]!='') ? currentArray[index] : "&nbsp";
        newLetter.className = "character";
        guess.append(newLetter);
    }

    //Update strings
    document.querySelector(".chances").innerHTML = chances - guessCount;
    document.querySelector(".score").innerHTML = score;
    document.querySelector(".wrongguess").innerHTML = wrongGuesses.toUpperCase().split('').join(", ");
    document.querySelector(".wordwas").innerHTML = currentWord;

    //update hangman
    document.querySelectorAll("line").forEach(element=>{
        element.style.display = "none";
    })
    document.querySelectorAll("circle").forEach(element=>{
        element.style.display = "none";
    })
    for(let iterate = 1; iterate <= guessCount; iterate++){
        document.querySelectorAll(".attempt" + iterate).forEach(element=>{
            element.style.display = "block";
        })
    }
    if(guessCount > 1 && guessCount < 6)
        document.querySelectorAll(".attempt2_eye").forEach(element=>{
            element.style.display = "block";
        });
    
    //Win/Loss
    document.querySelector(".winner").style.display = "none";
    document.querySelector(".loser").style.display = "none";
    if(finish === ""){
        document.querySelector(".screenmodal").style.display = "none";
    }else{
        document.querySelector(".screenmodal").style.display = "block";
        document.querySelector("."+finish).style.display = "block";
    }
    
}

let correctGuess = _letter => {
    //Show the correct guesses
    for(let index in currentWord){
        if(currentWord[index].toLowerCase() == _letter){
            currentArray[index] = _letter;
        }
    }

    //check win
    if(!currentArray.includes('')) finish = "winner";
}

//Add Buttons
let keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
let keyboardControls = document.querySelector(".controls");
for(let rowIndex in keyboard){
    let row = keyboard[rowIndex];
    let rowDiv = document.createElement('div');

    for(let buttonIndex in row){
        let character = row[buttonIndex];
        let button = document.createElement('button');

        button.onclick = () => {
            triggerInput(character);
        }
        button.append(character.toUpperCase());
        rowDiv.append(button);
    }
    if(rowIndex == 2){
        let spacer = document.createElement('span');
        spacer.innerHTML = "&nbsp;";
        spacer.className = "spacer";
        rowDiv.append(spacer);
    }
    keyboardControls.append(rowDiv);
}
//keyboard
window.onkeyup = (item) => {
    console.log(item.key, validKey(item.key))
    if(validKey(item.key))
        triggerInput(item.key);
}

newGame();
