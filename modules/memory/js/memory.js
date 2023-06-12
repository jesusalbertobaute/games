window.addEventListener('DOMContentLoaded', (eventLoad) => {

    let boardGame=[];
    let userSelection=[];
    let discoverCars=[];
    let scoreGame= 0;
    let maxScore=0;

    const difficultOption= document.getElementById("difficult-selection");
    const grid= document.getElementById("grid");
    const button= document.getElementById("btn-start-game");
    const scoreDisplay = document.getElementById("score-display");
    const backHomeButton= document.getElementById("memory-back-menu-button");
    const winDisplay= document.getElementById("head-win");

    function shuffleCards(gameCards){
        let currentIndex= gameCards.length;

        while (currentIndex != 0){
            let randomIndex= Math.floor(Math.random() * currentIndex);
            --currentIndex;

            [gameCards[currentIndex],gameCards[randomIndex]]=[gameCards[randomIndex],gameCards[currentIndex]];
        }
    }

    function initializeBoardGame(gameCards){
        let row=[];
        boardGame=[];

        gameCards.forEach((element,index)=>{
             row.push(element);
             if ((index+1)%5===0){
                 boardGame.push(row);
                 row=[];
             }
        });
    }

    function initializeCards(difficultLevel){
        let pairs=5;
        let copyCards= structuredClone(cards);
        let gameCards=[];

        if (difficultLevel==='medium'){
            pairs=10;
        }

        if (difficultLevel==='hard'){
            pairs=15;
        }

        for (let i=0; i < pairs;++i){
            let indexChoice= Math.floor(Math.random() * copyCards.length);
            gameCards.push(copyCards[indexChoice]);
            gameCards.push(copyCards[indexChoice]);
            copyCards.splice(indexChoice,1);
        }
        copyCards.length=0;
        shuffleCards(gameCards);
        initializeBoardGame(gameCards);
        discoverCars=[];
        maxScore=pairs;
    };

    function buildTableInitial(rows,cols){
        let tbl= document.createElement("table");
        tbl.setAttribute("id","board");

        for (currentRow=0; currentRow < rows;++currentRow){
            let row = document.createElement("tr");
            for (currentCol=0;currentCol < cols;++currentCol){
                let cell= document.createElement("td");
                cell.setAttribute("align","center");
                cell.setAttribute("class",boardGame[currentRow][currentCol]?.name);
                let image= document.createElement("img");
                image.setAttribute("id","img" + currentRow + currentCol);
                image.setAttribute("class","card-enable");
                image.srcset=boardGame[currentRow][currentCol]?.urlSVG;
                cell.appendChild(image);
                row.appendChild(cell);       
            }
            tbl.appendChild(row);
        }

        grid.appendChild(tbl);
    }

    function addBehaviorCards(){
        let cells= document.querySelectorAll("#board td");

        cells.forEach((cell,index)=>{
              let image= cell.firstChild;
              cell.addEventListener("click",(e)=>{

                   if (discoverCars.indexOf(cell.className)>-1) return;

                   image.classList.remove("card-enable");
                   image.classList.add("card-disable");

                   let obj= {
                       id: image.id,
                       name: cell.className
                   }
                   userSelection.push(obj);
                 

                   if (userSelection.length===2){
                       if (userSelection[0]?.name===userSelection[1]?.name){
                           ++scoreGame;
                           scoreDisplay.innerHTML= scoreGame;
                           discoverCars.push(userSelection[0]?.name);
                           if (scoreGame===maxScore){ 
                                winDisplay.classList.remove("win-hide");
                                winDisplay.classList.add("animation-win");
                           }
                       }else{
                           let imageSelection1= document.getElementById(userSelection[0].id);
                           let imageSelection2= document.getElementById(userSelection[1].id);
                           
                           imageSelection1.classList.remove("card-disable");
                           imageSelection2.classList.remove("card-disable");

                           imageSelection1.classList.add("card-enable");
                           imageSelection2.classList.add("card-enable");
                       }

                       userSelection=[];
                   }

              });
        });

    }

    function buildGrid(){
        
        if(grid.firstElementChild) grid.removeChild(grid.firstElementChild);

        buildTableInitial(boardGame.length,5);
    };

    function initializeScore(){
        scoreGame=0;
        scoreDisplay.innerHTML= scoreGame;
        winDisplay.classList.remove("animation-win");
        winDisplay.classList.add("win-hide");
    }

    function initializeGame(difficultLevel){
        initializeCards(difficultLevel);
        buildGrid();
        addBehaviorCards();
        initializeScore();
    };


    button.addEventListener("click",(e)=>{
        let difficultLevel= difficultOption.value;
        initializeGame(difficultLevel);
    });

    backHomeButton.addEventListener('click',(e)=>{
        window.location.href="../../index.html";
    });
   
});