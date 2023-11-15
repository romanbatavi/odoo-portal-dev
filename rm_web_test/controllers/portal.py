# -*- coding: utf-8 -*-
import base64
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.http import request
from odoo import http

class WebTestPortal(CustomerPortal):
    
    def _prepare_home_portal_values(self, counters):
        ret = super(WebTestPortal, self)._prepare_home_portal_values(counters)
        ret['product_count'] = request.env['product.product'].sudo().search_count([])
        return ret

    @http.route(['/my/tes_product/new_tes_product'], type='http', auth="user", website=True)
    def new_tes_product(self, **kw):
        prod = request.env['product.product'].sudo().search([])
        vendor = request.env['res.partner'].sudo().search([])
        vals = {'products': prod, 'vendor': vendor, 'page_name':'view_create_form_tes_product'}
        return request.render('rm_web_test.view_create_form_tes_product', vals)
    
    @http.route(['/my/tes_product'], type='http', website=True)
    def tes_product(self, **kw):
        products = request.env['product.product'].sudo().search([])
        vendor = request.env['res.partner'].sudo().search([])
        vals = {'products':products, 'vendor':vendor, 'page_name':'view_tes_product'}
        return request.render('rm_web_test.view_tes_product', vals)
    
    @http.route(['/my/tes_product/<model("product.product"):product_id>'], type='http', website=True)
    def tes_product_form(self, product_id, **kw):
        vals = {'products':product_id,  'page_name':'view_form_product'}
        return request.render('rm_web_test.view_form_tes_product', vals)