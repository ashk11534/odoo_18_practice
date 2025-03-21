# -*- coding: utf-8 -*-

import logging
import random

from odoo import http
from odoo.http import request
import json

logger = logging.getLogger(__name__)

class AwesomeDashboard(http.Controller):
    @http.route('/awesome_dashboard/statistics', type='json', auth='user')
    def get_statistics(self):
        """
        Returns a dict of statistics about the orders:
            'average_quantity': the average number of t-shirts by order
            'average_time': the average time (in hours) elapsed between the
                moment an order is created, and the moment is it sent
            'nb_cancelled_orders': the number of cancelled orders, this month
            'nb_new_orders': the number of new orders, this month
            'total_amount': the total amount of orders, this month
        """

        return {
            'average_quantity': random.randint(4, 12),
            'average_time': random.randint(4, 123),
            'nb_cancelled_orders': random.randint(0, 50),
            'nb_new_orders': random.randint(10, 200),
            'orders_by_size': {
                'm': random.randint(0, 150),
                's': random.randint(0, 150),
                'xl': random.randint(0, 150),
            },
            'total_amount': random.randint(100, 1000)
        }

    @http.route('/sales-count', type='json', auth='public', csrf=False)
    def retrieve_sales_count(self):
        sales_count = request.env['sale.order'].sudo().search_count([])
        return sales_count

    @http.route('/products-count', type='json', auth='public', csrf=False)
    def retrieve_products_count(self):
        products_count = request.env['product.template'].sudo().search_count([])
        return products_count

    @http.route('/fetch-top-sales', type='json', auth='public', csrf=False)
    def fetch_top_sales(self):
        top_sales = request.env['sale.order'].sudo().search([], limit=10, order='id desc')
        top_sales_list = []

        for sale in top_sales:
            top_sales_list.append({
                'sale_id': sale.id,
                'sale_name': sale.name
            })

        return top_sales_list

    @http.route('/fetch-top-purchase-orders', type='json', auth='public', csrf=False)
    def fetch_top_purchase_orders(self):
        top_purchase_orders = request.env['purchase.order'].sudo().search([], limit=10, order='id desc')
        top_purchase_orders_list = []

        for purchase_order in top_purchase_orders:
            top_purchase_orders_list.append({
                'purchase_order_id': purchase_order.id,
                'purchase_order_name': purchase_order.name
            })

        return top_purchase_orders_list
