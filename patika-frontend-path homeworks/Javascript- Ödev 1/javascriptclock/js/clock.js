function printName(){
    let isim=prompt("Adınız nedir?");
    let nameDOC=document.querySelector("#myName");
    nameDOC.innerHTML=isim;
}

function showTime(){
    let clockDOC=document.querySelector("#myClock");
    let time = new Date().toLocaleTimeString("tr-TR").split(/:| /).join(":");

    let weekdays=["Pazar","Pazartesi","Salı","Çarsamba","Perşembe","Cuma","Cumartesi"];
    let day= weekdays[new Date().getDay()];
    clockDOC.innerHTML=time+" "+day;

    setTimeout(showTime,1000);
}

printName();
showTime();