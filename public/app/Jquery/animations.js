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
  if (winScroll > 2970 && winScroll < 4400){
    $(".homeInfoPhoto").addClass("fadeIn")
    $(".homeInfoPhoto").removeClass("fadeOut")
  }else {
    $(".homeInfoPhoto").removeClass("fadeIn")
    $(".homeInfoPhoto").addClass("fadeOut")
  }
  if (winScroll > 310){
    $(".orangeLine").addClass("expandOrange")
    $(".blueLine").addClass("expandBlue")
    $(".mileageText").fadeIn()
    $(".mileageText").fadeIn()
  }
})
});
