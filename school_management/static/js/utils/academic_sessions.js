
function getAcademicSessions(query){
    $.get('/academic-sessions', {query}, function(response){

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