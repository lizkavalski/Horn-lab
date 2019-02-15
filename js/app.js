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
//   $('main').append ('<div class ="clone"></div>');
//   let animalClone = $('div[class="clone"]');

//   let animalHtml = $('#photo-template').html();

//   animalClone.html(animalHtml);

//   animalClone.find('h2').text(this.title);
//   animalClone.find('img').attr('src', this.image_url);
//   animalClone.find('p').text(this.description);
//   animalClone.removeClass('clone');
//   animalClone.attr('class', this.keyword);
Horned.allAnimals.forEach(animalObject => {
  $('#animals').append(animalObject.toHtml());
});
}



Horned.prototype.keywords = function(){
  if (keywords.includes(this.keyword)){
    
  } else {
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
  Horned.allAnimals.forEach (animal => animal.render())
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
