//* 0-Potato Count 1-Shovel 2-Ox 3-Tractor 4-Potato
let cheese = {
  potato: 0,
  shovel: 0,
  ox: 0,
  tractor: 0,
  potatoMobile: 0,
}

let clickUpgrade = {
  shovel: {
    price: 50,
    quantity: 0,
    multiplier: 2
  },
   ox: {
    price: 150,
    quantity: 0,
    multiplier: 10,
  }
}

let automaticUpgrade = {
   tractor: {
     price: 500,
     quantity: 0,
     multiplier: 30
   },
   potatoMobile: {
     price: 10000,
     quantity: 0,
     multiplier: 300
   }
}

let cheeseModifier = {
  cPS: 0,
  tCM: 0,
}

function mine(){
cheese.potato += (1 + (cheese.shovel *clickUpgrade.shovel.multiplier) + (cheese.ox *clickUpgrade.ox.multiplier));
 drawElements()
 awards()
}

function drawElements(){
  //*draw inventory
  let template = '';
    template += `
    <div class="text-center text-warning card card bg-purp p-4">
        <h2>Inventory</h2>
        <h5>Shovel : ${cheese.shovel}</h5>
        <h5>Ox & Plow : ${cheese.ox}</h5>
        <h5>Tractor : ${cheese.tractor}</h5>
        <h5>Potato Mobile : ${cheese.potatoMobile}</h5>
      </div>
    `
  document.getElementById('inventory').innerHTML= template

 //*draw potato count
  template = '';
  template += `
  <div class="row mx-auto my-auto">
   <img id = "potatoImg" class="potatoImg mx-auto my-auto potatoShadow" src="https://i.pinimg.com/originals/dd/8a/41/dd8a410fb404f776e3cad0927c5e809e.png">
  <h2 class="potatoText text-center text-warning pt-5">${cheese.potato}</h2>
  </div>
 `
 document.getElementById('potato').innerHTML= template

 //*draw stats
  template = '';
    template += `
    <div class="text-center card text-warning bg-purp p-4">
        <h2>Stats</h2>
        <h5>Potatoes Per Second : ${cheeseModifier.cPS} </h5>
        <h5>Total Potato Multiplier : ${cheeseModifier.tCM}</h5>
      </div>

    `
  document.getElementById('stats').innerHTML= template

  //*draw store
  template= '';
   template += `
   <div class="col-12 p-4 card bg-purp">
          <h2 class="text-warning text-center p-2">Store</h2>
    
            <div class="row justify-content-center pb-4">
              <button id= 'shovel' class="btn btn-warning itemGone" disabled onclick="buyShovel()">Shovel</button>
              <h4 class="my-auto text-warning pl-1 pr-5"> = ${clickUpgrade.shovel.price}</h4>
              <button id= 'ox' class="btn btn-warning itemGone" disabled onclick="buyOx()">Ox & Plow</button>
              <h4 class="my-auto text-warning pl-1"> = ${clickUpgrade.ox.price}</h4>
            </div>
        
          <div class="row justify-content-center pb-4">
            <button id= 'tractor' class="btn btn-warning itemGone" disabled onclick="buyTractor()">Tractor</button>
            <h4 class="my-auto text-warning pl-1 pr-5"> = ${automaticUpgrade.tractor.price}</h4>
    
            <button id= 'potatoMobile' class="btn btn-warning itemGone" disabled onclick='buyPotato()'>Potato Mobile!</button>
            <h4 class="my-auto text-warning pl-1"> = ${automaticUpgrade.potatoMobile.price}</h4>
          </div>
          <div class="text-center text-warning">Total Spent : ${purchaseTotal}</div>
        </div>
   `
   document.getElementById('store').innerHTML = template

   btnControl()
   btnDisable()
}

function btnDisable(){
   if(cheese.potato >= clickUpgrade.shovel.price){
    document.getElementById('shovel').removeAttribute('disabled')
   }
   if(cheese.potato >= clickUpgrade.ox.price){
   document.getElementById('ox').removeAttribute('disabled')
  }
   if(cheese.potato >= automaticUpgrade.tractor.price){
    document.getElementById('tractor').removeAttribute('disabled')
   }
   if(cheese.potato >= automaticUpgrade.potatoMobile.price){
    document.getElementById('potatoMobile').removeAttribute('disabled')
   }
}

//* Figure out how to only hide buttons till you were able to purchase it ONCE, even if you cannot anymore
function btnControl(){
  if(purchaseTotal>=50 || cheese.potato>=50){
    document.getElementById('shovel').classList.remove('itemGone')
   }
   if(purchaseTotal>=150 || cheese.potato>=150){
    document.getElementById('ox').classList.remove('itemGone')
   }
   if(purchaseTotal>=500 || cheese.potato>=500){
    document.getElementById('tractor').classList.remove('itemGone')
   }
   if(purchaseTotal>=10000 || cheese.potato>=10000){
    document.getElementById('potatoMobile').classList.remove('itemGone')
   }
}

let purchaseTotal = 0;
function purchase(item){
  if(item == 'shovel'){
    purchaseTotal += clickUpgrade.shovel.price
  }
  if(item == 'ox'){
    purchaseTotal += clickUpgrade.ox.price
  }
  if(item == 'tractor'){
    purchaseTotal += automaticUpgrade.tractor.price
  }
  if(item == 'potatoMobile'){
    purchaseTotal += automaticUpgrade.potatoMobile.price
  }
  console.log(purchaseTotal)
}

function awards(){
  let firstCheck = 1;
  let secCheck = 1;
  let thirdCheck = 1;
  let fourthCheck = 1;

  if((purchaseTotal + cheese.potato) == 10000 && (firstCheck = 1)){
    alert('Milestone Achieved: 10,000 Potatoes Harvested')
    firstCheck--
  }
  if((purchaseTotal + cheese.potato) == 50000 && (secCheck = 1)){
    alert('Milestone Achieved: 50,000 Potatoes Harvested')
    secCheck--
  }
  if((purchaseTotal + cheese.potato) == 100000 && (thirdCheck = 1)){
    alert('Milestone Achieved: 100,000 Potatoes Harvested')
    thirdCheck--
  }
  if((purchaseTotal + cheese.potato) == 1000000  && (fourthCheck = 1)){
    alert('Milestone Achieved: 1,000,000 Potatoes Harvested')
    fourthCheck--
  }
}


function buyShovel(){
  if(cheese.potato >= clickUpgrade.shovel.price){
    purchase('shovel')
    cheese.potato -= clickUpgrade.shovel.price;
    cheese.shovel++
    clickUpgrade.shovel.price += 50;
    cheeseModifier.tCM += 2;
    alert('Shovel Purchased')
  } 
  drawElements()
}

function buyOx(){
  if(cheese.potato >= clickUpgrade.ox.price){
    purchase('ox')
    cheese.potato -= clickUpgrade.ox.price;
    cheese.ox++
    clickUpgrade.ox.price += 150;
    cheeseModifier.tCM += 10;
    alert('Ox & Plow Purchased')
  } 
  drawElements()
}


function buyTractor(){
  if(cheese.potato >= automaticUpgrade.tractor.price){
    purchase('tractor')
    cheese.potato -= automaticUpgrade.tractor.price;
    cheese.tractor++
    cheeseModifier.tCM += 30;
    cheeseModifier.cPS += 10;
    automaticUpgrade.tractor.quantity++
    automaticUpgrade.tractor.price += 500;
    alert('Tractor Purchased')
  } 
  drawElements()
}

function buyPotato(){
  if(cheese.potato >= automaticUpgrade.potatoMobile.price){
    purchase('potatoMobile')
    cheese.potato -= automaticUpgrade.potatoMobile.price;
    cheese.potatoMobile++
    cheeseModifier.tCM += 300;
    cheeseModifier.cPS += 100;
    automaticUpgrade.potatoMobile.price += 10000;
    automaticUpgrade.potatoMobile.quantity++
    alert('Potato Purchased')
  } 
  drawElements()
}



function collectAutoUpgrades(){
  for(let key in automaticUpgrade){
    let keyLime = automaticUpgrade[key];
    cheese.potato += (keyLime.quantity * keyLime.multiplier)
  }
  drawElements()
}

function startInterval(){
  collectionInterval = setInterval(collectAutoUpgrades, 3000) 
}

drawElements()
startInterval()