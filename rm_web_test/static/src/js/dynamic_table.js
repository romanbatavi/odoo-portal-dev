odoo.define('rm_web_test.dynamictableeeee', function (require) {
    'use strict';


    var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var core = require('web.core');
    var utils = require('web.utils');
    var ajax = require('web.ajax');
    var _t = core._t;

    publicWidget.registry.ModalCreateProduct = publicWidget.Widget.extend({
        selector: '.modal',
        events: {
            'click #addBtn': '_onAddBtn',
            'click #save-modal': '_onSaveModal',
        },

        // INI ENGGA KEPAKE
        _onAddBtn() {
            var rowIdx = 0;
            $('#tbody-modal').append(`<tr id="R${++rowIdx}">
                <td><input type="text" class="vendor-input form-control"/></td>
                <td><input type="text" class="price-input form-control"/></td>
                <td><input type="text" class="dlt-input form-control"/>
            </tr>`);
        },

        _onSaveModal() {
            var flag_error = false;
            var vendor = $('#vendor').val();
            var price = $('#price').val();
            var dlt = $('#dlt').val();
            var rowIdx = 0;
            // buat validasinya tolong dibikin kaya contoh di bawah ini ya
            // https://getbootstrap.com/docs/4.6/components/forms/#server-sidew
            // https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_form_validation_needs&stacked=h
            if ($('#vendor').val() === "") {
                flag_error = true;
                window.alert("Field Vendor Masih Kosong");
            }
            if ($('#price').val() === "") {
                flag_error = true;
                window.alert("Field Price Masih Kosong");
            }
            if ($('#dlt').val() === "") {
                flag_error = true;
                window.alert("Field DLT Masih Kosong");
            }

            // INSERT BIAR TABLE DINAMIS
            if (flag_error == false) {
                $('#tbody').append(`<tr id="R${++rowIdx}">
                <td data-vendor="${vendor}" style="display: none;"><span col_name="vendor">${vendor}</span></td>
                <td data-price="${price}"><span col_name="price">${price}</span></td>
                <td data-dlt="${dlt}"><span col_name="dlt">${dlt}</span></td>
            </tr>`);

                $('#vendor').val('');
                $('#price').val('');
                $('#dlt').val('');

                $('#myModal').modal('hide');
            }
        },
    })

    publicWidget.registry.OnClickSaveRecord = publicWidget.Widget.extend({
        selector: '.class-create-product',
        events: {
            'click #submit-button': '_onClickSave',
        },

        _onClickSave() {
            var lines = []
            var product_name = $('#product_name').val()
            var barcode = $('#barcode').val()
            var default_code = $('#default_code').val()
            var lst_price = $('#lst_price').val()
            var base64_picture = $('#base64_picture').val()

            $('#tbody > tr').each(function () {
                lines.push({
                    'vendor': $(this).find("span[col_name='vendor']").text(),
                    'price': $(this).find("span[col_name='price']").text(),
                    'delay': $(this).find("span[col_name='dlt']").text(),
                })
            });

            ajax.jsonRpc('/my/tes_product/new_tes_product/add_product', 'call', {
                'name': product_name,
                'barcode': barcode,
                'default_code': default_code,
                'list_price': lst_price,
                'base64_picture': base64_picture,
                'seller_ids': lines
            }).then(function (result) {
                window.location.href = "/my/tes_product/new_tes_product";
                // logic setelah post data, bisa diganti sama redirect ke halaman lain atau muncul modal kalo data berhasil ditambahkan
            })
        },
    });
});