/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();
var ubvSelector = document.getElementById('ubv');
var jsSelector = document.getElementById('complexity');
var wsjfCalc = document.getElementById('wsjf');
var warning = document.getElementById('warning');



document.getElementById('save').addEventListener('click', function(){
  return t.set('card', 'shared', 'ubv', ubvSelector.value)
  .then(function(){
    return t.set('card', 'shared',  'complexity', jsSelector.value)
  })
  .then(function(){
    /* John would like whole numbers, hence *100 and use ceil for those where wsjf < 1 */
    var wsjfval = Math.ceil((ubvSelector.value/jsSelector.value)*100)    
    return t.set('card', 'shared',  'wsjf', wsjfval)
  
  })
  .then(function(){
   
   
     t.closePopup();
  });
});

var wsjf = 0;

t.render(function(){
  return Promise.all([
    t.get('card', 'shared', 'ubv'),
    t.get('card', 'shared', 'complexity'),
    t.get('card', 'shared', 'wsjf'),
    
    ])
  .spread(function(savedUbv, savedJs, savedWsjf){
    
     ubvSelector.value = savedUbv;
     jsSelector.value = savedJs;
     wsjfCalc.innerHTML = savedWsjf; 
     jsSelector.innerHTML = savedJs;
    
  })
  .then(function(){
    t.sizeTo('#content')
    .done();
  })
});

