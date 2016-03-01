"use strict";
var iHeight;

let getSize = () => {
  iHeight = $(window).height();
}

let prevID = (el) => {
  let id = 0;
  el.prevAll().each(function(i,e){
    let tid = $(e).attr('id');
    if(typeof tid !== "undefined"){
      id = tid;
      return false;
    }
  });
  return id;
}

let strip = (str) => {
  return str.split('url(').join('').split(')').join('').split('"').join('').split("'").join('');
}

let swapimg = (el) => {
  if(el.data('swapped')){
    return;
  }
  let img = el.find('.image');
  let src = img.css('backgroundImage');
  if(typeof src == "undefined"){
    return;
  }

  let newsrc = img.css('backgroundImage').replace('lores','highres');
  newsrc = strip(newsrc);
  $("<img />").attr("src", newsrc).on('load', () => {
    img.css({
      backgroundImage: newsrc
    }).parent().data('swapped',true);
    console.log(img[0].outerHTML);
  });

}


$(function(){
  getSize();

  if(window.location.hash){
    let el = $(`#sect_${window.location.hash.replace('#','')}`);
    $('html, body').animate({
        scrollTop: el.offset().top
    }, 50);
  }

  $('.contact--1').on('click',function(){
    $('.intro--contact').toggleClass('show');
  })

  $(window).on('resize',getSize);
  //on scroll, update the URL
  //on url update, load the next image
  
   //on ready, load the first image

   $(document).scroll( e => {
    let current = Math.round($(window).scrollTop() / iHeight);
    let currentEl = $('body').children(`:eq(${current})`);
    let id = currentEl.attr('id');
    if(typeof id == "undefined"){
      id = prevID(currentEl);
    }
    window.location.hash = id.replace('sect_','');

    var next = currentEl.next();
    swapimg(next);
    var prev = currentEl.prev();
    swapimg(prev);

    if(id === "sect_video"){
      $('video')[0].play();
    }else{
      $('video')[0].pause();
    }
   })
})