"use strict";

let loadImg = (element) => {
  if(element.children().length){
    return;
  }
  let url = element.data('src');
  console.log(url);
}

var gallery;

$(function(){
  gallery = $('#gallery');
  //on scroll, update the URL
  //on url update, load the next image
 
  //on ready, create containers for all the images
  imgs.forEach(url => {
    gallery.append(`<div class='galItem' data-src='${url}'></div>`);
  })
  
   //on ready, load the first image
   loadImg($('.galItem').withinviewport().eq(0));

   $(document).scroll( e => {
    loadImg($('.galItem').withinviewport().eq(0));
   })
})