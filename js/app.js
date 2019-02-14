'use strict';

function Horned(animal){
  this.title= animal.title;
  this.image_url= animal.image_url;
  this.description= animal.description;
  this.keyword=animal.keyword;
  this.horns=animal.horns;
}

Horned.allAnimals =[];

var keywords = [];

Horned.prototype.render = function(){
  $('main').append ('<div class ="clone"></div>');
  let animalClone = $('div[class="clone"]');

  let animalHtml = $('#photo-template').html();

  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('p').text(this.description);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
}

Horned.prototype.keywords = function(){
  if (keywords.includes(this.keyword)){
    console.log(this.keyword)
  } else {
    keywords.push(this.keyword);
    $('select').append(`<option value="${this.keyword}">${this.keyword}</option>`);
  }
}

Horned.readJson =() => {
  $.get('../data/page-1.json', 'json')
    .then (data => {
      data.forEach(obj =>{
        Horned.allAnimals.push(new Horned(obj));
      })
    })
    .then(Horned.loadAnimals)
}

Horned.loadAnimals =() => {
  Horned.allAnimals.forEach (animal => animal.render())
  Horned.allAnimals.forEach (animal => animal.keywords())
}

$(()=> Horned.readJson());

$('select[name="options"]').on('change', function() {
  let $selection = $(this).val();
  console.log('Money selection', $selection)
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})
