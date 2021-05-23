let btnAll=document.querySelectorAll("button");
btnAll[4].onclick=function (){
rotate();
};


function rotate(){
    let numbers=[];
    let readOrder=[0,1,2,5,8,7,6,3];
    for (let i=0;i<readOrder.length;i++){
        numbers.push(btnAll[readOrder[i]].innerHTML);
    }
    numbers=[numbers[7]].concat(numbers.slice(0,7));
   for (let i=0;i<readOrder.length;i++){
    btnAll[readOrder[i]].innerHTML=numbers[i];
}
}

