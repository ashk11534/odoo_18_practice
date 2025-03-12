$(document).ready(function(){

    //Toggling sidebar (start)

    $('.sidebar-close-btn').click(function(){
        $('.dashboard-left').animate({width: '0', left: '-100%'}, "slow").hide('slow');
        $('.dashboard-right').animate({width: '100%'}, 'slow').addClass('dashboard-right-left-radius');
        $('.sidebar-open-btn').fadeIn('slow');
    })

    $('.sidebar-open-btn').click(function(){
        $('.dashboard-left').animate({width: '20%', left: '0'}, "slow").show();
        $('.dashboard-right').animate({width: '80%'}, 'slow').removeClass('dashboard-right-left-radius');
        $('.sidebar-open-btn').fadeOut('slow');
    })

    //Toggling sidebar (end)

})