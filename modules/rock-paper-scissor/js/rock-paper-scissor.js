window.addEventListener('DOMContentLoaded', (eventLoad) => {
    const computerChoiceDisplay=document.getElementById('computer-choice');
    const userChoiceDisplay=document.getElementById('user-choice');
    const winnerDisplay=document.getElementById('winner');
    const choicesButton= document.getElementsByClassName("choice-button");
    const gamesUserWinResultDisplay= document.getElementById("games-win-user");
    const gamesComputerWinResultDisplay= document.getElementById("games-win-computer");
    const gamesTiedResultDisplay= document.getElementById("games-tied");
    const backHomeButton= document.getElementById("rps-back-menu-button");


    backHomeButton.addEventListener('click',(e)=>{
        window.location.href="../../index.html";
    });

    const options= ["rock","paper","scissor"];
    let gamesUserWin=0;
    let gamesComputerWin=0; 
    let gamesTied=0;

    const updateResults= (result) => {
         if (result==='computer'){
            ++gamesComputerWin;
         }else if (result==='user'){
             ++gamesUserWin;
         }else{
            ++gamesTied;
         }

        gamesComputerWinResultDisplay.innerHTML= gamesComputerWin;
        gamesUserWinResultDisplay.innerHTML= gamesUserWin;
        gamesTiedResultDisplay.innerHTML= gamesTied;

    };

    const generateComputerChoice= (userChoice) => {
       let indexOption = (Math.random() * 2).toFixed();
       let computerChoice= options[indexOption];
       computerChoiceDisplay.innerHTML= computerChoice.toUpperCase();

       if (userChoice===computerChoice){
            winnerDisplay.innerHTML= "TIED";
            updateResults("tied");
            return;
       }

       if ((userChoice===options[0] && computerChoice===options[2]) ||
           (userChoice===options[1] && computerChoice===options[0]) ||
           (userChoice===options[2] && computerChoice===options[1])){
          winnerDisplay.innerHTML= "YOU WIN!!!";
          updateResults("user");
          return;
       }

        updateResults("computer");
        winnerDisplay.innerHTML= "COMPUTER WIN!!!";

    };

    [...choicesButton].forEach(choiceButton => {

         choiceButton.addEventListener("click",(eventButton)=>{
            let userChoice="";
            if (eventButton.target.id.search('rock')>-1){
                userChoice=options[0];
            }else if(eventButton.target.id.search('paper')>-1){
                userChoice=options[1];
            }else if(eventButton.target.id.search('scissor')>-1){
                userChoice=options[2];
            }
            userChoiceDisplay.innerHTML= userChoice.toUpperCase();
            generateComputerChoice(userChoice);
         });

    });
});



