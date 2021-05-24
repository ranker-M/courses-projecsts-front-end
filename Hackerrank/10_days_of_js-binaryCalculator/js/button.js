document.querySelector("#btn0").addEventListener("click",addScreen);
document.querySelector("#btn1").addEventListener("click",addScreen);
document.querySelector("#btnClr").addEventListener("click",clearScreen);
document.querySelector("#btnEql").addEventListener("click",calculate);
document.querySelector("#btnSum").addEventListener("click",addScreen);
document.querySelector("#btnSub").addEventListener("click",addScreen);
document.querySelector("#btnMul").addEventListener("click",addScreen);
document.querySelector("#btnDiv").addEventListener("click",addScreen);

let output=document.querySelector("#res");

function addScreen(e){
    var btn=e.target;
    if (output.innerHTML.includes("1") || output.innerHTML.includes("0")){
        output.innerHTML+=document.getElementById(btn.id).innerHTML;
    }else
        output.innerHTML=document.getElementById(btn.id).innerHTML;
}

function clearScreen(e){
    output.innerHTML="";
}

function calculate(e){
    let operants=output.innerHTML.match(/\d+/g);
    let operator=output.innerHTML.charAt(operants[0].length);
    operants[0]=parseInt(operants[0],2);
    operants[1]=parseInt(operants[1],2);
    let res;
    switch(operator){
        case "+":
            res=operants[0]+operants[1];
            break;
        case "-":
            res=operants[0]-operants[1];
            break;
        case "*":
            res=operants[0]*operants[1];
            break;
        case "/":
            res=operants[0]/operants[1];
            break;
    }
    output.innerHTML=res.toString(2);
}
