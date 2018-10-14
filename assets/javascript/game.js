

var x = document.getElementById("myAudio");
var y = document.getElementById("themeAudio");

function playAudio() {
    x.play();
}

function pauseAudio() {
    x.pause();
}

function themePlay() {
    y.play();
}

function themePause() {
    y.pause();
}

function resetBtn(){

     setTimeout(function() {
      location.reload();   // sets a timeout and reload time to play audio before resetting page for next word when reset button is pressed.
    }, 2000);
     playAudio();

}

function playVid(){
    var x = document.getElementById("themeHolder");
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    } else {
        x.style.visibility = "hidden";
    }
    x.play();
}


var word3 = ["a","i","m","2","y","y"];
var word9 = ["d","2","m","2","y","y"];

var word10 = ["Gallifrey", "Tardis", "Rose", "Space", "Dalek", "River" , "Time", "Travel"];
var word11 = "hello";
// var counter= 0;
//   for(var i = 0; i < word10.length; i++){

//
//     while(counter != word10.length){
//       testKey(word10[i]);
//     }
//     counter ++ ;
//   }



var num = Math.floor((Math.random() * 7)); // generate a random number


testKey(word10[num]);

console.log(word10[num]);


function testKey(wordEntered){
    var wordCounter = 0;
    // wordCounter = wordEntered.length;
    remainingGuess = wordEntered.length;




    var correctGuess = []; // stores correct number of guesses

    var userKeys = [];  // stores user guesses

    var underScore= [];  // array that holds the underScores displayed on screen

    var ProperWritten = [];
    var ProperlyShown = [];


    // ****** Note **** I initially was doing an array of letters instead of an array of words and
    // kept it because I approached the assignment differently for a majority of it and was nearly done which is why the code below is what it is.

    //  Due to time, I added this code below to compensate or would otherwise have to change
    // and work out other things differently
    // --------------------------------------------------------
    // Based on note above: This function would otherwise not be necessary, but was a part of something I was doing earlier in the assignment(unnecessarily) and kept it here in case I try it again.
    if(typeof wordEntered == "string") //check if the entered element is a string
    {

      ProperlyShown = wordEntered;
       wordEntered = wordEntered.toLowerCase();  // turn string into lowercase string
      wordEntered = (Array.from(wordEntered));   // turn string into array

      console.log(wordEntered); // show word entered

    }
    else
      {
        console.log("hello");
      }


      // ---------------------------------------------------------------------

        for(var i = 0; i < wordEntered.length; i++){ //array of underscores to display on screen

              if(wordEntered[i] === " ")
              {
                  underScore.push("&nbsp &nbsp;"); // creates a space for display for underscores
                  ProperWritten.push(" &nbsp;"); // creates a space for display for underscores
                  wordCounter = wordCounter - 1; ;  // remove a number from counter if space is detected.
                    // remove a number from counter if space is detected.
              }

              else
              {
                underScore.push("_");
                ProperWritten.push(wordEntered[i]);
                wordCounter++ ;
              }

        }

    document.getElementById("guessAmount").innerHTML = wordCounter;

    document.getElementById("underScoreContainer").innerHTML =  underScore.join(" ");  // container that holds the underScores displayed on screen and .join removes the commas

//=====================-On Key Function-===================================================

    document.onkeyup = function(event) {



            document.getElementById("remainingGuesses").innerHTML = remainingGuess - 1;
            var userGuess;
      //------------------------------------------------

         if (event.keyCode >= 65 && event.keyCode <=90 || (event.keyCode >= 96 && event.keyCode <= 105))  {
           userGuess = event.key;
           userGuess = userGuess.toLowerCase();
            remainingGuess--;

            console.log(remainingGuess);
         }
      //------------------------------------------------

      window.stop();
          // Determines which key was pressed.


                if(userGuess === "Meta"){   // hides the meta key when reloading page from keyboard
                  return false;
                }

                if(userKeys.length != ProperWritten.length){
         // This part of code below is a work in progress so not completely working (yet)
                    if(userGuess === "Enter" && userKeys.length == wordCounter ){ // if max guesses are reached and user presses enter key, alerts that its completed and displays full answer

                       setTimeout(function() {
                        alert ("Enter key");   // sets a timeout and reload time
                      }, 5000);
                    }

                    else if(userGuess === "Enter"){
                      return false;
                    }

                    else{userKeys.push(userGuess);

                    }
            }

    var correctGuess = []; // store the correctly guessed letters

    // -------------------
    // Code below is used to keep track of indices of letters that appear multiple times in
    // a word and push it into an array to be used later for replacing underscores
    // -------------------
    var indices = [];
    for(var i= 0; i<wordEntered.length;i++) {

          if (wordEntered[i] === userGuess) {
             indices.push(i);

           }

        }

        remainingGuess - indices.length; //incomplete but was trying to get number of repeated letters and remove them from the amount of guesses allowed to cover multiple letters.

    // -------------------
    for (var i = 0; i < wordEntered.length; i++) {

          if (userKeys.indexOf(wordEntered[i]) !== -1) {  // match array of letters entered from word with user guesses(userKeys)
                  var n = wordEntered.indexOf(wordEntered[i]);
                if (underScore.indexOf(wordEntered[i]) !== -1) {

                  continue; // used this part to replace the underscores with the letters on the display container.
                  // This particular line ignores replacing the underscore if the letter was already been replaced
                }
                else{
                  underScore[n] = userGuess;  //otherwise if the user guess matches an index of the word entered, itll replace the matching index of the underscore with the correctly guessed letter.

                  correctGuess.push(wordEntered[i]); // push the letter from entered word into the correct guess array if the guess is found as a match to the wordEntered variable (original word entered in function)
                }

                document.getElementById("correctGuessContainer").innerHTML =   document.getElementById("correctGuessContainer").innerHTML  + " " +  correctGuess; // display correct guesses
                document.getElementById("result3").innerHTML =  userKeys.join(" ");

                for (var i = 0; i < wordEntered.length; i++) {
                  underScore[indices[i]] = userGuess;     // match the guess with indice of multiple letters
                }
                document.getElementById("underScoreContainer").innerHTML =  underScore.join(" ");
            }
            else{    document.getElementById("result3").innerHTML =  userKeys.join(" ");
            }
    }

    if(userKeys.length == wordCounter){
      setTimeout(function() {  // timeout set so that all the guesses are displayed or last letter entered whos after the confirm prompt
        var test = confirm("Are you ready to see the answer?");

        if(test == true){

            document.getElementById("result").innerHTML = "<h4>The answer is <br /></h4> <h2>" + ProperlyShown + "</h2>  <br />";

            if(underScore.length == wordEntered.length && underScore == correctGuess){
                alert("You Win");

            }
             setTimeout(function() {
            location.reload(); }, 4000);  // page will reload after 3 seconds if user does not press reset

            }


         // sets a timeout and reload time
       }, 05);  // used this to compensate for page prompting as soon as last letter is pressed otherwise last letter isnt displayed as desired.


      }

    }



    console.log(correctGuess);
}
