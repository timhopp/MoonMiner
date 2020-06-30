let cheese = {
  count: 499,
  shovelCount: 0,
  oxCount: 0,
  tractorCount: 0,
  potatoCount: 0,
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
cheese.count += (1 + (cheese.shovelCount*clickUpgrade.shovel.multiplier) + (cheese.oxCount*clickUpgrade.ox.multiplier));
 drawCheese()
 drawPotato()
 drawStore()
 
}

function drawCheese(){
  let template = '';
    template += `
    <div class="text-center text-warning card card bg-purp p-4">
        <h2>Inventory</h2>
        <h5>Shovel : ${cheese.shovelCount}</h5>
        <h5>Ox & Plow : ${cheese.oxCount}</h5>
        <h5>Tractor : ${cheese.tractorCount}</h5>
        <h5>Potato Mobile : ${cheese.potatoCount}</h5>
      </div>
    `
  document.getElementById('inventory').innerHTML= template
}

function drawPotato(){
  let template = '';
  template += `
  <div class="row mx-auto my-auto">
   <img id = "potatoImg" class="potatoImg mx-auto my-auto potatoShadow" src="https://i.pinimg.com/originals/dd/8a/41/dd8a410fb404f776e3cad0927c5e809e.png">
  <h2 class=" potatoText text-center text-warning pt-5">${cheese.count}</h2>
  </div>
 `
 document.getElementById('potato').innerHTML= template
}

function drawAuto(){
  let template = '';
    template += `
    <div class="text-center card text-warning bg-purp p-4">
        <h2>Stats</h2>
        <h5>Potatoes Per Second : ${cheeseModifier.cPS} </h5>
        <h5>Total Potato Multiplier : ${cheeseModifier.tCM}</h5>
      </div>

    `
  document.getElementById('stats').innerHTML= template
  drawPotato()
}

function drawStore(){
  let template= '';
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
          
        </div>
   `

   //* Figure out how to only hide buttons till you were able to purchase it ONCE, even if you cannot anymore
   document.getElementById('store').innerHTML = template
   if(cheese.count >= clickUpgrade.shovel.price){
    document.getElementById('shovel').removeAttribute('disabled')
   }
   if(cheese.count >= 50 || (cheeseModifier.tCM>= 1 && cheese.shovelCount >=1)){
    document.getElementById('shovel').classList.remove('itemGone')
   }

   if(cheese.count >= clickUpgrade.ox.price){
   document.getElementById('ox').removeAttribute('disabled')
  }
   if(cheese.count >= 150 || (cheeseModifier.tCm>= 1)){
    document.getElementById('ox').classList.remove('itemGone')
   }

   if(cheese.count >= automaticUpgrade.tractor.price){
    document.getElementById('tractor').removeAttribute('disabled')
   }

   if(cheese.count >= 500 || (cheeseModifier.tCM>= 1 && cheese.tractorCount >=1)){
    document.getElementById('tractor').classList.remove('itemGone')
   }

   if(cheese.count >= automaticUpgrade.potatoMobile.price){
    document.getElementById('potatoMobile').removeAttribute('disabled')
   }

   if(cheese.count >= 10000 || (cheeseModifier.tCM>= 1 && cheese.potatoCount >=1)){
    document.getElementById('potatoMobile').classList.remove('itemGone')
   }

   drawPotato()
  }


function buyShovel(){
  if(cheese.count >= clickUpgrade.shovel.price){
    cheese.count -= clickUpgrade.shovel.price;
    cheese.shovelCount++
    cheese.total++
    clickUpgrade.shovel.price += 50;
    cheeseModifier.tCM += 2;
    alert('Shovel Purchased')
  } 
  drawCheese()
  drawAuto()
  drawStore()
}

function buyOx(){
  if(cheese.count >= clickUpgrade.ox.price){
    cheese.count -= clickUpgrade.ox.price;
    cheese.oxCount++
    cheese.total++
    clickUpgrade.ox.price += 150;
    cheeseModifier.tCM += 10;
    alert('Ox & Plow Purchased')
  } 
  drawCheese()
  drawAuto()
  drawStore()
}


function buyTractor(){
  if(cheese.count >= automaticUpgrade.tractor.price){
    cheese.count -= automaticUpgrade.tractor.price;
    cheese.tractorCount++
    cheese.total++
    cheeseModifier.tCM += 30;
    cheeseModifier.cPS += 10;
    automaticUpgrade.tractor.quantity++
    automaticUpgrade.tractor.price += 500;
    alert('Tractor Purchased')
    drawCheese()
    drawAuto()
    drawStore()
  } 
  startInterval()
}

function buyPotato(){
  if(cheese.count >= automaticUpgrade.potatoMobile.price){
    cheese.count -= automaticUpgrade.potatoMobile.price;
    cheese.potatoCount++
    cheese.total++
    cheeseModifier.tCM += 300;
    cheeseModifier.cPS += 100;
    automaticUpgrade.potatoMobile.price += 10000;
    automaticUpgrade.potatoMobile.quantity++
    alert('Potato Purchased')
    drawCheese()
    drawAuto()
    drawStore()
  } 
  startInterval()
}



function collectAutoUpgrades(){
  for(let key in automaticUpgrade){
    let keyLime = automaticUpgrade[key];
    cheese.count += (keyLime.quantity * keyLime.multiplier)
  }
  drawCheese()
  drawAuto()
  drawPotato()
  drawStore()
}

function startInterval(){
  collectionInterval = setInterval(collectAutoUpgrades, 3000) 
}

drawCheese()
drawAuto()
drawStore()
drawPotato()
