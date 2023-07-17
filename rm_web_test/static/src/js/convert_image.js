odoo.define('rm_web_test.insert_image', function (require) {
    'use strict';
    var core = require('web.core');
    var publicWidget = require('web.public.widget');
    var ajax = require('web.ajax');
    var QWeb = core.qweb;

    publicWidget.registry.UpdatePicture = publicWidget.Widget.extend({
        selector: '.class-create-product',
        // events : {'click #btn_update_bid': '_onClickUpdate'},
        events : {'change #wizard-picture': '_onChangeUpdate'},
        
        start: function () {
            var def = this._super.apply(this, arguments);
            return def;
        },
        
        _onChangeUpdate(ev) {   
            var reader = new FileReader();
            var test = this.$('#wizardPicturePreview')
            var base64_pic = this.$('#base64_picture')

            if (ev.target.files && ev.target.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    test.attr('src', e.target.result).fadeIn('slow');
                    var data = reader.result;
                    var img_base64 = data.split(",")[1];
                    console.log("<><><><><", img_base64)
                    document.querySelector("#base64_picture").value = img_base64;
                    base64_pic.val = img_base64
                };
                reader.readAsDataURL(ev.target.files[0]);
            }
        },
    });
});

// odoo.define('rm_web_test.upload_image', function (require) {
//     'use strict';
//     var core = require('web.core');
//     var publicWidget = require('web.public.widget');
//     var ajax = require('web.ajax');
//     var QWeb = core.qweb;

//     publicWidget.registry.UploadPicture = publicWidget.Widget.extend({
//         selector: '.class-create',
//         // events : {'change #select-denah-spesifikasi': '_onChangeSelectDenah'},
//         // xmlDependencies: ['/sb_beli_desain/static/src/xml/spec.xml'],
        
//         start: function () {
//             var def = this._super.apply(this, arguments);
//             // this.variant = $('#select-denah-spesifikasi').val()
//             // this.product = $('.product_template_id').val()
//             // this.attribute = $('#select-denah-spesifikasi').val()
//             // if (this.variant){

//             //     this._get_data_detail(this.variant);
//             // }

//             console.log("======================================")
//             return def;
//         },


//         // _get_data_detail: function(variant){
//         //     var self = this
//         //     ajax.jsonRpc('/beli-desain/lihat-detail-desain/get-spec-data','call',{
//         //         'product_variant': parseInt(variant),
//         //         'product_tmpl_id':parseInt(this.product) ,
//         //         'attribute_id': parseInt(variant),
//         //     }).then(function(data){
//         //         if(data.package){
//         //             $("#data-spesification").html(QWeb.render('SpesifikasiData', {
//         //                 attribute: data.attribute,
//         //                 spesifikasi: data.spesifikasi,
//         //                 finishing: data.finishing,
//         //                 package: data.package,

//         //             }))
//         //         }else{
//         //             $("#data-spesification").html('<div></div>');
//         //         }
//         //     });
//         // },

//         // _onChangeSelectDenah(ev) {
//         //     if ($(ev.currentTarget).val()){
//         //         this.variant = $(ev.currentTarget).val()
//         //         this._get_data_detail(this.variant)
//         //     }
//         // },
//     });
// });

// // $(document).ready(function () {
// //     // Prepare the preview for profile picture
// //     $("#wizard-picture").change(function () {
// //         console.log("dari kemariiin")
// //         recruitmentReadURL(this);
// //     });
// // });

// // function recruitmentReadURL(input) {
// //     if (input.files && input.files[0]) {
// //         var reader = new FileReader();

// //         reader.onload = function (e) {
// //             $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
// //             var data = reader.result; 
// //             var img_base64 = data.split(",")[1];
// //             console.log("<><><><><", img_base64)
// //             document.querySelector("#base64_picture").value = img_base64;
// //         };
// //         reader.readAsDataURL(input.files[0]);
// //     }
// // }