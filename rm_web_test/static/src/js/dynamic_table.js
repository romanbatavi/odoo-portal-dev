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
            var vendor = $('#vendor :selected').val();
            var vendor_string = $('#vendor :selected').text();
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
                <td style="text-align: center;"><div class="row_fix" edit_type="click" col_name="vendor" data-value="${vendor}"> ${vendor_string}</div></td>
                <td style="text-align: center;"><div class="row_data" edit_type="click" col_name="price">${price}</div></td>
                <td style="text-align: center;"><div class="row_data" edit_type="click" col_name="delay">${dlt}</div></td>
                </tr>`);
                
                $('#vendor').val('');
                $('#price').val('');
                $('#dlt').val('');

                $('#myModal').modal('hide');
            }
            },
        //     if (flag_error == false) {
        //     $('#tbody').append(`<tr id="R${++rowIdx}">
        //         <td>${vendor}</td>
        //         <td>${price}</td>
        //         <td>${dlt}</td>
        //     </tr>`);

        //     $('#vendor').val('');
        //     $('#price').val('');
        //     $('#dlt').val('');

        //     $('#myModal').modal('hide');
        // }
        // },
        
    });
    
    publicWidget.registry.OnClickSaveRecord = publicWidget.Widget.extend({
        selector: '.class-create-product',
        events : {'click #submit-button': '_onClickSave'},

        _onClickSave() {
            var tbl_row = $(this).closest('tr');
            if (tbl_row.data('state') != 'new') {
                $(this).closest('tr').data('state', 'update').attr('data-state', 'update');
                }

            var row_id = tbl_row.attr('row_id');

            //hide save and cacel buttons
            // tbl_row.find('.btn_save_employment').hide();

            //show edit button
            // tbl_row.find('.btn_edit_employment').show();
            // tbl_row.find('.btn_delete_employment').show();

            //make the whole row editable
            tbl_row.find('.row_data')
                .attr('edit_type', 'click')
                .attr('contenteditable', 'false')
                .removeClass('bg-warning')
                .css('padding', '');

            //--->get row data > start
            var arr = {};
            tbl_row.find('.row_data').each(function (index, val) {
                var col_name = $(this).attr('col_name');
                var col_val = $(this).html();
                arr[col_name] = col_val;
        });
        }
    });
});