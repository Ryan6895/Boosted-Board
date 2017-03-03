$(document).ready(function(){
  $(window).scroll(function() {
  let winScroll = $(this).scrollTop();
  console.log(winScroll);
  if (winScroll > 530){
    $(".homeCoverInfo").addClass("fadeOut")
  }else {
    $(".homeCoverInfo").addClass("fadeIn")
    $(".homeCoverInfo").removeClass("fadeOut")
  }
  if (winScroll > 1400){
    $(".homeGrayContainer").addClass("fadeOut")
  }else {
    $(".homeGrayContainer").addClass("fadeIn")
    $(".homeGrayContainer").removeClass("fadeOut")
  }
  if (winScroll > 530){
    $(".homeGrayContainer").addClass("fadeIn")
  }else {
    $(".homeGrayContainer").removeClass("fadeIn")
    $(".homeGrayContainer").addClass("fadeOut")
  }
  if ($(window).width() > 1000) {
    if (winScroll > 2970 && winScroll < 4400){
      $(".homeInfoPhoto").addClass("fadeIn")
      $(".homeInfoPhoto").removeClass("fadeOut")
    }else {
      $(".homeInfoPhoto").removeClass("fadeIn")
      //$(".homeInfoPhoto").addClass("fadeOut")
    }
  }
  if (winScroll > 310){
    $(".orangeLine").addClass("expandOrange")
    $(".blueLine").addClass("expandBlue")
    $(".mileageText").fadeIn()
    $(".mileageText").fadeIn()
  }
//   if ($(window).width() > 1000) {
//   if (winScroll > 2530){
//     $(".breezeContent").addClass("fadeOut")
//   }else {
     $(".breezeContent").addClass("fadeIn")
     $(".breezeContent").removeClass("fadeOut")
//   }
//   if (winScroll > 1470){
//     $(".breezeContent").addClass("fadeIn")
//   }else {
//     $(".breezeContent").removeClass("fadeIn")
//     $(".breezeContent").addClass("fadeOut")
//   }
// }
  if (winScroll > 3395){
    $(".remoteContent").addClass("fadeOut")
  }else {
    $(".remoteContent").addClass("fadeIn")
    $(".remoteContent").removeClass("fadeOut")
  }
  if (winScroll > 2315){
    $(".remoteContent").addClass("fadeIn")
  }else {
    $(".remoteContent").removeClass("fadeIn")
    $(".remoteContent").addClass("fadeOut")
  }
  if (winScroll > 5425){
    $(".breezetwoContent").addClass("fadeOut")
  }else {
    $(".breezetwoContent").addClass("fadeIn")
    $(".breezetwoContent").removeClass("fadeOut")
  }
  if (winScroll > 4265){
    $(".breezetwoContent").addClass("fadeIn")
  }else {
    $(".breezetwoContent").removeClass("fadeIn")
    //$(".breezetwoContent").addClass("fadeOut")
  }
  if (winScroll > 550){
    $(".coverContent").addClass("fadeOut")
  }else {
    $(".coverContent").removeClass("fadeOut")
  }
})
});
