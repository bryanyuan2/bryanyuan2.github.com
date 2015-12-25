$(document).ready(function() {

    $("#yodel").click(function() {
        $("audio")[0].play();
    });

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

    var a = function(target, color) {  $("#" + target).find('.a').css("border-top-color",color); }
    var b = function(target, color) {  $("#" + target).find('.b').css("border-right-color",color); }
    var c = function(target, color) {  $("#" + target).find('.c').css("border-right-color",color); }
    var d = function(target, color) {  $("#" + target).find('.d').css("border-bottom-color",color); }
    var e = function(target, color) {  $("#" + target).find('.e').css("border-left-color",color); }
    var f = function(target, color) {  $("#" + target).find('.f').css("border-left-color",color); }
    var g = function(target, color) {  $("#" + target).find('.g').find("div.top").css("border-bottom-color",color);
        $("#" + target).find('.g').find("div.bottom").css("border-top-color",color); }

        function digi_countdown(digi, target, color){
            if (digi == 0) { clean_all(target); a(target,color); b(target,color); f(target,color); c(target,color); d(target,color); e(target,color); }
            else if (digi == 1) { clean_all(target); b(target,color); c(target,color); }
            else if (digi == 2) { clean_all(target); a(target,color); b(target,color); e(target,color); d(target,color); g(target,color); }
            else if (digi == 3) { clean_all(target); a(target,color); b(target,color); c(target,color); d(target,color); g(target,color); }
            else if (digi == 4) { clean_all(target); b(target,color); f(target,color); c(target,color); g(target,color); }
            else if (digi == 5) { clean_all(target); a(target,color); f(target,color); g(target,color); c(target,color); d(target,color); }
            else if (digi == 6) { clean_all(target); a(target,color); f(target,color); g(target,color); c(target,color); d(target,color); e(target,color); }
            else if (digi == 7) { clean_all(target); a(target,color); b(target,color); c(target,color); }
            else if (digi == 8) { clean_all(target); a(target,color); b(target,color); f(target,color); g(target,color); c(target,color); d(target,color); e(target,color); }
            else if (digi == 9) { clean_all(target); a(target,color); b(target,color); f(target,color); g(target,color); c(target,color); }
        }
        var isCounting = false;
        var countingInterval;

        var targetTime = getUrlParameter('time');
        if(!targetTime) {
            targetTime = 15;
        } else {
            targetTime = parseInt(targetTime);
        }

        var barColor = "#EE7A28";
        digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
        digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
        digi_countdown(0, "second_2ed",barColor);
        digi_countdown(0, "second_1st",barColor);

        $('#one_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 1;
            barColor = "#EE5555";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });
        $('#three_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 3;
            barColor = "#CCEECC";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });
        $('#five_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 5;
            barColor = "#CCEECC";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });
        $('#fifty_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 15;
            barColor = "#EE7A28";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });
        $('#ten_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 10;
            barColor = "#EE7A28";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });
        $('#twenty_min').click(function (e) {
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
            }
            targetTime = 20;
            barColor = "#EE7A28";
            digi_countdown(Math.floor(targetTime/10), "minute_2ed",barColor);
            digi_countdown(Math.floor(targetTime%10), "minute_1st",barColor);
            digi_countdown(0, "second_2ed",barColor);
            digi_countdown(0, "second_1st",barColor);
            countDown(e);
        });

        $('.brand').click(countDown);

        function countDown(e) {
            e.preventDefault();
            if(isCounting){
                isCounting = false;
                clearInterval(countingInterval);
                return;
            }
            isCounting = true;


            var target_date = new Date();
            target_date.setMinutes(target_date.getMinutes() + targetTime);
            console.log(targetTime);

            //var target_date = new Date("Aug 8, 2014").getTime();
            var days, hours, minutes, seconds;
            var countdown = document.getElementById("countdown");

            function counting_down () {

                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;
                if(seconds_left < 0){
                    isCounting = false;
                    clearInterval(countingInterval);  
                }

                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400 + 1;

                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;

                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);

                if(minutes >= 5 ){
                    barColor = "#EE7A28";
                }else if(minutes >=1){
                    barColor = "#CCEECC";
                }else{
                    barColor = "#EE5555";
                }

                // minutes
                minutes_2ed_digi = Math.floor(minutes/10);
                minutes_1st_digi = Math.floor(minutes%10);

                digi_countdown(minutes_2ed_digi, "minute_2ed",barColor);
                digi_countdown(minutes_1st_digi, "minute_1st",barColor);

                // seconds
                seconds_2ed_digi = Math.floor(seconds/10);
                seconds_1st_digi = Math.floor(seconds%10);

                digi_countdown(seconds_2ed_digi, "second_2ed",barColor);
                digi_countdown(seconds_1st_digi, "second_1st",barColor);

                // console.log(days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s");

                var total_ratio = (1-((days/350).toFixed(4)))*100;

                $(".ratio").text("").append(total_ratio + " " + "completed");

            };
            countingInterval = setInterval(counting_down, 1000);
        };
});


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
