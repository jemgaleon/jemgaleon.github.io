(function() {
  let pScore = 0;
  let cScore = 0;
  let txtPlayerName = "";

  const startGame = () => {
    const btnPlay = document.querySelector(".intro button");
    const scoreBoard = document.querySelector(".score");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    btnPlay.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      scoreBoard.classList.add("fadeIn");
      match.classList.add("fadeIn");

      // Update player name
      const playerName = document.querySelector(".player-score h2");
      txtPlayerName = document.getElementById("txtPlayerName").value || "Player";
      playerName.textContent = txtPlayerName;
    });
  };

  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    const winner = document.querySelector(".winner");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    })
    // Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function() {
        // Player Choice
        const playerChoice = this.textContent;

        // Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);        
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          // Here is where we call compare hands
          compareHands(playerChoice, computerChoice);

          // Update Images
          playerHand.src = `./assets/${playerChoice}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;

          // Show buttons
          options.forEach((option) => {
            option.classList.add("fadeIn");
            option.classList.remove("fadeOut");
          });
        }, 2000);

        // Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

        // Reset Images
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;

        // Hide buttons
        options.forEach((option) => {
          option.classList.remove("fadeIn");
          option.classList.add("fadeOut");
        });

        // Update text
        winner.textContent = "...";
      });
    });
  };

  const compareHands = (playerChoice, computerChoice) => {
    // Update Text
    const winner = document.querySelector(".winner");

    // Checkin for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Draw";
      return;
    }
    
    // Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = `${txtPlayerName} Wins`;
        pScore++;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }

    // Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        winner.textContent = `${txtPlayerName} Wins`;
        pScore++;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }

    // Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "paper") {
        winner.textContent = `${txtPlayerName} Wins`;
        pScore++;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  startGame();
  playMatch();
}());