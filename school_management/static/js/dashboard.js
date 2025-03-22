$(document).ready(function(){

    // Toggling sidebar (start)

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

    // Toggling sidebar (end)

    // Toggling power button content (start)

    let isPowerButtonContentOpened = false;

    $('.power-button-icon').click(function(){
        isPowerButtonContentOpened = !isPowerButtonContentOpened;

        if(isPowerButtonContentOpened){
            $('.power-btn-content').fadeIn('slow');
        }

        else{
            $('.power-btn-content').fadeOut('slow');
        }

    })

    // Toggling power button content (end)

    // Handling menu tabs & tab content (start)

    $('.menu-item').click(function(){
        const tabId = $(this).data('tab');

        const hasSubMenus = $(this).data('has-sub-menus');

        $('.sub-menus').hide();

        if(hasSubMenus == 0){
            $('.menu-content').hide();

            $(`#menu-content-${tabId}`).fadeIn('slow');
        }

        else{
            $(`#sub-menus-${tabId}`).fadeIn('slow');
        }
    })

    // Handling menu tabs & tab content (end)

    // Handling session menu tabs & tab content (start)

    $('.session-configuration-tab').click(function(){
        const tabId = $(this).data('tab');

        $('.session-configuration-tab').removeClass('active-session-conf-tab');

        $(this).addClass('active-session-conf-tab');

        $('.session-configuration-tab-content').hide();

        $(`#session-configuration-tab-content-${tabId}`).fadeIn('slow');
    })

    // Handling session menu tabs & tab content (end)

})