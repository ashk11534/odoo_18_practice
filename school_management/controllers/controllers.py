from odoo import http
from odoo.http import request as req
import json


class BaseController(http.Controller):
    @http.route('/', type='http', auth='user')
    def dashboard(self):
        return req.render('school_management.school_management_dashboard_template', {})


    @http.route('/login', type='http', auth='public')
    def login(self):
        return req.render('school_management.school_management_login_template', {})


    @http.route('/academic-sessions', methods=['POST', 'GET'], type='http', auth='user', csrf=False)
    def create_and_get_sessions(self, **kwargs):

        if req.httprequest.method == 'POST':

            academic_session = kwargs.get('academicSession')
            academic_term = kwargs.get('academicTerm')

            existing_academic_session = req.env['sm.academic.session'].sudo().search([('sm_ac_session', '=', academic_session), ('term', '=', academic_term)])

            if existing_academic_session:
                return json.dumps({'status': 'Exists', 'code': 400,'id': None,'academic_session': academic_session, 'academic_term': academic_term})

            else:
                new_ac_session = req.env['sm.academic.session'].sudo().create({
                    'sm_ac_session': academic_session,
                    'term': academic_term
                })

            return json.dumps({'status': 'OK', 'code': 201, 'id': new_ac_session.id, 'academic_session': academic_session, 'academic_term': academic_term})


        else:

            all_academic_sessions = req.env['sm.academic.session'].sudo().search([])

            all_academic_sessions_list = []

            for _session in all_academic_sessions:
                all_academic_sessions_list.append({
                    'id': _session.id,
                    'academic_session': _session.sm_ac_session,
                    'academic_term': _session.term,
                    'active': _session.is_active
                })

            return json.dumps({'status': 'OK', 'code': 200, 'academic_sessions': all_academic_sessions_list})


    @http.route('/academic-sessions/<int:record_id>', methods=['GET', 'DELETE'], type='http', auth='user', csrf=False)
    def get_or_delete_academic_session(self, record_id):

        if req.httprequest.method == 'DELETE':
            record_id = int(record_id) if record_id else None
            academic_session_obj = req.env['sm.academic.session'].sudo().search([('id', '=', record_id)])

            is_deleted = academic_session_obj.unlink()

            if is_deleted:
                return json.dumps({'status': 'OK', 'code': 201, 'id': record_id})

            else:
                return json.dumps({'status': 'Not Found', 'code': 400, 'id': None})

