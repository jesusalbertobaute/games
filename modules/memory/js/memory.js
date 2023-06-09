window.addEventListener('DOMContentLoaded', (eventLoad) => {

    let boardGame=[];

    const difficultOption= document.getElementById("difficult-selection");
    const grid= document.getElementById("grid");
    const button= document.getElementById("btn-start-game");

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
    };

    function buildTableInitial(rows,cols,className){
        let tbl= document.createElement("table");
        tbl.setAttribute("id","board");
        tbl.setAttribute("class",className);

        for (currentRow=0; currentRow < rows;++currentRow){
            let row = document.createElement("tr");
            for (currentCol=0;currentCol < cols;++currentCol){
                let cell= document.createElement("td");
                cell.setAttribute("id","card" + currentRow + currentCol);
            //    let cellText= document.createTextNode(currentRow + "" + currentCol);
             //   cell.appendChild(cellText);  
               let imageInitial= document.createElement("img");
               imageInitial.srcset="images/bread.svg";
               cell.appendChild(imageInitial);
               row.appendChild(cell);       
            }
            tbl.appendChild(row);
        }

        grid.appendChild(tbl);
    }


    function buildGrid(difficultLevel){
        
        if(grid.firstElementChild) grid.removeChild(grid.firstElementChild);

        buildTableInitial(boardGame.length,5);
    };

    function initializeGame(difficultLevel){
        initializeCards(difficultLevel);
        buildGrid(difficultLevel);
    };


    button.addEventListener("click",(e)=>{
        let difficultLevel= difficultOption.value;
        initializeGame(difficultLevel);
    });
   
});