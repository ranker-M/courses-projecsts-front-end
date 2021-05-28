// Localde kaydedilmis listeyi kontrol edip ekrana listeyi yazdıriyor yoksa toast ile element olmadıgını haber veriyor
let lastList=window.localStorage.getItem("toDoList");
if(lastList==null || JSON.parse(lastList).length==0){
    window.localStorage.setItem("toDoList",JSON.stringify([]));
    $(".addSomeElement").toast("show");
}else{
    lastList=JSON.parse(lastList);
    let ul=document.querySelector("#list");
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
    console.log(lastList);
    for(let i=0;i<lastList.length;i++){
        let field=document.createTextNode(lastList[i]);
        let li=document.createElement("li");
        li.appendChild(field);
        ul.appendChild(li);
    }
    deleteButton();
    taskDone();
}

// Verilen elemente X butonunu ve fonksiyonunu ekliyor
function addDeleteButton(elem){
    let xButton=document.createTextNode("x");
    let span=document.createElement("span");
    span.className="close";
    span.appendChild(xButton);
    elem.appendChild(span);
    span.onclick=function(){
        // Localden butonun değerini siliyor ve ardinda listeyi ortadan kaldırıyor
        let lastList=window.localStorage.getItem("toDoList");
        lastList=JSON.parse(lastList);
        let index=lastList.indexOf(elem.firstChild.nodeValue);
        lastList.splice(index,1);
        console.log(lastList);
        window.localStorage.setItem("toDoList",JSON.stringify(lastList));
        span.parentNode.parentNode.removeChild(span.parentNode);
    };
}
// Taskın yapıldıgını belli eden class aktif-deaktif ediliyor
function addTaskDone(elem){
    elem.onclick=function (){
        elem.classList.toggle("checked");
    };
}
// Butun li elementlerine silme butonu ekliyor
function deleteButton(){
    let li=document.querySelectorAll("li");
    for(let i=0;i<li.length;i++){
        addDeleteButton(li[i]);
    }
}
// Butun li elementlerine task tamamlandı fonksiyonu ekliyor
function taskDone(){
    let li=document.querySelectorAll("li");
    for(let i=0;i<li.length;i++){
        addTaskDone(li[i]);
    }
}
// Yeni element yaratıyor ve local storage'ı guncelliyor
function newElement(){
    let input=document.querySelector("#task");
    let li=document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    let ul=document.querySelector("#list");
    addDeleteButton(li);
    addTaskDone(li);
    if(input.value ==="" || input.value.match(/\w/g)==null ){
        $(".error").toast("show");
    }else{
        $(".success").toast("show");
        ul.appendChild(li);
        // locale ekleme
        let lastList=window.localStorage.getItem("toDoList");
        lastList=JSON.parse(lastList);
        lastList.push(input.value);
        console.log(lastList);
        window.localStorage.setItem("toDoList",JSON.stringify(lastList));
    }
    input.value="";
}

