
let array=[[-5,-5,-5],[-5,-5,-5],[-5,-5,-5]];
let PlayerA="";
let PlayerB="";
let reset = false;
let winner="";

const boxes = document.querySelectorAll(".box");
const button0 = document.querySelectorAll(".initiate-0")[0];
const button1 = document.querySelectorAll(".initiate-1")[0];

let clickValue=null;

boxes.forEach((item)=>{
    item.addEventListener("click",handleClick);
    item.addEventListener("click",checkWinner);
});
button0.addEventListener("click",initiateClickValue);
button1.addEventListener("click",initiateClickValue);

//choosing what to start with logic 

function initiateClickValue(){
    if(this.className==="initiate-0 initiate"){
        clickValue=0;
        document.getElementsByClassName("initiatorBox")[0].style="display:none";

    }
    else if(this.className==="initiate-1 initiate"){
        clickValue=1;
        document.getElementsByClassName("initiatorBox")[0].style="display:none";

    }
    colorChange();
}

function changeMover(){ 
    
    if(mover==0){
        document.getElementsByClassName("PlayerA")[0].classList.add("blackBorder");
        document.getElementsByClassName("PlayerB")[0].classList.remove("blackBorder");

    }
    else{
        document.getElementsByClassName("PlayerB")[0].classList.add("blackBorder");
        document.getElementsByClassName("PlayerA")[0].classList.remove("blackBorder");

    }
    mover==0?mover=1:mover=0;
   
    return;
}

function handleClick(){

    //player name logic
    if(!PlayerA||!PlayerB){
           
            if(PlayerA){
                alert("PlayerB name Missing---Enter names of both players to start"); 
                return;
            }
            if(PlayerB){
                alert("Player A name Missing --- Enter Both Player Names");
                return;
            }

            alert("Enter Both Player Names first");
            return;
            
    }
    //clickValue

    if(clickValue===null){
        document.getElementsByClassName("initiatorBox")[0].classList.add("animationError");
        setTimeout(()=>{ document.getElementsByClassName("initiatorBox")[0].classList.remove("animationError");
    },1000);
        return;
    }
    //mover 

    changeMover();


     const index = this.id;

    
     if(clickValue===0){
        this.style="background:seagreen";
        this.innerText="0";
     }
     else if(clickValue===1){
        this.style="background:crimson";
        this.innerText="×";
     }

     if(index<3){
        array[0][index]=clickValue;
        clickValue===0?clickValue=1:clickValue=0;
    }
    else if(index>=3&&index<6){
        array[1][index-3]=clickValue;
        clickValue===0?clickValue=1:clickValue=0
    }
    else if(index>=6&&index<9){
        array[2][index-6]=clickValue;
        clickValue===0?clickValue=1:clickValue=0
    }
    this.removeEventListener("click",handleClick);
    checkDraw();

}



function checkWinner(){
   for(var i=0 ;i<3 ; i++){
    let sumRow=0;let sumColumn=0;
        for(var j=0;j<3;j++){
            sumRow=sumRow+array[i][j];
        }
   
    for(var j=0;j<3;j++){
            sumColumn+=array[j][i];
        }


         if(sumRow===0||sumColumn==3 ||sumRow === 3 || sumColumn===0){

            
                declareResult();
                endGame();
        return;
    }

   } 

   let sumDiag=0;let sumSecDiag=0; 
   for(var i=0 ;i<3 ; i++){
    
        sumDiag+=array[i][i];
        sumSecDiag+=array[i][2-i];
   } 
   if(sumDiag===0||sumDiag==3 ||sumSecDiag === 3 || sumSecDiag===0){

    declareResult();
    endGame();
    return;
}




}
// end function cleanup

function endGame(){

    boxes.forEach((item)=>{
        item.removeEventListener("click",handleClick);
        item.removeEventListener("click",checkWinner);
    });
    array=[[-5,-5,-5],[-5,-5,-5],[-5,-5,-5]];
    winner="";
    pehla="";
    dusra="";
    clickValue=null;

}


function checkDraw(){

    var count=0;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(array[i][j]===-5){
                    count++;
                    console.log(count);
            }
        }
    }
    if(count===0){
        document.getElementsByClassName("winnerBox")[0].style="display:flex";
    document.getElementsByClassName("winner")[0].innerText="DRAW Play Again";
    endGame();
    }
    
}

function declareResult(){

    if(initiator!=clickValue){
        //initiator won
        document.getElementsByClassName("winnerBox")[0].style="display:flex";
        document.getElementsByClassName("winner")[0].innerText=pehla + "  WON";


    }
    else{
        //second person won
        document.getElementsByClassName("winnerBox")[0].style="display:flex";
        document.getElementsByClassName("winner")[0].innerText=dusra + "   WON";
    }
}

//form handling


const form1 = document.getElementById("my-form1");
form1.addEventListener("submit", onFormSubmit1);
function onFormSubmit1(event) {
	event.preventDefault();
	const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    PlayerA=dataObject.name;
    if(PlayerA!=""){
        document.getElementsByClassName("PlayerA")[0].classList.add("PlayerBox")
    document.getElementsByClassName("PlayerA")[0].innerText=PlayerA;
    InitiateGame();
    }
    
}

const form2 = document.getElementById("my-form2");
form2.addEventListener("submit", onFormSubmit2);
function onFormSubmit2(event) {
	event.preventDefault();
	const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    PlayerB=dataObject.name;
    if(PlayerB!=""){
        document.getElementsByClassName("PlayerB")[0].classList.add("PlayerBox");
    document.getElementsByClassName("PlayerB")[0].innerText=PlayerB;
    InitiateGame();
    }
    
}


//modal

var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
  }
  btn.onclick = function() {
    modal.style.display = "block";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  //game Inititate
  let pehla;
  let dusra;
  let toggleChance = 0;
  let initiator;
  let mover;

  function InitiateGame(){
    toggleChance=toggleChance==0?1:0;
    let initiatorBlockScope= toggleChance;
    initiator=initiatorBlockScope;
    mover=initiator;
    if(PlayerA&&PlayerB){
        if(initiatorBlockScope===0){
            //PlayerA starts
            changeMover();
            pehla=PlayerA;
            dusra=PlayerB;
            document.getElementsByClassName("initiatorBox")[0].style="display:flex";
            document.getElementsByClassName("firstMove")[0].classList.add("PlayerBox1");
            document.getElementsByClassName("firstMove")[0].innerText=PlayerA + " will Move first --- Please choose Either to start with 0 or X";
        }
        else if(initiatorBlockScope===1){
                    // PlayerB starts
                    changeMover();
                    pehla=PlayerB;
                    dusra=PlayerA;
                    document.getElementsByClassName("initiatorBox")[0].style="display:flex ";
                    document.getElementsByClassName("firstMove")[0].classList.add("PlayerBox1");
                    document.getElementsByClassName("firstMove")[0].innerText=PlayerB + " will Move first --- Please choose Either to start with 0 or X";


        }
    
        
        return;
    }
    return;
  }

  //change color of player logic

  function colorChange(){
    
    if(initiator===0){
        if(clickValue===0){
            document.getElementsByClassName("PlayerA")[0].style="background:seagreen;";
            document.getElementsByClassName("PlayerB")[0].style="background:crimson;";
            initiator=clickValue;
        }
        else if(clickValue===1){
            document.getElementsByClassName("PlayerA")[0].style="background:crimson;";
            document.getElementsByClassName("PlayerB")[0].style="background:seagreen;";
            initiator=clickValue;

        }

    }  
   else if(initiator===1){
        if(clickValue===0){
            document.getElementsByClassName("PlayerB")[0].style="background:seagreen;";
            document.getElementsByClassName("PlayerA")[0].style="background:crimson;";
            initiator=clickValue;

        }
        else if(clickValue===1){
            document.getElementsByClassName("PlayerB")[0].style="background:crimson;";
            document.getElementsByClassName("PlayerA")[0].style="background:seagreen;";
            initiator=clickValue;

        }

    }  
  }

  // restart game 

  const replay = document.getElementsByClassName("replay")[0];
  replay.addEventListener("click",restartGame);

  function restartGame(){
    console.log('replay');
    document.getElementsByClassName("winnerBox")[0].style="display:none";
    InitiateGame();
    //reattach eventlistener
    boxes.forEach((item)=>{
        item.addEventListener("click",handleClick);
        item.addEventListener("click",checkWinner);
    });
    //clean board
    boxes.forEach((item)=>{
        item.style="background-color:white";
        item.innerText="";

    });
    

  }

  const closeResult = document.getElementsByClassName("closeResult")[0];
  closeResult.addEventListener('click',handleClose);

  function handleClose(){
    document.getElementsByClassName("winnerBox")[0].style="display:none";
    return;
  }


  const refresh = document.getElementById("refresh");
  refresh.addEventListener("click",refreshGame);

  function refreshGame(){
    endGame();
    restartGame();
  }