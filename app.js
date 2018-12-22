        /*
         * Create a list that holds all of your cards
         */
        let list_of_cards = document.querySelectorAll(".card");
        let ul = document.querySelector(".cards-list");
        let cards = Array.from(list_of_cards);
        let opencardsList, matchedCardsList, noOfMoves_counter, secondsTotal;

        resetAllValues();


        document.querySelector('.repeat-icon').addEventListener('click', shuffleCards);


        //function to shuffle cards
        function shuffleCards() {

            let shuffledCards = shuffle(cards);

            // reset all the values to default
            resetAllValues();

            //remove all the li child elements of the current ul element
            while (ul.hasChildNodes()) {
                ul.removeChild(ul.firstChild);
            }

            //append shuffled cards to the ul as child elements
            for (let shuffledCard of shuffledCards) {
                ul.appendChild(shuffledCard);
            }
        }

        //function to reset all the inital values to default
        function resetAllValues() {
            noOfMoves_counter = 0;
            secondsTotal = 0;
            opencardsList = [];
            matchedCardsList = [];

            for (let card of cards) {
                card.className = 'card';
            }
            document.querySelector('.no-of-moves span').textContent = 0;

            //reset stars to 5 filled stars
            let children = document.querySelectorAll(".stars li");

            for (let child of children) {
                child.firstElementChild.className = 'fas fa-star';

            }

        }


        // Shuffle function from http://stackoverflow.com/a/2450976
        function shuffle(array) {
            let currentIndex = array.length,
                temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


        //timer function that calculates hours minutes and seconds
        function countTimer() {
            secondsTotal = parseInt(secondsTotal) + 1;
            let hour = Math.floor(secondsTotal / 3600);
            let minute = Math.floor((secondsTotal - hour * 3600) / 60);
            let seconds = secondsTotal - (hour * 3600 + minute * 60);
            document.querySelector('.timer span').innerHTML = hour + ":" + minute + ":" + seconds;
        }

        //set up the event listner for the card
        let timer = setInterval(countTimer, 1000);

        //click event triggered on the card
        for (let cardClicked of cards) {
            cardClicked.addEventListener('click', displayCard.bind(this, cardClicked));
        }


        // function to display card
        function displayCard(card) {

            if (card.className !== 'card-open') {

                //fill the array with the card value
                opencardsList.push(card);
                // change the class name to card-open
                card.className = 'card-open';
                //function to check if the cards match or unmatch
                checkCardMatch();

                //function for displaying the star rating
                starRating()
            }

            //check if all the moves are completed and the user won the game
            checkWinner();
        }


        function checkCardMatch() {
            //if the array contains the 2 cards atleast
            if (opencardsList.length > 1) {
                //check if the two cards are equal
                if (opencardsList[0].firstChild.className === opencardsList[1].firstChild.className) {
                    //function to be called if the cards match
                    cardsMatch();
                } else {
                    //function to be called if the cards do not match
                    cardsDoNotMatch();
                }
            }
        }


        function cardsMatch() {
            //for each card in the open cards list , change the className to card-open and empty the list
            for (let openCard of opencardsList) {

                openCard.className = "card-open";
                opencardsList = [];
            }
            //update the no of moves counter value
            document.querySelector('.no-of-moves span').textContent = ++noOfMoves_counter;

        }

        function cardsDoNotMatch() {

            //setTimeout  to be called with the delay of .25 seconds
            //This will help us to see both the cards on the display for .025 seconds before flipping them off to the other side
            setTimeout(function () {


                for (let openCard of opencardsList) {
                    // change the  class name back to "card"so that we can again use the card for flipping it to show the symbol again
                    openCard.className = 'card';
                }
                //empty the list again
                opencardsList = [];

                document.querySelector('.no-of-moves span').textContent = ++noOfMoves_counter;

            }, 200);

        }


        //function to check if the user won the game
        function checkWinner() {
            let isWinner = true;

            //If there is any card which is not opned then the user did not won the game
            for (let card of cards) {
                if (card.classList.contains('card')) {
                    isWinner = false;
                    break;
                }
            }
            //stop the timer once the use won the game
            if (isWinner) {

                clearInterval(timer);
            }
        }



        function starRating() {

            //IF the no of moves >30 then no fill for any of the stars
            if (noOfMoves_counter >= 30) {
                let children = document.querySelectorAll(".stars li:nth-child(n+1)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }
            }
            //IF the no of moves between 25 and 30 then display 1 filled star
            if (noOfMoves_counter >= 25 && noOfMoves_counter < 30) {
                let children = document.querySelectorAll(".stars li:nth-child(n+2)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }
            }

            //IF the no of moves between 20 and 25 then display 2 filled stars
            else if (noOfMoves_counter >= 20 && noOfMoves_counter < 25) {
                let children = document.querySelectorAll(".stars li:nth-child(n+3)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }
            }

            //IF the no of moves between 20 and 25 then display 3 filled stars
            else if (noOfMoves_counter >= 12 && noOfMoves_counter < 20) {
                let children = document.querySelectorAll(".stars li:nth-child(n+4)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }
            }

            //if the no of moves between 9 and 12 display 4 filled stars
            else if (noOfMoves_counter > 8 && noOfMoves_counter < 12) {
                let children = document.querySelectorAll(".stars li:nth-child(n+5)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }

            }

            //if the no of moves less then or queal to 8 then display all 5 filled stars
            else {
                let children = document.querySelectorAll(".stars li:nth-child(n+6)");

                for (let child of children) {
                    child.firstElementChild.className = 'far fa-star';
                }

            }

        }