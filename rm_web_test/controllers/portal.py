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

    # @http.route(['/my/tes_product/new_tes_product'], methods=["POST","GET"], type='http', auth="user", website=True)
    # def new_tes_product(self, **kw):
    #     prod = request.env['product.product'].search([])
    #     vals = {'products': prod, 'page_name':'view_create_form_tes_product'}
    #     if request.httprequest.method == 'POST':
    #         error_list = []
    #         if not kw.get("name"):
    #             error_list.append("Name Field Is Empty")
    #         if not kw.get("barcode"):
    #             error_list.append("Barcode Field Is Empty")
    #         if not kw.get("default_code"):
    #             error_list.append("Default Code Field Is Empty")
    #         if not kw.get("lst_price"):
    #             error_list.append("Price Field Is Empty")
            
    #         if not error_list:
    #             product = request.env['product.product'].create({
    #                 "name": kw.get("name"),
    #                 "barcode": kw.get("barcode"),
    #                 "default_code": kw.get("default_code"),
    #                 "lst_price": kw.get("lst_price"),
    #                 "image_1920": kw.get("base64_picture"),
    #             })              
    #             print("=========================================================",product)
    #             vendors = kw.get("vendor")
    #             print("==================================",vendors)
    #             prices = kw.get("price")
    #             print("==================================",prices)
    #             dlts = kw.get("dlt")

    #             seller_ids = []

    #             # if product:
    #             vendor = vendors
    #             price = prices
    #             dlt = dlts
    #             seller_ids.append((0, 0, {
    #                 'name': vendor,
    #                 'price': price,
    #                 'delay': dlt
    #             }))
    #             product.write({
    #                 'seller_ids': seller_ids
    #             })                
    #             success = "Insert Product Success"
    #             vals['success_message'] = success
    #         else:
    #             vals['error_list'] = error_list
    #     return request.render('rm_web_test.view_create_form_tes_product', vals)

    @http.route(['/my/tes_product/new_tes_product'], methods=["POST","GET"], type='http', auth="user", website=True)
    def new_tes_product(self, **kw):
        prod = request.env['product.product'].sudo().search([])
        vendor = request.env['res.partner'].sudo().search([])
        vals = {'products': prod, 'vendor': vendor, 'page_name':'view_create_form_tes_product'}

        if request.httprequest.method == 'POST':
            error_list = []
            if not kw.get("name"):
                error_list.append("Name Field Is Empty")
            if not kw.get("barcode"):
                error_list.append("Barcode Field Is Empty")
            if not kw.get("default_code"):
                error_list.append("Default Code Field Is Empty")
            if not kw.get("lst_price"):
                error_list.append("Price Field Is Empty")
            if not error_list:
                request.env['product.product'].create({
                    "name": kw.get("name"),
                    "barcode": kw.get("barcode"),
                    "default_code": kw.get("default_code"),
                    "lst_price": kw.get("lst_price"),
                    "image_1920": kw.get("base64_picture"),
                })
                success = "Insert Product Success"
                vals['success_message'] = success
            else:
                vals['error_list'] = error_list
        return request.render('rm_web_test.view_create_form_tes_product', vals)
    
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