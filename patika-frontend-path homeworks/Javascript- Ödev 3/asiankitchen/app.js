const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img:
      "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`,
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img:
      "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img:
      "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`,
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img:
      "https://www.savingdessert.com/wp-content/uploads/2019/02/Dan-Dan-Noodles-10.jpg",
    desc: `Dan dan noodle, serving with green onion `,
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img:
      "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `,
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img:
      "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
    desc: `Rice Sandwich, serving with soy sauce`,
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img:
      "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `,
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img:
      "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img:
      "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: `Red bean paste dessert, serving with honey.`,
  },
];

// Add buttons to button Container
let btnContainer=document.querySelector(".btn-container");
let category=new Set(["All"].concat(menu.map(e=>e.category)));
category.forEach((val)=>{
  // Button created 
  let button=document.createElement("button");
  button.classList="btn btn-outline-dark btn-item";
  button.appendChild(document.createTextNode(val));

  // Button event added
  button.addEventListener("click",()=>{filter(val)});

  // Button added to container
  btnContainer.appendChild(button);
});

let section=document.querySelector(".section-center");
menu.map(e=>{
  // Menu Items Div
  let menuItems=document.createElement("div");
  menuItems.classList=`${e.category} menu-items col-lg-6 col-sm-12`;
  // Img
  let img=document.createElement("img");
  img.src=e.img;
  img.alt=e.title;
  img.classList="photo";
  menuItems.appendChild(img);

  // Menu info Div
  let menuInfo=document.createElement("div");
  menuInfo.classList="menu-info";

  // Menu title Div
  let menuTitle=document.createElement("div");
  menuTitle.classList="menu-title";
  let h4=document.createElement("h4");
  h4.textContent=e.title;
  menuTitle.appendChild(h4);
  let h4price=document.createElement("h4");
  h4price.classList="price";
  h4price.textContent=e.price;
  menuTitle.appendChild(h4price);

  // Menu text Div
  let menuText=document.createElement("div");
  menuText.textContent=e.desc;
  menuText.classList="menu-text";
 
  // Sum all parts together
  menuInfo.appendChild(menuTitle);
  menuInfo.appendChild(menuText);
  menuItems.appendChild(menuInfo);

  // Add whole menu to section
  section.appendChild(menuItems);
});


// Button function
function filter(categoryName){
  // If cattegory is All show all elements
  if(categoryName=="All"){
    let elements=document.querySelectorAll(`.menu-items`);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display="flex";
    }
  }else{
    // Show selected category's elements and remove others from screen
    let categories=[...category].slice(1);
    let elements=document.querySelectorAll(`.${categories[0]},.${categories[1]},.${categories[2]}`);
    for (let i = 0; i < elements.length; i++) {
      if(elements[i].className.includes(categoryName)){
      elements[i].style.display="flex";
      }else{
        elements[i].style.display="none";
      }
    }

  }
}