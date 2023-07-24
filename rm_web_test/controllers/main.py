# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64
from base64 import b64decode, b64encode
from odoo import http, SUPERUSER_ID, fields, _
from odoo.addons.auth_oauth.controllers.main import OAuthLogin
from odoo.addons.auth_signup.controllers.main import AuthSignupHome
from odoo.addons.auth_signup.models.res_users import SignupError
from odoo.addons.web.controllers.main import Home
from odoo.exceptions import UserError
from odoo.http import request
from odoo.tools import date_utils
from datetime import datetime
# import phonenumbers
import werkzeug
from werkzeug.exceptions import NotFound
import logging
import re
import random
import smtplib
import requests
import uuid
import json
import math
from odoo.addons.http_routing.models.ir_http import unslug
from odoo.exceptions import ValidationError


class WebTestRM(http.Controller):
    _partners_per_page = 5
    _pager_max_pages = 5

    @http.route(['/my/tes_product/new_tes_product/add_product'], type='json', auth="user")
    def add_product_rm(self, **kw):

        Product = request.env['product.product']
        ProductSupplier = request.env['product.supplierinfo']

        if kw:
            temp_gambar = kw.get("base64_picture")
            gambar = base64.b64decode(temp_gambar)
            name = kw.get('name')
            default_code = kw.get('default_code')
            barcode = kw.get('barcode') 
            list_price = kw.get('list_price')
            # product_id = False
            seller_ids = []
            try:
                for seller_id in kw.get('seller_ids'):
                    seller_ids.append((0,0,{
                        'name': seller_id['vendor'] if seller_id['vendor'] != 'null' else 26, # kodingannya begini karna selection vendor yang didepan kosong, mestinya itu diisi id dari selection. karna field ini ga boleh kosong makanya diisi sama res.partner asal
                        'price': float(seller_id['price']),
                        'delay': int(seller_id['delay'])
                    }))
                Product.create({
                    'name':name,
                    'default_code': default_code,
                    'barcode': barcode,
                    'list_price': float(list_price),
                    'image_1920': gambar,
                    'seller_ids': seller_ids
                })
            # except Exception as e:
            #     print("=======================================================",e)
            except:
                raise ValidationError('error input data product')
        return {'data':{}}
    
