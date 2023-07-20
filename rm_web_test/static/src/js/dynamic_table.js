odoo.define('rm_web_test.dynamictableeeee', function (require) {
    'use strict';
    var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var ajax = require('web.ajax');
    var QWeb = core.qweb;

    publicWidget.registry.AddRowModal = publicWidget.Widget.extend({
        selector: '.modal',
        events : {
            'click #addBtn': '_onAddBtn',
            'click #save-modal': '_onSaveModal',
        },

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
            if (flag_error == false) {
            $('#tbody').append(`<tr id="R${++rowIdx}">
                <td>${vendor}</td>
                <td>${price}</td>
                <td>${dlt}</td>
            </tr>`);

            $('#vendor').val('');
            $('#price').val('');
            $('#dlt').val('');

            $('#myModal').modal('hide');
        }
        },
    });
    
    publicWidget.registry.OnClickSaveRecord = publicWidget.Widget.extend({
        selector: '.class-create-product',
        events : {'click #submit-button': '_onClickSave'},

        _onClickSave() {
            console.log("=================================================================")
        }
    });
});