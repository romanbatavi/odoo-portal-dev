# -*- coding: utf-8 -*-
from odoo.addons.portal.controllers.portal import CustomerPortal
from odoo.http import request
from odoo import http

class WebTestPortal(CustomerPortal):
    
    def _prepare_home_portal_values(self, counters):
        
        ret = super(WebTestPortal, self)._prepare_home_portal_values(counters)
        ret['employee_count'] = request.env['hr.employee'].sudo().search_count([])
        return ret

    # @http.route(['/my/tes_portal'], type='http')
    # def tesportalview(self, **kw):
    #     print("HALO SEMUANYA")
    #     return "HALO SEMUANYA"
    
    @http.route(['/my/tes_portal'], type='http', website=True)
    def tesportalview(self, **kw):
        employee_obj = request.env['hr.employee']
        employees = employee_obj.search([])
        vals = {'employees':employees, 'page_name':'view_tes_portal'}
        return request.render('rm_web_test.view_tes_portal', vals)