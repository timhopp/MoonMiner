let collectionInterval 

let cheese = {
  count: 20000,
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
cheese.count += (1 + (cheese.shovelCount*clickUpgrade.shovel.multiplier) + (cheese.oxCount*clickUpgrade.ox.multiplier))
 console.log(cheese)
 drawCheese()
 drawPotato()
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
  <div class="row card bg-purp">
  <img class = "potatoImg mx-auto my-auto" src="https://i.pinimg.com/originals/dd/8a/41/dd8a410fb404f776e3cad0927c5e809e.png">
</div>
<div class="row justify-content-center card bg-purp">
  <h4 class="text-center text-warning">Potato Count: ${cheese.count}</h4>
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
              <button classId= 'shovel' class="btn btn-warning" onclick="buyShovel()">Shovel</button>
              <h4 class="my-auto text-warning pl-1 pr-5"> = ${clickUpgrade.shovel.price}</h4>
              <button classId= 'ox' class="btn btn-warning" onclick="buyOx()">Ox & Plow</button>
              <h4 class="my-auto text-warning pl-1"> = ${clickUpgrade.ox.price}</h4>
            </div>
        
          <div class="row justify-content-center pb-4">
            <button classId= 'tractor' class="btn btn-warning" onclick="buyTractor()">Tractor</button>
            <h4 class="my-auto text-warning pl-1 pr-5"> = ${automaticUpgrade.tractor.price}</h4>
    
            <button classId= 'potatoMobile' class="btn btn-warning" onclick='buyPotato()'>Potato Mobile!</button>
            <h4 class="my-auto text-warning pl-1"> = ${automaticUpgrade.potatoMobile.price}</h4>
          </div>
          
        </div>
   `
   document.getElementById('store').innerHTML = template
   drawPotato()

}

function buyShovel(){
  if(cheese.count >= 50){
    cheese.count -= 50;
    cheese.shovelCount++
    clickUpgrade.shovel.price += 50;
    cheeseModifier.tCM += 2;
    alert('Shovel Purchased')
  } else {
    alert('You dont have enough money')
  }
  drawCheese()
  drawAuto()
  drawStore()
}

function buyOx(){
  if(cheese.count >= 150){
    cheese.count -= 150;
    cheese.oxCount++
    clickUpgrade.ox.price += 150;
    cheeseModifier.tCM += 10;
    alert('Ox & Plow Purchased')
  } else {
    alert('You dont have enough money')
  }
  drawCheese()
  drawAuto()
  drawStore()
}


function buyTractor(){
  if(cheese.count >= 500){
    cheese.count -= 500;
    cheese.tractorCount++
    cheeseModifier.tCM += 30;
    cheeseModifier.cPS += 10;
    automaticUpgrade.tractor.quantity++
    automaticUpgrade.tractor.price += 500;
    alert('Tractor Purchased')
    drawCheese()
    drawAuto()
    drawStore()
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
    automaticUpgrade.potatoMobile.price += 10000;
    automaticUpgrade.potatoMobile.quantity++
    alert('Potato Purchased')
    drawCheese()
    drawAuto()
    drawStore()
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
  drawPotato()
}

function startInterval(){
  collectionInterval = setInterval(collectAutoUpgrades, 3000) 
}

drawCheese()
drawAuto()
drawStore()
drawPotato()
