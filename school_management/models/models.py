from odoo import fields, models


class AcademicSession(models.Model):
    _name = 'sm.academic.session'
    _description = 'School management academic session'
    _rec_name = 'sm_ac_session'
    _order = 'id desc'

    sm_ac_session = fields.Char(string='Session', required=True)
    term = fields.Selection([
        ('first', 'First'),
        ('second', 'Second'),
        ('final', 'Final'),
    ], string='Term', required=True)
    active = fields.Boolean(default=True, string='Active')