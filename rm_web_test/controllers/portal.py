# -*- coding: utf-8 -*-
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.http import request
from odoo import http

class WebTestPortal(CustomerPortal):
    
    def _prepare_home_portal_values(self, counters):
        ret = super(WebTestPortal, self)._prepare_home_portal_values(counters)
        ret['product_count'] = request.env['product.product'].sudo().search_count([])
        return ret

    # @http.route(['/my/tes_product'], type='http')
    # def tesportalview(self, **kw):
    #     print("HALO SEMUANYA")
    #     return "HALO SEMUANYA"
    
    @http.route(['/my/tes_product'], type='http', website=True)
    def tes_product(self, **kw):
        product_obj = request.env['product.product']
        products = product_obj.search([])
        vals = {'products':products, 'page_name':'view_tes_product'}
        return request.render('rm_web_test.view_tes_product', vals)
    
    @http.route(['/my/tes_product/<model("product.product"):product_id>'], type='http', website=True)
    def tes_product_form(self, product_id, **kw):
        vals = {'products':product_id,  'page_name':'view_form_product'}
        return request.render('rm_web_test.view_form_tes_product', vals)