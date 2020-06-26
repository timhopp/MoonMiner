function buyShovel(){
  if(cheese.count > 50){
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

function buyTractor(){
  if(cheese.count > 500){
    cheese.count -= 500;
    cheese.tractorCount++
    cheeseModifier.tCM += 20;
    automaticUpgrade.tractor.quantity++
    alert('Tractor Purchased')
    drawCheese()
    drawAuto()
  } else {
    alert('You dont have enough money')
  }
  startInterval()
}