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

        // Retrieving all academic sessions (start)

        if(tabId === 2){
            $('.all-academic-sessions-loader-container').fadeIn('slow');

            $.get('/academic-sessions', {}, function(response){

                const res = JSON.parse(response);

                const academicSessions = res.academic_sessions;

                $('.all-session-table table').empty();

                const academicSessionsTRArray = academicSessions.map((_session, index) => {
                    return `<tr>
                                <td>${index + 1}</td>
                                <td id="academic-session-current-val-${_session.id}">${_session.academic_session}</td>
                                <td id="academic-term-current-val-${_session.id}">${_session.academic_term}</td>
                                <td id="academic-session-current-active-${_session.id}">${_session.active ? 'Yes' : 'No'}</td>
                                <td class="session-action-buttons">
                                    <button class="session-action-btn bg-dark session-action-btn-edit" data-record-id=${_session.id}><i class="fa-solid fa-pen"></i></button>
                                    <button class="session-action-btn bg-danger session-action-btn-delete" data-record-id=${_session.id}><i class="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>`
                })

                const sessionTableHead = `<tr>
                                            <th>#</th>
                                            <th>Session</th>
                                            <th>Term</th>
                                            <th>Active</th>
                                            <th>Action</th>
                                        </tr>`;

                $('.all-session-table table').prepend(sessionTableHead);

                $('.all-session-table table').append(academicSessionsTRArray);

            })
        }

        $(`#session-configuration-tab-content-${tabId}`).fadeIn('slow');

        $('.all-academic-sessions-loader-container').fadeOut('slow');

        // Retrieving all academic sessions (end)
    })

    // Handling session menu tabs & tab content (end)

    // Creating new academic session (start)

    $('.save-session-settings-btn').click(function(){
        const academicSession = $('#academic-session-input-id').val().trim();
        const academicTerm = $('#academic-term-input-id').val().trim();

        const academicSessionParts = academicSession.split('-').map(part => part.trim()).filter(part => part !== '');

        if(academicSession.length !== 0 && (academicSessionParts.length < 2 || academicSessionParts.length > 2 || isNaN(academicSessionParts[0]) || isNaN(academicSessionParts[1]) || academicSessionParts[0].includes('e') || academicSessionParts[1].includes('e'))){
            $('#academic-session-invalid-req-field').fadeIn('slow');
            $('#academic-session-input-req-field').fadeOut('slow');
            $('#academic-term-input-req-field').fadeOut('slow');
            return;
        }

        else{
           if(parseInt(academicSessionParts[0]) > parseInt(academicSessionParts[1])){
               $('#academic-session-invalid-req-field').fadeIn('slow');
               $('#academic-session-input-req-field').fadeOut('slow');
               $('#academic-term-input-req-field').fadeOut('slow');
               return;
           }

           $('#academic-session-invalid-req-field').fadeOut('slow');
        }

        if (academicSession.length === 0 || academicTerm.length === 0){
            if (academicSession.length === 0){
                $('#academic-session-input-req-field').fadeIn('slow');
            }

            else{
                $('#academic-session-input-req-field').fadeOut('slow');
            }

            if (academicTerm.length === 0){
                $('#academic-term-input-req-field').fadeIn('slow');
            }

            else{
                $('#academic-term-input-req-field').fadeOut('slow');
            }

            return;
        }

        else{
            $('#academic-session-input-req-field').fadeOut('slow');
            $('#academic-term-input-req-field').fadeOut('slow');
        }

        $('.screen-loader-overlay-container').fadeIn('slow');

        const data = {
           academicSession, academicTerm
        }

        $.post('/academic-sessions', data, function(response){
            const res = JSON.parse(response);

            if(res.code === 201){

                $('#academic-session-input-id').val('');

                $('#academic-term-input-id').val('');

                $('.screen-loader-overlay-container').fadeOut('slow', function(){

                    if($('.screen-loader-overlay-container').css('display') === 'none'){

                        $('.record-created-successfully').fadeIn('slow');

                        setTimeout(function(){

                            $('.record-created-successfully').fadeOut('slow');

                        }, 3000);

                    }

                });
            }

            if(res.code === 400){
                $('.screen-loader-overlay-container').fadeOut('slow', function(){

                    $('.record-creation-failed').fadeIn('slow');

                    setTimeout(function(){

                        $('.record-creation-failed').fadeOut('slow');

                    }, 3000);

                });
            }
        })
    })

    // Creating new academic session (end)

    // Deleting academic session (start)

    $(document).on('click', '.session-action-btn-delete', function(){
        const recordId = $(this).data('record-id');

        $('.delete-record-overlay-action-confirm-btn').data('record-id', recordId);

        $('.delete-record-overlay-container').fadeIn('slow');
    })

    $('.delete-record-overlay-action-cancel-btn ').click(function(){
        $('.delete-record-overlay-container').fadeOut('slow');
    })

    $('.delete-record-overlay-action-confirm-btn').click(function(){

        $('.all-academic-sessions-loader-container').fadeIn('slow');

        const recordId = $(this).data('record-id');

        $.ajax({
            url: `/academic-sessions/${recordId}`,
            type: 'DELETE',
            success: function(response){
                const res = JSON.parse(response);

                if(res.code === 201){
                    $('.delete-record-overlay-container').fadeOut('slow');

                    $('.all-academic-sessions-loader-container').fadeOut('slow', function(){
                        $('.record-deleted-successfully').fadeIn('slow');

                        setTimeout(function(){

                            $('.record-deleted-successfully').fadeOut('slow');

                        }, 3000);
                    });

                }

                if(res.code === 400){
                    $('.delete-record-overlay-container').fadeOut('slow');

                    $('.all-academic-sessions-loader-container').fadeOut('slow', function(){
                        $('.record-deletion-failed').fadeIn('slow');

                        setTimeout(function(){

                            $('.record-deletion-failed').fadeOut('slow');

                        }, 3000);
                    });

                }

                $('.session-configuration-tab-2').trigger('click');
            },
            error: function(xhr, status, error){}
        })
    })

    // Deleting academic session (end)

    // Editing academic session (start)

    $(document).on('click', '.session-action-btn-edit', function(){
        $('.update-academic-session-update-btn').data('record-id', '');
        $('#update-academic-session-input-id').val('');
        $('#update-academic-term-input-id').val('');

        const recordId = $(this).data('record-id');

        const currentAcademicSessionVal = $(`#academic-session-current-val-${recordId}`).text();
        const currentAcademicTermVal = $(`#academic-term-current-val-${recordId}`).text();
        const currentAcademicActiveStatus = $(`#academic-session-current-active-${recordId}`).text();

        $('.update-academic-session-update-btn').data('record-id', recordId);
        $('#update-academic-session-input-id').val(currentAcademicSessionVal);
        $('#update-academic-term-input-id').val(currentAcademicTermVal);

        const academicSessionActiveHTML = `
            <label class="form-check-label update-academic-session-active-label-${recordId}" for="update-academic-session-active-id-${recordId}">Active</label>
            <input class="form-check-input" type="checkbox" id="update-academic-session-active-id-${recordId}"/>`;

        $('.update-academic-session-active-placeholder').empty();

        $('.update-academic-session-active-placeholder').append(academicSessionActiveHTML);

        if(currentAcademicActiveStatus === 'Yes'){
            $(`#update-academic-session-active-id-${recordId}`).attr('checked', 'true');
        }

        $('.update-academic-session-overlay-container').fadeIn('slow');
    })

    $('.update-academic-session-cancel-btn').click(function(){
        $('.update-academic-session-overlay-container').fadeOut('slow');
    })

    $('.update-academic-session-update-btn').click(function(){
        const recordId = $(this).data('record-id');
        const updateAcademicSession = $(this).closest('.update-academic-session-modal').find('#update-academic-session-input-id').val();
        const updateAcademicTerm = $(this).closest('.update-academic-session-modal').find('#update-academic-term-input-id').val();
        const updateAcademicActive = $(this).closest('.update-academic-session-modal').find('.form-check-input').prop('checked');

        const data = {
            recordId: recordId,
            academicSession: updateAcademicSession,
            academicTerm: updateAcademicTerm,
            active: updateAcademicActive
        };

        $.ajax({
            url: `/academic-sessions/${recordId}`,
            type: 'PUT',
            data: data,
            success: function(response){
                const res = JSON.parse(response);

                if(res.code === 201){
                    $('.update-academic-session-overlay-container').fadeOut('slow', function(){
                        $('.record-updated-successfully').fadeIn('slow');

                        setTimeout(function(){

                            $('.record-updated-successfully').fadeOut('slow');

                        }, 3000);
                    });
                }

                if(res.code === 400){
                    $('.update-academic-session-overlay-container').fadeOut('slow', function(){
                        $('.record-update-failed').fadeIn('slow');

                        setTimeout(function(){

                            $('.record-update-failed').fadeOut('slow');

                        }, 3000);
                    });
                }

                $('.session-configuration-tab-2').trigger('click');
            },
            error: function(xhr, status, error){}
        })
    })

    // Editing academic session (end)

    // Searching academic session (start)

    $('.all-session-search-btn').click(function(){
        const inputValue = $('.all-session-search-input').val();

        console.log(inputValue)
    })

    // Searching academic session (end)

})