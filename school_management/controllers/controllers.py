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
    def create_new_session(self, **kwargs):

        print(req.httprequest.method)

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
                    'active': _session.active
                })

            return json.dumps({'status': 'OK', 'code': 200, 'academic_sessions': all_academic_sessions_list})

