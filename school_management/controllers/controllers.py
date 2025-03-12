from odoo import http
from odoo.http import request as req


class BaseController(http.Controller):
    @http.route('/', type='http', auth='public')
    def dashboard(self):
        return req.render('school_management.school_management_dashboard_template', {})


    @http.route('/login', type='http', auth='public')
    def login(self):
        return req.render('school_management.school_management_login_template', {})

