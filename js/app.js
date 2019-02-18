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

Horned.prototype.toHtml =function(){
  const template = $('#animal-template').html();
  const compiled = Handlebars.compile(template);
  return compiled(this);
}

Horned.prototype.render = function(){
  Horned.allAnimals.forEach(animalObject => {
    $('#animals').append(animalObject.toHtml());
  });
}

Horned.prototype.keywords = function(){
  if (keywords.includes(this.keyword)){} else {
    keywords.push(this.keyword);
    console.log(this.keyword)
    $('select').append(`<option value="${this.keyword}" id="created">${this.keyword}</option>`);
  }
}

Horned.readJson =(page) => {
  $.get(page, 'json')
    .then (data => {
      data.forEach(obj =>{
        Horned.allAnimals.push(new Horned(obj));
      })
    })
    .then(Horned.loadAnimals)
}

Horned.loadAnimals =() => {
  Horned.allAnimals.forEach(animalObject => {
    $('#animals').append(animalObject.toHtml());
  });
  Horned.allAnimals.forEach (animal => animal.keywords())
}

$(()=> Horned.readJson('../data/page-1.json'));

$('select[name="options"]').on('change', function() {
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})

$('button[name="page-2"]').on('click', function() {
  Horned.allAnimals = [];
  keywords = [];
  $('option').remove();
  $('select').append(`<option value="default">Sort by keyword</option>`);
  $('main div').remove();
  $('select').val('1');
  $(()=> Horned.readJson('../data/page-2.json'));
})

$('button[name="page-1"]').on('click', function() {
  Horned.allAnimals = [];
  keywords = [];
  $('option').remove();
  $('select').append(`<option value="default">Sort by keyword</option>`);
  $('main div').remove();
  $('select').val('1');
  $(()=> Horned.readJson('../data/page-1.json'));
})
