let collectionInterval 

let cheese = {
  count: 50000,
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
     multiplier: 300,
   }
}

let cheeseModifier = {
  cPS: 0,
  tCM: 0,
}

function mine(){
cheese.count += (1 + (cheese.shovelCount*clickUpgrade.shovel.multiplier) + (cheese.oxCount*clickUpgrade.ox.multiplier))
 console.log(cheese)
 drawCheese()
}

function drawCheese(){
  let template = '';
    template += `
    <div class="text-center card card bg-purp">
        <h3>Inventory</h3>
        <p>Cheese: ${cheese.count} </p>
        <p>Ox & Plow: ${cheese.oxCount}</p>
        <p>Tractor: ${cheese.tractorCount}</p>
        <P>Potato Mobile: ${cheese.potatoCount}</p>
      </div>
    `
  document.getElementById('inventory').innerHTML= template
}

function drawAuto(){
  let template = '';
    template += `
    <div class="text-center card bg-purp">
        <h3>Stats</h3>
        <p>CPS: ${cheeseModifier.cPS} </p>
        <p>TCM: ${cheeseModifier.tCM}</p>
      </div>

    `
  document.getElementById('stats').innerHTML= template
}

function buyShovel(){
  if(cheese.count >= 50){
    cheese.count -= 50;
    cheese.shovelCount++
    cheeseModifier.tCM += 2;
    alert('Shovel Purchased')
  } else {
    alert('You dont have enough money')
  }
  drawCheese()
  drawAuto()
}

function buyOx(){
  if(cheese.count >= 150){
    cheese.count -= 150;
    cheese.oxCount++
    cheeseModifier.tCM += 10;
    alert('Ox & Plow Purchased')
  } else {
    alert('You dont have enough money')
  }
  drawCheese()
  drawAuto()
}


function buyTractor(){
  if(cheese.count >= 500){
    cheese.count -= 500;
    cheese.tractorCount++
    cheeseModifier.tCM += 30;
    cheeseModifier.cPS += 10;
    automaticUpgrade.tractor.quantity++
    alert('Tractor Purchased')
    drawCheese()
    drawAuto()
  } else {
    alert('You dont have enough money')
  }
  startInterval()
}

function buyPotato(){
  if(cheese.count >= 10000 ){
    cheese.count -= 10000;
    cheese.potatoCount++
    cheeseModifier.tCM += 300;
    cheeseModifier.cPS += 100;
    automaticUpgrade.potatoMobile.quantity++
    alert('Potato Purchased')
    drawCheese()
    drawAuto()
  } else {
    alert('You dont have enough money')
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
}

function startInterval(){
  collectionInterval = setInterval(collectAutoUpgrades, 3000) 
}

drawCheese()
drawAuto()
