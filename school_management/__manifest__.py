{
    'name': 'School management system',
    'description': '''School management system.''',
    'summary': '''School management system.''',
    'depends': [],
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/menu_items.xml',

        # templates
        'templates/dashboard.xml',
        'templates/login.xml',
        'templates/base.xml'
    ],
    'installable': True,
    'application': True
}