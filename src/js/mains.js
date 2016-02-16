"use strict";
var iHeight;

let loadImg = (element) => {
  if(element.children().length){
    return;
  }
  let url = element.data('src');
  console.log(url);
}

let getSize = () => {
  iHeight = $(window).height();
}

let prevID = (el) => {
  let id = 0;
  el.prevAll('.page').each(function(i,e){
    let tid = $(e).attr('id');
    if(typeof tid !== "undefined"){
      id = tid;
      return false;
    }
  });
  return id;
}


$(function(){
  getSize();

  if(window.location.hash){
    let el = $(`#sect_${window.location.hash.replace('#','')}`);
    $('html, body').animate({
        scrollTop: el.offset().top
    }, 2000);
  }

  $(window).on('resize',getSize);
  //on scroll, update the URL
  //on url update, load the next image
  
   //on ready, load the first image

   $(document).scroll( e => {
    let current = Math.round($(window).scrollTop() / iHeight);
    let id = $(`.page:eq(${current})`).attr('id');
    if(typeof(id) == "undefined"){
      id = prevID($(`.page:eq(${current})`));
    }
    window.location.hash = id.replace('sect_','');
   })
})