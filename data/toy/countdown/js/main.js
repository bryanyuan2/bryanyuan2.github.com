$(document).ready(function() {

  var clean_all  = function(target) {
    $("#" + target).find('.a').css("border-top-color","#222"); 
    $("#" + target).find('.b').css("border-right-color","#222"); 
    $("#" + target).find('.c').css("border-right-color","#222"); 
    $("#" + target).find('.d').css("border-bottom-color","#222"); 
    $("#" + target).find('.e').css("border-left-color","#222"); 
    $("#" + target).find('.f').css("border-left-color","#222"); 
    $("#" + target).find('.g').find("div.top").css("border-bottom-color","#222");
    $("#" + target).find('.g').find("div.bottom").css("border-top-color","#222");
  }

  var a = function(target) {  $("#" + target).find('.a').css("border-top-color","#EE7A28"); }
  var b = function(target) {  $("#" + target).find('.b').css("border-right-color","#EE7A28"); }
  var c = function(target) {  $("#" + target).find('.c').css("border-right-color","#EE7A28"); }
  var d = function(target) {  $("#" + target).find('.d').css("border-bottom-color","#EE7A28"); }
  var e = function(target) {  $("#" + target).find('.e').css("border-left-color","#EE7A28"); }
  var f = function(target) {  $("#" + target).find('.f').css("border-left-color","#EE7A28"); }
  var g = function(target) {  $("#" + target).find('.g').find("div.top").css("border-bottom-color","#EE7A28");
                              $("#" + target).find('.g').find("div.bottom").css("border-top-color","#EE7A28"); }
  
  function digi_countdown(digi, target){
    if (digi == 0) { clean_all(target); a(target); b(target); f(target); c(target); d(target); e(target); }
    else if (digi == 1) { clean_all(target); b(target); c(target); }
    else if (digi == 2) { clean_all(target); a(target); b(target); e(target); d(target); g(target); }
    else if (digi == 3) { clean_all(target); a(target); b(target); c(target); d(target); g(target); }
    else if (digi == 4) { clean_all(target); b(target); f(target); c(target); g(target); }
    else if (digi == 5) { clean_all(target); a(target); f(target); g(target); c(target); d(target); }
    else if (digi == 6) { clean_all(target); a(target); f(target); g(target); c(target); d(target); e(target); }
    else if (digi == 7) { clean_all(target); a(target); b(target); c(target); }
    else if (digi == 8) { clean_all(target); a(target); b(target); f(target); g(target); c(target); d(target); e(target); }
    else if (digi == 9) { clean_all(target); a(target); b(target); f(target); g(target); c(target); }
  }

  var target_date = new Date();
  target_date.setMinutes(target_date.getMinutes() + 12);

  //var target_date = new Date("Aug 8, 2014").getTime();
  var days, hours, minutes, seconds;
  var countdown = document.getElementById("countdown");

  setInterval(function () {
      
      var current_date = new Date().getTime();
      var seconds_left = (target_date - current_date) / 1000;
   
      days = parseInt(seconds_left / 86400);
      seconds_left = seconds_left % 86400;
       
      hours = parseInt(seconds_left / 3600);
      seconds_left = seconds_left % 3600;
       
      minutes = parseInt(seconds_left / 60);
      seconds = parseInt(seconds_left % 60);

      // minutes
      minutes_2ed_digi = Math.floor(minutes/10);
      minutes_1st_digi = Math.floor(minutes%10);
      
      digi_countdown(minutes_2ed_digi, "minute_2ed");
      digi_countdown(minutes_1st_digi, "minute_1st");
      
      // seconds
      seconds_2ed_digi = Math.floor(seconds/10);
      seconds_1st_digi = Math.floor(seconds%10);
      
      digi_countdown(seconds_2ed_digi, "second_2ed");
      digi_countdown(seconds_1st_digi, "second_1st");
      
      // console.log(days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s");

      var total_ratio = (1-((days/350).toFixed(4)))*100;

      $(".ratio").text("").append(total_ratio + " " + "completed");

   
  }, 1000);


});